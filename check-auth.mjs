import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {DatabaseSync} from 'node:sqlite';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {onRequest as middleware} from './functions/_middleware.js';
import {onRequest as login} from './functions/api/login.js';
import {onRequest as logout} from './functions/api/logout.js';
import {onRequest as presenceList} from './functions/api/presence/index.js';
import {onRequest as presenceHeartbeat} from './functions/api/presence/heartbeat.js';
import {createSession,TTL,COOKIE,validSession,allowAttempt} from './server/auth.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const diagnosticLogs=[];
const savedConsoleError=console.error;
console.error=value=>diagnosticLogs.push(String(value));
const db=new DatabaseSync(':memory:');
db.exec(await readFile(path.join(root,'migrations/0001_auth_rate_limit.sql'),'utf8'));
db.exec(await readFile(path.join(root,'migrations/0002_session_presence.sql'),'utf8'));
const env={
  PORTAL_PASSWORD:crypto.randomUUID(),
  SESSION_SECRET:crypto.randomUUID()+crypto.randomUUID(),
  AUTH_RATE_LIMIT:{
    prepare(sql){
      return {bind(...values){
        return {
          async first(){return db.prepare(sql).get(...values);},
          async run(){return db.prepare(sql).run(...values);}
          ,async all(){return {results:db.prepare(sql).all(...values)};}
        };
      }};
    }
  }
};
const origin='https://portal.test';
const post=(password,ip='test')=>new Request(origin+'/api/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':ip},body:JSON.stringify({password,name:"Тестовий Оператор"})});
async function dispatch(request,bindings=env){return middleware({request,env:bindings,next:async()=>{
  const pathname=new URL(request.url).pathname;
  if(pathname==='/api/login')return login({request,env:bindings});
  if(pathname==='/api/logout')return logout({request,env:bindings});
  if(pathname==='/api/presence')return presenceList({request,env:bindings});
  if(pathname==='/api/presence/heartbeat')return presenceHeartbeat({request,env:bindings});
  // Emulate Pages asset routing against the allowlisted build output only.
  const relative=pathname==='/'?'index.html':decodeURIComponent(pathname.slice(1));
  const target=path.resolve(root,'dist',relative);
  if(!target.startsWith(path.join(root,'dist')+path.sep))return new Response('Not found',{status:404});
  try{const body=await readFile(target);const type=target.endsWith('.html')?'text/html':target.endsWith('.js')?'application/javascript':target.endsWith('.css')?'text/css':target.endsWith('.svg')?'image/svg+xml':'application/octet-stream';return new Response(body,{headers:{'Content-Type':type}});}catch{return new Response('Not found',{status:404});}
}});}
for(const url of ['/','/index.html','/js/portal-links.js','/js/app.js','/css/styles.css','/assets/ug.svg','/index','/%6a%73/portal-links.js']){
  const result=await dispatch(new Request(origin+url));assert.equal(result.status,401,url);assert(!await result.text().then(text=>text.includes('docs.google.com')));
}
assert.equal((await dispatch(new Request(origin+'/',{headers:{Accept:'text/html'}}))).headers.get('Location'),'/login');
assert.equal((await dispatch(new Request(origin+'/login'))).status,200);
assert((await (await dispatch(new Request(origin+'/login'))).text()).includes('Введіть пароль для доступу до робочих матеріалів'));
assert.equal((await dispatch(new Request(origin+'/',{headers:{Accept:'text/html'}}),{})).headers.get('Location'),'/login');
assert.equal((await dispatch(new Request(origin+'/js/portal-links.js'),{})).status,503);
assert.equal((await dispatch(post('wrong'))).status,401);
assert.equal((await dispatch(post(env.PORTAL_PASSWORD),{})).status,503);
assert.equal((await dispatch(post(env.PORTAL_PASSWORD),{...env,AUTH_RATE_LIMIT:undefined})).status,503);
assert.equal((await dispatch(post(env.PORTAL_PASSWORD),{...env,PORTAL_PASSWORD:undefined})).status,503);
assert.equal((await dispatch(post(env.PORTAL_PASSWORD),{...env,SESSION_SECRET:undefined})).status,503);
assert.equal((await dispatch(post(env.PORTAL_PASSWORD),{...env,SESSION_SECRET:'short'})).status,503);
const failingD1={...env,AUTH_RATE_LIMIT:{prepare(){throw Error('Private SQL error details');}}};
assert.equal((await dispatch(post(env.PORTAL_PASSWORD),failingD1)).status,503);
const failingSessionD1={...env,AUTH_RATE_LIMIT:{prepare(sql){if(sql.includes('INSERT INTO auth_sessions'))throw Error('Private insert error');return env.AUTH_RATE_LIMIT.prepare(sql);}}};
assert.equal((await dispatch(post(env.PORTAL_PASSWORD),failingSessionD1)).status,503);
assert.equal((await dispatch(new Request(origin+'/api/login',{method:'POST',headers:{Origin:'https://other.test'}}))).status,403);
assert.equal((await dispatch(new Request(origin+'/api/login'))).status,405);
assert.equal((await dispatch(new Request(origin+'/api/logout'))).status,405);
assert.equal((await dispatch(new Request(origin+'/api/logout',{method:'POST',headers:{Origin:'https://other.test'}}))).status,403);
for(const path of ['/login','/api/login','/api/logout']){
  const r=await dispatch(new Request(origin+path));assert(r.headers.get('Cache-Control').includes('no-store'));
}
const success=await dispatch(post(env.PORTAL_PASSWORD));assert.equal(success.status,200);
const cookie=success.headers.get('Set-Cookie');for(const part of ['HttpOnly','Secure','SameSite=Lax','Path=/','Max-Age=43200'])assert(cookie.includes(part));
const header=cookie.split(';')[0];
assert.match(success.headers.get('X-Request-ID'),/^[a-f0-9-]{36}$/);
for(const url of ['/','/index.html','/js/portal-links.js','/js/app.js','/css/styles.css','/assets/ug.svg']){
  const result=await dispatch(new Request(origin+url,{headers:{Cookie:header}}));assert.equal(result.status,200,url);assert(result.headers.get('Cache-Control').includes('no-store'));
}
assert.equal((await dispatch(new Request(origin+'/js/portal-links.js',{headers:{Cookie:header.slice(0,-1)+'z'}}))).status,401);
const changed=header.slice(0,-1)+(header.endsWith('a')?'b':'a');
assert.equal((await dispatch(new Request(origin+'/js/portal-links.js',{headers:{Cookie:changed}}))).status,401,'Modified HMAC with valid hex is rejected');
assert.equal((await dispatch(new Request(origin+'/unknown',{headers:{Cookie:header}}))).status,404);
const expired=await createSession(env,Math.floor(Date.now()/1000)-TTL-1);
assert.equal((await dispatch(new Request(origin+'/',{headers:{Cookie:COOKIE+'='+expired}}))).status,401);
assert(!await validSession(new Request(origin,{headers:{Cookie:header}}),{...env,PORTAL_PASSWORD:crypto.randomUUID()}));
const loggedOut=await dispatch(new Request(origin+'/api/logout',{method:'POST',headers:{Origin:origin,Cookie:header}}));assert.equal(loggedOut.status,200);assert(loggedOut.headers.get('Set-Cookie').includes('Max-Age=0'));
const unavailableDB={...env,AUTH_RATE_LIMIT:{prepare(){throw Error('Private internal diagnostic');}}};
const failedLogout=await dispatch(new Request(origin+'/api/logout',{method:'POST',headers:{Origin:origin,Cookie:header}}),unavailableDB);
assert.equal(failedLogout.status,503);assert(!await failedLogout.text().then(text=>text.includes('Private internal diagnostic')));
assert.equal((await dispatch(new Request(origin+'/js/app.js',{headers:{Cookie:header}}),unavailableDB)).status,401);
assert.equal((await dispatch(new Request(origin+'/does-not-exist',{headers:{Cookie:header}}))).status,401);
assert.equal((await dispatch(new Request(origin+'/',{headers:{Cookie:header}}))).status,401,'Logged-out token cannot be replayed');
const attempts=await Promise.all(Array.from({length:12},()=>allowAttempt(post('wrong','burst'),env)));assert.equal(attempts.filter(Boolean).length,10);
assert(await allowAttempt(post('wrong','burst'),env,Math.floor(Date.now()/1000)+601));
const routes=JSON.parse(await readFile(path.join(root,'dist/_routes.json')));assert.deepEqual(routes.include,['/*']);assert.deepEqual(routes.exclude,[]);
for(const secret of [env.PORTAL_PASSWORD,env.SESSION_SECRET])assert(!await readFile(path.join(root,'dist/js/portal-links.js'),'utf8').then(text=>text.includes(secret)));
console.log('PASS: server middleware protects HTML/JS/CSS/assets, correct/wrong passwords, missing configuration, CSRF, cookie attributes, tampering, expiry, secret rotation, logout cookie, atomic rate limit and routing.');

if(process.argv[2]){
  // Local HTTP adapter runs the actual Functions handlers with real SQLite, not a client-only login mock.
  const server=createServer(async(req,res)=>{try{const buffers=[];for await(const chunk of req)buffers.push(chunk);const host='http://127.0.0.1:'+server.address().port;const request=new Request(host+req.url,{method:req.method,headers:req.headers,...(['GET','HEAD'].includes(req.method)?{}:{body:Buffer.concat(buffers)})});const response=await dispatch(request);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch{res.writeHead(500);res.end('Test server failure');}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url='http://127.0.0.1:'+server.address().port;
  const child=spawn(process.argv[2],['--headless=new','--no-sandbox','--disable-gpu','--disable-software-rasterizer','--remote-debugging-port=9257','--user-data-dir='+path.join(root,'.qa-auth'),'about:blank'],{stdio:'ignore'});
  const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));let socket;
  try{
    let tabs;for(let i=0;i<40;i++){try{tabs=await(await fetch('http://127.0.0.1:9257/json')).json();break;}catch{await delay(200);}}
    socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
    let id=0;const pending=new Map(),errors=[];socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params);};
    const call=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
    const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('Browser evaluation failed');return r.result.value;};
    await call('Runtime.enable');await call('Page.enable');await call('Page.navigate',{url});await delay(350);
    assert.equal(await evaluate('location.pathname'),'/login');
    assert.equal(await evaluate(`document.querySelector('#welcome-dialog')`),null);
    for(const width of [1440,1280,768,430,390,375,360]){await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'));}
    await evaluate(`document.querySelector('#full-name').value='Тестовий Оператор'`);
    await evaluate(`document.querySelector('#toggle').click()`);assert.equal(await evaluate(`document.querySelector('#password').type`),'text');
    // A 200 HTML fallback or malformed JSON is not a successful server login.
    for(const kind of ['html','invalid-json','not-ok']){
      await evaluate(`window.qaFetch=window.fetch;window.fetch=async()=>new Response(${JSON.stringify(kind==='html'?'<html>Static fallback</html>':kind==='invalid-json'?'{broken':'{"ok":false}')},{status:200,headers:{'Content-Type':${JSON.stringify(kind==='html'?'text/html':'application/json')}}});document.querySelector('#password').value='test';document.querySelector('#login-form').requestSubmit()`);
      await delay(40);assert.equal(await evaluate('location.pathname'),'/login');assert(await evaluate(`document.querySelector('#message').textContent.includes('Вхід тимчасово недоступний')`));
      await evaluate(`window.fetch=window.qaFetch;delete window.qaFetch`);
    }
    await evaluate(`window.qaFetch=window.fetch;window.fetch=(...args)=>new Promise(resolve=>setTimeout(()=>resolve(window.qaFetch(...args)),120));document.querySelector('#password').value='wrong';document.querySelector('#login-form').requestSubmit()`);
    assert(await evaluate(`document.querySelector('#submit').disabled&&document.querySelector('#login-form').getAttribute('aria-busy')==='true'&&getComputedStyle(document.querySelector('#submit'),'::before').content!=='none'`));
    await delay(350);assert(await evaluate(`document.querySelector('#message').textContent.includes('Неправильний пароль')`));
    await evaluate(`window.fetch=window.qaFetch;delete window.qaFetch`);
    await evaluate(`sessionStorage.setItem('ug.portal.welcome.dismissed.v1','true');document.querySelector('#password').value=${JSON.stringify(env.PORTAL_PASSWORD)};document.querySelector('#login-form').requestSubmit()`);await delay(400);
    assert.equal(await evaluate('location.pathname'),'/');assert.equal(await evaluate(`document.querySelectorAll('.resource-card').length`),9);
    assert(await evaluate(`document.querySelector('#welcome-dialog').open`));
    assert.equal(await evaluate(`document.querySelectorAll('#welcome-dialog button').length`),1);
    assert.equal(await evaluate(`document.activeElement.id`),'welcome-continue');
    for(const width of [1440,1280,768,430,390,375,360]){
      await call('Emulation.setDeviceMetricsOverride',{width,height:740,deviceScaleFactor:1,mobile:false});
      assert(await evaluate(`(()=>{const d=document.querySelector('#welcome-dialog'),r=d.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight&&d.scrollWidth<=d.clientWidth;})()`));
    }
    await evaluate(`document.querySelector('#welcome-continue').click()`);await delay(30);
    assert(await evaluate(`!document.querySelector('#welcome-dialog').open&&!document.body.classList.contains('welcome-open')`));
    assert.equal(await evaluate(`fetch('/js/portal-links.js').then(r=>r.status)`),200,'Dismissal preserves server authorization');
    assert(await evaluate(`document.querySelector('#online-people').textContent.includes('Тестовий Оператор')`));
    assert.equal(await evaluate(`document.querySelector('.team-online').dataset.state`),'ready');
    assert.equal(await evaluate(`document.querySelector('#stat-online').textContent`),'1');
    // Controlled responses exercise presentation states; real two-session isolation is tested in check-presence.
    await evaluate(`window.qaPresenceFetch=window.fetch;window.qaPeople=[];window.qaPresenceError=false;window.fetch=(url,...args)=>String(url).startsWith('/api/presence')?Promise.resolve(new Response(JSON.stringify(String(url).endsWith('heartbeat')?{ok:true}:{people:window.qaPeople,count:window.qaPeople.length,identified:true}),{status:window.qaPresenceError?503:200,headers:{'Content-Type':'application/json'}})):window.qaPresenceFetch(url,...args);window.dispatchEvent(new Event('pageshow'))`);
    await delay(60);assert.equal(await evaluate(`document.querySelector('.team-online').dataset.state`),'empty');
    await evaluate(`window.qaPresenceError=true;window.dispatchEvent(new Event('pageshow'))`);
    await delay(60);assert.equal(await evaluate(`document.querySelector('.team-online').dataset.state`),'error');
    assert.equal(await evaluate(`document.querySelector('#stat-online').textContent`),'—');
    assert(await evaluate(`document.querySelector('#online-count').hidden&&document.querySelector('#online-people').children.length===0`));
    await evaluate(`window.qaPresenceError=false;window.qaPeople=[{name:'<img src=x onerror=alert(1)>'},{name:'А'.repeat(80)}];window.dispatchEvent(new Event('pageshow'))`);
    await delay(60);assert.equal(await evaluate(`document.querySelector('#online-count').textContent`),'2');
    assert.equal(await evaluate(`document.querySelector('#stat-online').textContent`),'2');
    assert.equal(await evaluate(`document.querySelectorAll('#online-people img').length`),0);
    for(const width of [1440,768,430,390,375,360]){await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'));}
    await evaluate(`window.fetch=window.qaPresenceFetch;delete window.qaPresenceFetch;window.dispatchEvent(new Event('pageshow'))`);await delay(60);
    assert.equal(await evaluate(`document.cookie.includes('${COOKIE}')`),false);
    await call('Page.reload');await delay(250);assert.equal(await evaluate('location.pathname'),'/');
    assert.equal(await evaluate(`document.querySelector('#welcome-dialog').open`),false,'Greeting remains dismissed on reload');
    assert.equal(await evaluate(`fetch('/js/portal-links.js').then(r=>r.status)`),200);
    // Exercise the real catalog after login under the authenticated response CSP.
    await evaluate(`document.addEventListener('click',e=>{if(e.target.closest('a.document-action,a.category-action,a.quick-link'))e.preventDefault()});`);
    const modalCount=await evaluate(`document.querySelectorAll('button.category-action:not(:disabled)').length`);
    for(let i=0;i<modalCount;i++){

      await evaluate(`document.querySelectorAll('button.category-action:not(:disabled)')[${i}].click()`);
      assert(await evaluate(`document.querySelector('#resource-dialog').open`));
      await evaluate(`document.querySelector('#close-dialog').click()`);await delay(220);
    }
    assert(await evaluate(`(()=>{document.querySelector('[data-filter="schedules"]').click();const s=document.querySelector('#resource-search');s.value='Графік роботи операторів';s.dispatchEvent(new Event('input'));const link=document.querySelector('#search-results a.document-action');link.click();return !document.querySelector('#resource-dialog').open&&link.href==='https://docs.google.com/spreadsheets/d/1F0C9tNikEEaGNxrd3O9YuRADAP0ktc_iCrqVJRGPlWY/edit?usp=sharing'&&link.target==='_blank';})()`));
    await evaluate(`document.querySelector('#search-results .favorite-button').click();document.querySelector('#search-results a.document-action').click();`);
    await delay(220);assert.equal(await evaluate(`document.querySelectorAll('.recent-link').length`),1);
    await evaluate(`document.querySelector('[data-filter="favorites"]').click()`);assert.equal(await evaluate(`document.querySelectorAll('#search-results .document-row').length`),1);
    await evaluate(`document.querySelector('#search-results .favorite-button').click();document.querySelector('#clear-history').click();document.querySelector('[data-filter="all"]').click();document.querySelector('#clear-search').click();`);
    for(const width of [430,390,375,360]){await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'));}
    await evaluate(`document.querySelector('#logout').click()`);await delay(300);assert.equal(await evaluate('location.pathname'),'/login');
    assert.equal(await evaluate(`fetch('/js/portal-links.js').then(r=>r.status)`),401);
    await call('Page.navigate',{url:url+'/index.html'});await delay(250);assert.equal(await evaluate('location.pathname'),'/login');
    await evaluate(`document.querySelector('#full-name').value='Тестовий Оператор';document.querySelector('#password').value=${JSON.stringify(env.PORTAL_PASSWORD)};document.querySelector('#login-form').requestSubmit()`);await delay(350);
    assert.equal(await evaluate('location.pathname'),'/');assert(await evaluate(`document.querySelector('#welcome-dialog').open`),'A new login after logout shows the greeting again');
    await evaluate(`document.querySelector('#welcome-continue').click()`);
    assert.equal(errors.length,0);console.log('PASS: real browser login, error, reveal password, HttpOnly, reload, protected document config, logout, direct index denial and mobile login/portal; no JavaScript exceptions.');
  }finally{socket?.close();child.kill();await new Promise(resolve=>server.close(resolve));}
}
db.close();
const parsedDiagnostics=diagnosticLogs.map(line=>JSON.parse(line));
for(const code of ['AUTH_CONFIGURATION_INVALID','D1_BINDING_MISSING','RATE_LIMIT_CHECK_FAILED','SESSION_CREATE_FAILED','SESSION_REVOKE_FAILED','SESSION_LOOKUP_FAILED'])assert(parsedDiagnostics.some(entry=>entry.code===code),code);
for(const issue of ['PORTAL_PASSWORD_MISSING','SESSION_SECRET_MISSING','SESSION_SECRET_TOO_SHORT'])assert(parsedDiagnostics.some(entry=>entry.issues?.includes(issue)),issue);
for(const forbidden of [env.PORTAL_PASSWORD,env.SESSION_SECRET,header,expired,'Private SQL error details','Private insert error','Private internal diagnostic'])assert(!diagnosticLogs.join('\n').includes(forbidden),'Diagnostic log redaction failed');
assert(parsedDiagnostics.every(entry=>Object.keys(entry).every(key=>['event','code','requestId','issues'].includes(key))));
console.error=savedConsoleError;
console.log('PASS: diagnostic codes distinguish configuration, D1 and session failures without logging secret values, cookies, tokens or exception details; form rejects non-JSON success responses.');
