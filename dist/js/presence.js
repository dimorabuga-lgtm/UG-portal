(() => {
  const panel=document.querySelector('.team-online');
  const list=document.querySelector('#online-people');
  const status=document.querySelector('#online-status');
  const count=document.querySelector('#online-count');
  const notice=document.querySelector('#online-name-notice');
  let running=false,timer;
  async function refresh() {
    if(running||document.hidden)return;
    running=true;
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),10000);
    try {
      const options={credentials:'same-origin',cache:'no-store',signal:controller.signal};
      const heartbeat=await fetch('/api/presence/heartbeat',{...options,method:'POST'});
      if(!heartbeat.ok)throw Error('presence');
      const response=await fetch('/api/presence',options);
      if(!response.ok)throw Error('presence');
      const data=await response.json();
      if(!Array.isArray(data.people)||data.count!==data.people.length||!data.people.every(person=>typeof person.name==='string'))throw Error('format');
      list.replaceChildren();
      data.people.forEach(person=>{
        const item=document.createElement('li');
        const avatar=document.createElement('span');avatar.className='online-avatar';avatar.setAttribute('aria-hidden','true');
        avatar.textContent=person.name.split(/\s+/u).filter(Boolean).slice(0,2).map(part=>[...part][0]).join('').toLocaleUpperCase('uk');
        const name=document.createElement('span');name.textContent=person.name;
        item.append(avatar,name);list.append(item);
      });
      count.textContent=String(data.count);count.hidden=false;list.hidden=!data.people.length;
      status.textContent=data.people.length?'':'Зараз нікого немає онлайн.';status.hidden=Boolean(data.people.length);
      notice.hidden=data.identified!==false;
      panel.dataset.state=data.people.length?'ready':'empty';
    }catch{
      // Do not retain stale names/counts as if the service were healthy.
      list.replaceChildren();list.hidden=true;count.hidden=true;notice.hidden=true;status.hidden=false;
      status.textContent='Не вдалося оновити список команди. Спробуємо знову автоматично.';panel.dataset.state='error';
    }finally{
      clearTimeout(timeout);running=false;panel.setAttribute('aria-busy','false');
    }
  }
  function start(){clearInterval(timer);refresh();timer=setInterval(refresh,30000);}
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
  window.addEventListener('pagehide',()=>clearInterval(timer));
  window.addEventListener('pageshow',start);
  start();
})();
