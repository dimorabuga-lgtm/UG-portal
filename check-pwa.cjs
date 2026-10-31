const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const code=fs.readFileSync('js/install.js','utf8');
function setup({ios=false,installed=false,mobile=true}={}){
 const events={},handlers={},elements={p:{},'.install-action':{addEventListener:(name,fn)=>handlers.install=fn},'.install-dismiss':{addEventListener:(name,fn)=>handlers.dismiss=fn}};
 const panel={setAttribute(){},querySelector:s=>elements[s],remove(){this.isConnected=false}};
 const context={window:{isSecureContext:true,addEventListener:(name,fn)=>events[name]=fn},location:{protocol:'https:'},navigator:{userAgent:ios?'iPhone':'Android',maxTouchPoints:mobile?5:0,platform:'',standalone:installed,serviceWorker:{register:()=>Promise.resolve()}},matchMedia:query=>({matches:query.includes('standalone')?installed:mobile}),sessionStorage:{getItem(){},setItem(){}},document:{createElement:()=>panel,querySelector:()=>({after:p=>p.isConnected=true})}};
 vm.runInNewContext(code,context);return {events,handlers,panel,elements};
}
(async()=>{
 const android=setup();assert(android.panel.isConnected);assert(android.elements['.install-action'].hidden);
 let prompted=false,prevented=false;
 android.events.beforeinstallprompt({preventDefault(){prevented=true},prompt:async()=>prompted=true,userChoice:Promise.resolve({outcome:'accepted'})});
 assert(prevented);assert.equal(android.elements['.install-action'].hidden,false);
 await android.handlers.install();assert(prompted);assert.equal(android.panel.isConnected,false);
 const declined=setup();declined.events.beforeinstallprompt({preventDefault(){},prompt:async()=>{},userChoice:Promise.resolve({outcome:'dismissed'})});await declined.handlers.install();assert(declined.panel.isConnected);assert(declined.elements['.install-action'].hidden);
 const ios=setup({ios:true});assert(ios.panel.isConnected);assert(ios.elements.p.textContent.includes('Safari'));assert(ios.elements['.install-action'].hidden);ios.handlers.dismiss();assert.equal(ios.panel.isConnected,false);
 assert(!setup({installed:true}).panel.isConnected);assert(!setup({mobile:false}).panel.isConnected);
 const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));assert.equal(manifest.display,'standalone');
 for(const icon of manifest.icons){const png=fs.readFileSync(icon.src);const [w,h]=icon.sizes.split('x').map(Number);assert.equal(png.readUInt32BE(16),w);assert.equal(png.readUInt32BE(20),h);assert(fs.existsSync('dist/'+icon.src))}
 assert(fs.existsSync('dist/sw.js'));assert(fs.existsSync('dist/manifest.webmanifest'));
 const {onRequest}=await import('./functions/_middleware.js');
 for(const url of ['/manifest.webmanifest','/sw.js','/assets/app-icon-192.png','/assets/app-icon-512.png']){const result=await onRequest({request:new Request('https://portal.test'+url),env:{},next:async()=>new Response('asset')});assert.equal(result.status,200);assert.equal(result.headers.get('cache-control'),'no-cache')}
 console.log('PASS: Android install/decline, iPhone instructions, dismissal, desktop/installed suppression, PNG sizes, build assets and public metadata routing.');
})().catch(e=>{console.error(e);process.exitCode=1});
