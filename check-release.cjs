const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=__dirname,output=path.join(root,'dist');
fs.mkdirSync(output,{recursive:true});
const stale=path.join(output,'.release-stale-marker');fs.writeFileSync(stale,'test');
execFileSync(process.execPath,[path.join(root,'build.cjs')]);
assert(!fs.existsSync(stale),'Old build files must not remain public');
function files(directory){return fs.readdirSync(directory,{withFileTypes:true}).flatMap(item=>item.isDirectory()?files(path.join(directory,item.name)):[path.join(directory,item.name)]);}
for(const file of files(output)){
  const relative=path.relative(output,file).replaceAll('\\','/');
  assert(/^(index\.html|404\.html|_routes\.json|assets\/|css\/|js\/)/.test(relative),relative);
  assert(!/(^|\/)(\.env|\.dev\.vars|functions|server|migrations|node_modules|\.qa-)/.test(relative),relative);
  if(/\.(html|css|js|json|svg)$/.test(file)){
    const text=fs.readFileSync(file,'utf8');
    assert(!/PORTAL_PASSWORD|SESSION_SECRET|AUTH_RATE_LIMIT/.test(text),'Server configuration name leaked into '+relative);
  }
}
const vm=require('node:vm'),context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(output,'js/portal-links.js'),'utf8'),context);
assert.equal(context.window.portalCatalog.categories.length,8);
assert.equal(context.window.portalCatalog.resources.find(item=>item.id==='operator-work-schedule').url,'https://docs.google.com/spreadsheets/d/1F0C9tNikEEaGNxrd3O9YuRADAP0ktc_iCrqVJRGPlWY/edit?usp=sharing');
assert.deepEqual(JSON.parse(fs.readFileSync(path.join(output,'_routes.json'))),{version:1,include:['/*'],exclude:[]});
console.log('PASS: clean allowlisted production build, no server files/configuration in public output, full middleware coverage and unchanged schedule URL.');
