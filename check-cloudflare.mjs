// Runs Wrangler/workerd locally; no Cloudflare account, deployment or real secrets.
import {spawn} from 'node:child_process';
import {mkdir,writeFile,readdir,cp,unlink} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=path.dirname(fileURLToPath(import.meta.url));
const cache=path.join(root,'.qa-npm-cache','_npx');
const entries=await readdir(cache);
let cli;
for(const entry of entries){const candidate=path.join(cache,entry,'node_modules','wrangler','bin','wrangler.js');try{await import('node:fs/promises').then(fs=>fs.access(candidate));cli=candidate;break;}catch{}}
if(!cli)throw Error('Install Wrangler into the local QA cache first. See RELEASE-CHECKLIST.md.');
const work=path.join(root,'.qa-runtime');await mkdir(work,{recursive:true});
for(const directory of ['dist','functions','server'])await cp(path.join(root,directory),path.join(work,directory),{recursive:true});
const config=path.join(work,'wrangler.jsonc');
await writeFile(config,JSON.stringify({name:'ug-portal-local-qa',pages_build_output_dir:'./dist',compatibility_date:'2026-10-01',d1_databases:[{binding:'AUTH_RATE_LIMIT',database_name:'local-auth',database_id:crypto.randomUUID()}]}));
const password=crypto.randomUUID(),secret=crypto.randomUUID()+crypto.randomUUID();
const environment={...process.env,CLOUDFLARE_INCLUDE_PROCESS_ENV:'false',CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV:'false',WRANGLER_SEND_METRICS:'false',WRANGLER_LOG_PATH:path.join(work,'wrangler.log')};
const persist=path.join(work,'state');
function run(args){return new Promise((resolve,reject)=>{const child=spawn(process.execPath,[cli,...args],{cwd:work,env:environment,stdio:['ignore','pipe','pipe']});let output='';child.stdout.on('data',chunk=>output+=chunk);child.stderr.on('data',chunk=>output+=chunk);child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error('Wrangler setup failed: '+output.replaceAll(password,'[redacted]').replaceAll(secret,'[redacted]'))));});}
await run(['d1','execute','AUTH_RATE_LIMIT','--local','--config',config,'--file',path.join(root,'migrations/0001_auth_rate_limit.sql'),'--persist-to',persist]);
// Pages dev requires a local dev-vars file; these disposable test-only values are removed below.
const devVars=path.join(work,'.dev.vars');
await writeFile(devVars,`PORTAL_PASSWORD=${password}\nSESSION_SECRET=${secret}\n`,{mode:0o600});
const child=spawn(process.execPath,[cli,'pages','dev','dist','--port','8798','--persist-to',persist],{cwd:work,env:environment,stdio:['ignore','pipe','pipe']});
let diagnostics='';child.stdout.on('data',chunk=>diagnostics+=chunk);child.stderr.on('data',chunk=>diagnostics+=chunk);
const base='http://127.0.0.1:8798';
try{
  let ready=false;for(let i=0;i<80;i++){try{await fetch(base+'/login');ready=true;break;}catch{await new Promise(resolve=>setTimeout(resolve,250));}}
  assert(ready,'Local workerd did not start: '+diagnostics.replaceAll(password,'[redacted]').replaceAll(secret,'[redacted]'));
  const request=(route,options={})=>fetch(base+route,{redirect:'manual',...options});
  for(const route of ['/','/index.html','/index','/js/app.js','/js/portal-links.js','/css/styles.css','/assets/ug.svg','/unknown','/api/unknown','/functions/api/login.js','/server/auth.mjs']){
    const r=await request(route);assert.equal(r.status,401,route);assert(r.headers.get('Cache-Control').includes('no-store'));
  }
  assert.equal((await request('/index.html',{headers:{Accept:'text/html'}})).headers.get('Location'),'/login');
  const page=await request('/login');assert.equal(page.status,200);assert(page.headers.get('Cache-Control').includes('no-store'));
  const login=value=>request('/api/login',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({password:value})});
  assert.equal((await login('wrong')).status,401);
  assert.equal((await request('/api/login')).status,405);
  assert.equal((await request('/api/logout')).status,405);
  const success=await login(password);assert.equal(success.status,200);const cookie=success.headers.get('Set-Cookie').split(';')[0];
  const headers={Cookie:cookie};
  for(const route of ['/','/js/app.js','/js/portal-links.js','/css/styles.css','/assets/ug.svg']){const r=await request(route,{headers});assert.equal(r.status,200,route);assert(r.headers.get('Cache-Control').includes('no-store'));}
  const schedule=await(await request('/js/portal-links.js',{headers})).text();assert(schedule.includes('1F0C9tNikEEaGNxrd3O9YuRADAP0ktc_iCrqVJRGPlWY'));
  assert.equal((await request('/unknown',{headers})).status,404);
  assert.equal((await request('/api/unknown',{headers})).status,404);
  assert.equal((await request('/server/auth.mjs',{headers})).status,404);
  const logout=await request('/api/logout',{method:'POST',headers:{...headers,Origin:base}});assert.equal(logout.status,200);assert(logout.headers.get('Set-Cookie').includes('Max-Age=0'));
  assert.equal((await request('/js/portal-links.js',{headers})).status,401);
  console.log('PASS: actual Wrangler/workerd + local D1: login, methods, middleware on static files, route handling, private cache headers, schedule preservation, unknown-route 404, logout revocation.');
}finally{
  await unlink(devVars).catch(()=>{});
  // Windows taskkill terminates only this test's Wrangler process tree.
  if(process.platform==='win32')await new Promise(resolve=>{const stop=spawn('taskkill',['/pid',String(child.pid),'/T','/F'],{stdio:'ignore'});stop.on('exit',resolve);stop.on('error',resolve);});
  else child.kill();
}
