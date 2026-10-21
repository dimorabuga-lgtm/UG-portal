// Optional local QA: node check-browser.cjs <absolute Chrome executable path>
const {spawn} = require('node:child_process');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const child = spawn(process.argv[2], ['--headless=new','--no-sandbox','--disable-gpu','--disable-software-rasterizer','--remote-debugging-port=9249','--user-data-dir='+path.join(__dirname,'.qa-browser'),'about:blank'], {stdio:'ignore'});
  const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));
  let socket;
  try {
    let tabs;
    for(let i=0;i<40;i++){try{tabs=await(await fetch('http://127.0.0.1:9249/json')).json();break;}catch{await sleep(200);}}
    assert(tabs,'Chrome endpoint unavailable');
    socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
    await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
    let id=0;const pending=new Map(),errors=[];
    socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown'||m.method==='Log.entryAdded'&&m.params.entry.level==='error')errors.push(m.params);};
    const call=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
    const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
    await call('Runtime.enable');await call('Log.enable');await call('Page.enable');
    // This catalog-only test uses file://; real HTTP/D1 presence is covered by check-auth and check-cloudflare.
    await call('Page.addScriptToEvaluateOnNewDocument',{source:`const originalFetch=window.fetch;window.fetch=(url,...args)=>String(url).startsWith('/api/presence')?Promise.resolve(new Response(JSON.stringify(String(url).endsWith('heartbeat')?{ok:true,identified:false}:{people:[],count:0,identified:false}),{headers:{'Content-Type':'application/json'}})):originalFetch(url,...args);`});
    await call('Page.navigate',{url:pathToFileURL(path.join(__dirname,'index.html')).href});await sleep(500);
    await evaluate(`localStorage.removeItem('ug.portal.favorites.v1');localStorage.removeItem('ug.portal.recent.v1')`);
    await call('Page.reload');await sleep(300);
    await evaluate(`document.addEventListener('click',e=>{if(e.target.closest('a.document-action'))e.preventDefault()})`);
    const catalog=await evaluate(`window.portalCatalog`);
    const expected={regulations:5,schedule:3,payroll:5,'extra-shifts':2,roles:5,instructions:6,training:6,faq:5};
    assert.equal(catalog.categories.length,8);
    const open=async key=>{await evaluate(`document.querySelector('[data-resource-id="${catalog.categories.find(c=>c.category===key).id}"] .category-action').focus({preventScroll:true});document.querySelector('[data-resource-id="${catalog.categories.find(c=>c.category===key).id}"] .category-action').click()`);};
    const close=async()=>{await evaluate(`document.querySelector('#close-dialog').click()`);await sleep(220);assert.equal(await evaluate(`document.querySelector('#resource-dialog').open`),false);};
    for(const category of catalog.categories){
      await open(category.category);await sleep(260);
      assert.equal(await evaluate(`document.querySelectorAll('#dialog-documents .modal-resource-card').length`),expected[category.category]);
      assert.deepEqual(await evaluate(`[...document.querySelectorAll('#dialog-documents h3')].map(e=>e.textContent)`),category.sections.map(s=>s.title));
      assert.deepEqual(await evaluate(`[...document.querySelectorAll('#dialog-documents .document-copy>p')].map(e=>e.textContent)`),category.sections.map(s=>s.description));
      const urls=category.sections.flatMap(s=>s.resourceIds.map(id=>catalog.resources.find(r=>r.id===id).url));
      assert.deepEqual(await evaluate(`[...document.querySelectorAll('#dialog-documents a.document-action')].map(a=>a.href)`),urls);
      assert.equal(await evaluate(`document.querySelectorAll('#dialog-documents a[target="_blank"][rel="noopener noreferrer"]').length`),urls.length);
      assert.equal(await evaluate(`document.querySelectorAll('#dialog-documents button.document-action:disabled').length`),category.sections.length-urls.length);
      if(!urls.length)assert(await evaluate(`document.querySelector('#dialog-documents').textContent.includes('Посилання ще не додано')`));
      await evaluate(`document.querySelector('#dialog-title').click()`);assert(await evaluate(`document.querySelector('#resource-dialog').open`));
      await close();assert(await evaluate(`document.activeElement.classList.contains('category-action')`));
    }
    // Full-screen layouts for every section, including the centered 3+2 composition.
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    for(const width of [1440,1280,768,430,390,375,360]){
      await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
      for(const category of catalog.categories){
        await open(category.category);await sleep(20);
        const layout=await evaluate(`(()=>{const d=document.querySelector('#resource-dialog'),g=document.querySelector('#dialog-documents'),cards=[...g.children],b=cards.map(c=>c.getBoundingClientRect());return {overflow:d.scrollWidth>d.clientWidth+1||document.documentElement.scrollWidth>innerWidth,columns:getComputedStyle(g).gridTemplateColumns.split(' ').length,clipped:[...g.querySelectorAll('h3,p,.document-action')].some(e=>e.scrollWidth>e.clientWidth+1),centered:b.length===5?Math.abs((b[3].left+b[4].right)/2-(d.getBoundingClientRect().left+d.getBoundingClientRect().right)/2)<2:true};})()`);
        if(layout.overflow)console.log(await evaluate(`JSON.stringify({width:innerWidth,page:document.documentElement.scrollWidth,dialog:document.querySelector('#resource-dialog').scrollWidth,client:document.querySelector('#resource-dialog').clientWidth,grid:getComputedStyle(document.querySelector('#dialog-documents')).gridTemplateColumns,cards:[...document.querySelectorAll('#dialog-documents>.modal-resource-card')].map(c=>({column:getComputedStyle(c).gridColumn,width:c.clientWidth,scroll:c.scrollWidth}))})`));
        assert(!layout.overflow,category.category+' '+width);assert(!layout.clipped,category.category+' clipped '+width);
        assert.equal(layout.columns,width<600?1:width<1024?2:category.sections.length===2?2:6);
        if(width>=1024&&category.sections.length===5)assert(layout.centered);
        await evaluate(`document.querySelector('#resource-dialog').scrollTop=10000`);
        assert(await evaluate(`document.querySelector('#close-dialog').getBoundingClientRect().top>=0`));
        if(width===1440&&category.category==='regulations'){
          await evaluate(`document.querySelector('#resource-dialog').scrollTop=0`);
          require('fs').mkdirSync(require('path').join(__dirname,'.qa-visual'),{recursive:true});
          const shot=await call('Page.captureScreenshot',{format:'png'});require('fs').writeFileSync(require('path').join(__dirname,'.qa-visual','unified.png'),Buffer.from(shot.data,'base64'));
        }
        await close();
      }
      console.log('PASS: eight modal layouts at '+width+'px');
    }
    await open('schedule');await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await sleep(50);assert.equal(await evaluate(`document.querySelector('#resource-dialog').open`),false);
    await open('schedule');await call('Input.dispatchMouseEvent',{type:'mousePressed',x:2,y:2,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:2,y:2,button:'left',clickCount:1});await sleep(50);assert.equal(await evaluate(`document.querySelector('#resource-dialog').open`),false);
    const query=async q=>evaluate(`(()=>{const s=document.querySelector('#resource-search');s.value=${JSON.stringify(q)};s.dispatchEvent(new Event('input'));return document.querySelector('#search-results').textContent})()`);
    assert((await query('Оформлення ТТН')).includes('Оформлення ТТН'));
    await evaluate(`document.querySelector('#search-results .search-section').click()`);assert.equal(await evaluate(`document.querySelector('#resource-dialog').dataset.category`),'instructions');assert(await evaluate(`document.querySelector('.search-highlight').textContent.includes('Оформлення ТТН')`));await close();
    await query('Графік роботи операторів');await evaluate(`document.querySelector('#search-results .document-action').click()`);assert.equal(await evaluate(`document.querySelector('#resource-dialog').dataset.category`),'schedule');assert(await evaluate(`document.querySelector('.search-highlight')!==null`));
    await evaluate(`document.querySelector('#dialog-documents .favorite-button').click();document.querySelector('#dialog-documents a.document-action').click()`);await close();
    assert.equal(await evaluate(`document.querySelectorAll('.recent-link').length`),1);
    await call('Page.reload');await sleep(300);await evaluate(`document.addEventListener('click',e=>{if(e.target.closest('a.document-action'))e.preventDefault()});document.querySelector('[data-filter="favorites"]').click()`);
    assert.equal(await evaluate(`document.querySelectorAll('#search-results .document-row').length`),1);assert.equal(await evaluate(`document.querySelectorAll('.recent-link').length`),1);
    await evaluate(`document.querySelector('#search-results .favorite-button').click()`);assert.equal(await evaluate(`document.querySelectorAll('#search-results .document-row').length`),0);
    await evaluate(`document.querySelector('[data-filter="all"]').click()`);
    // Real configured documents exercise history without any URL changes.
    for(const resource of catalog.resources){const category=catalog.categories.find(c=>(resource.categories||[resource.category]).includes(c.category));await open(category.category);await evaluate(`[...document.querySelectorAll('#dialog-documents [data-document-id]')].find(e=>e.dataset.documentId===${JSON.stringify(resource.id)}).querySelector('a.document-action').click()`);await close();}
    assert.equal(await evaluate(`JSON.parse(localStorage.getItem('ug.portal.recent.v1')).length`),5);
    await open('regulations');await evaluate(`document.querySelector('#dialog-documents a.document-action').click()`);await close();assert.equal(await evaluate(`JSON.parse(localStorage.getItem('ug.portal.recent.v1'))[0]`),catalog.resources[0].id);
    await evaluate(`document.querySelector('#clear-history').click()`);assert.equal(await evaluate(`JSON.parse(localStorage.getItem('ug.portal.recent.v1')).length`),0);
    await evaluate(`document.querySelector('[data-filter="training"]').click()`);assert(!(await query('Графік роботи')).includes('Переглянути'));assert(await evaluate(`document.querySelector('#search-status').textContent.includes('Нічого не знайдено')`));
    await evaluate(`document.querySelector('[data-filter="all"]').click();document.querySelector('#clear-search').click()`);
    // Only in-memory fixtures: a nested document list and FAQ answers.
    await evaluate(`window.portalCatalog.resources.push({id:'qa-one',title:'QA one',description:'One',category:'instructions',type:'docs',status:'available',url:'https://example.org/a'},{id:'qa-two',title:'QA two',description:'Two',category:'instructions',type:'pdf',status:'pending',url:''});window.portalCatalog.categories.find(c=>c.category==='instructions').sections[0].resourceIds=['qa-one','qa-two'];window.portalCatalog.categories.find(c=>c.category==='faq').sections[0].questions=[{question:'QA question',answer:'QA answer'}]`);
    await open('instructions');await evaluate(`document.querySelector('.section-details').open=true`);assert.equal(await evaluate(`document.querySelectorAll('.nested-documents .document-row').length`),2);assert.equal(await evaluate(`document.querySelectorAll('.nested-documents a.document-action').length`),1);assert.equal(await evaluate(`document.querySelectorAll('.nested-documents button.document-action:disabled').length`),1);await close();
    await open('faq');await evaluate(`document.querySelector('.section-details').open=true;document.querySelector('.faq-answer').open=true`);assert(await evaluate(`document.querySelector('.faq-answer').textContent.includes('QA answer')`));await close();
    await evaluate(`window.scrollTo(0,200)`);const beforeScroll=await evaluate(`window.scrollY`);await open('regulations');await close();assert.equal(await evaluate(`window.scrollY`),beforeScroll);
    const originalURL=catalog.resources[0].url;
    await evaluate(`window.portalCatalog.resources[0].url='javascript:alert(1)'`);await open('regulations');
    assert.equal(await evaluate(`document.querySelector('#dialog-documents .document-action').tagName`),'BUTTON');
    assert(await evaluate(`document.querySelector('#dialog-documents .document-action').disabled`));
    assert(await evaluate(`document.querySelector('#dialog-documents .modal-resource-card').textContent.includes('Посилання ще не додано')`));await close();
    await evaluate(`window.portalCatalog.resources[0].url=${JSON.stringify(originalURL)}`);
    assert.equal(errors.length,0,JSON.stringify(errors));console.log('PASS: unified sections, all configured links, pending states, search deep linking, favorites/reload, history five/reorder/clear, filtering, FAQ/nested docs, closing and focus; no console errors.');
  } finally { if(socket)socket.close();child.kill(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
