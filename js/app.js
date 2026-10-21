(() => {
'use strict';
  const icons = {
    check: '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10L13 3Z"/><path d="M13 3v7h7M8 15l3 3 5-6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18M7 15h2m3 0h2m3 0h1M7 18h2m3 0h2"/>',
    calculator: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h1m3 0h1m3 0h.1M8 18h1m3 0h1m3 0h.1"/>',
    plus: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 15h8m-4-4v8"/>',
    minus: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 15h8"/>',
    book: '<path d="M12 5C8 2 3 3 2 4v16c3-2 7-1 10 1 3-2 7-3 10-1V4c-3-2-7-1-10 1Zm0 0v16M5 8l4 1M5 12l4 1m6-4 4-1m-4 5 4-1"/>',
    list: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h.1M11 7h5M8 12h.1m3 0h5M8 17h.1m3 0h5"/>',
    cap: '<path d="m2 9 10-6 10 6-10 6L2 9Zm4 3v6c4 3 8 3 12 0v-6m4-3v9"/>',
    chat: '<path d="M21 11a9 9 0 0 1-9 9H4l-3 2 2-6a9 9 0 1 1 18-5Z"/><path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3h.01"/>'
  };

icons['document-plus']=icons.plus;icons['document-minus']=icons.minus;icons.notebook=icons.list;icons.graduation=icons.cap;icons.question=icons.chat;
icons.headset = '<path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H3v6h4v-6H4Zm16 0h1v6h-4v-6h3Zm0 6c0 3-3 4-7 4"/><path d="M11 21h3"/>';
icons.users = '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2"/>';
icons.settings = '<path d="m10 2-1 3-3 1-3-1-2 4 2 2v3l-2 2 2 4 3-1 3 1 1 3h4l1-3 3-1 3 1 2-4-2-2v-3l2-2-2-4-3 1-3-1-1-3h-4Z"/><circle cx="12" cy="12.5" r="3.5"/>';
icons.chart = '<path d="M3 3v18h18M7 17v-5h3v5m3 0V8h3v9m3 0V4h3v13"/>';
icons.phone = '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4m-3 14h2"/>';
icons.video = '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3V9Z"/>';
function svgIcon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('aria-hidden','true'); svg.innerHTML = icons[name] || icons.check;
  return svg;
}
const {categories = [], resources = []} = window.portalCatalog || {};
const grid = document.querySelector('#resource-grid');
const dialog = document.querySelector('#resource-dialog');
const search = document.querySelector('#resource-search');
const clear = document.querySelector('#clear-search');
const results = document.querySelector('#search-results');
const status = document.querySelector('#search-status');
const storageKeys = {favorites: 'ug.portal.favorites.v1', recent: 'ug.portal.recent.v1', recentTimes: 'ug.portal.recent-times.v1'};
function readStored(key) {
  try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? [...new Set(value.filter(id => typeof id === 'string'))] : []; }
  catch { return []; }
}
let favorites = new Set(readStored(storageKeys.favorites));
let recent = readStored(storageKeys.recent).slice(0, 5);
let recentTimes = {};
try {
  const stored = JSON.parse(localStorage.getItem(storageKeys.recentTimes) || '{}');
  if(stored && typeof stored==='object' && !Array.isArray(stored)) {
    recentTimes=Object.fromEntries(recent.filter(id=>Object.hasOwn(stored,id)&&Number.isFinite(stored[id])&&stored[id]>0&&stored[id]<=Date.now()).map(id=>[id,stored[id]]));
  }
} catch {}
let activeFilter = 'all';
const filters = [
  {id:'all', title:'Усі ресурси'},
  {id:'regulations', title:'Регламенти', categories:['regulations']},
  {id:'schedules', title:'Графіки', categories:['schedule','makeup-schedule','extra-shifts']},
  {id:'payments', title:'Розрахунки', categories:['payroll','extra-shifts']},
  {id:'instructions', title:'Інструкції', categories:['instructions','roles','faq']},
  {id:'training', title:'Навчання', categories:['training']},
  {id:'favorites', title:'★ Обрані'}
];
function persist(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { document.querySelector('#storage-status').textContent = 'Сховище браузера недоступне. Обране та історія збережуться лише до закриття сторінки.'; }
}
// Larger priority values appear first; equal values preserve configuration order.
const ordered = documents => documents.slice().sort((a,b) => (Number(b.priority) || 0) - (Number(a.priority) || 0));
const resourceCategories = resource => [...new Set([
  ...(Array.isArray(resource.categories) ? resource.categories : [resource.category]),
  ...categories.filter(category=>category.sections?.some(section=>section.resourceIds?.includes(resource.id))).map(category=>category.category)
])].filter(Boolean);
const categoryLabel = resource => resourceCategories(resource).map(key => categories.find(item => item.category === key)?.title || key).join(' · ');
function documentState(resource) {
  if (resource.status === 'unconfigured') return {label:'Не налаштовано', url:null};
  if (resource.status === 'unavailable') return {label:'Ресурс тимчасово недоступний', url:null};
  const url = address(resource.url);
  return url ? {label:'Доступний', url} : {label:'Очікує посилання', url:null};
}
function remember(resource) {
  if (!documentState(resource).url) return;
  recent = [resource.id, ...recent.filter(id => id !== resource.id)].slice(0,5);
  recentTimes[resource.id]=Date.now();
  recentTimes=Object.fromEntries(recent.filter(id=>Object.hasOwn(recentTimes,id)).map(id=>[id,recentTimes[id]]));
  persist(storageKeys.recent, recent);persist(storageKeys.recentTimes,recentTimes);renderRecent();
}
const types = {sheets: ['Google Sheets', '▦'], docs: ['Google Docs', '▤'], pdf: ['PDF', 'PDF'], site: ['Інший сайт', '↗']};
const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase('uk').replace(/[’ʼ`]/g, "'").trim();
function address(value) {
  try { const parsed = new URL(value); return ['https:', 'http:'].includes(parsed.protocol) && !parsed.username && !parsed.password ? parsed.href : null; }
  catch { return null; }
}
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function renderDocuments(container, documents, modalView = false, append = false) {
  if (!append) container.replaceChildren();
  if (!documents.length) { container.append(element('p', 'empty-documents', 'У цьому розділі поки немає доданих документів')); return; }
  ordered(documents).forEach(resource => {
    const [typeName, symbol] = types[resource.type] || types.site;
    const row = element('article', 'document-row');
    const icon = element('span', 'document-icon', symbol); icon.setAttribute('aria-hidden', 'true');
    row.dataset.documentId = resource.id;
    if (modalView) {
      row.classList.add('modal-resource-card');
      row.style.setProperty('--reg-accent', resource.modalAccent || '#b59aff');
      row.style.setProperty('--reg-delay', `${container.children.length * 35}ms`);
      icon.replaceChildren(svgIcon(resource.modalIcon || 'check'));
    }
    const copy = element('div', 'document-copy');
    const titleLine = element('div', 'document-title-line');
    const star = element('button', 'favorite-button', favorites.has(resource.id) ? '★' : '☆');
    star.type = 'button'; star.dataset.favoriteId = resource.id;
    function updateStar() {
      star.textContent = favorites.has(resource.id) ? '★' : '☆';
      star.setAttribute('aria-pressed', String(favorites.has(resource.id)));
      star.setAttribute('aria-label', `${favorites.has(resource.id) ? 'Прибрати з обраного' : 'Додати в обране'}: ${resource.title}`);
    }
    updateStar();
    star.addEventListener('click', () => {
      if (favorites.has(resource.id)) favorites.delete(resource.id); else favorites.add(resource.id);
      persist(storageKeys.favorites, [...favorites]);
      document.querySelectorAll('[data-favorite-id]').forEach(button => {
        const selected = favorites.has(button.dataset.favoriteId);
        button.textContent = selected ? '★' : '☆'; button.setAttribute('aria-pressed', String(selected));
        const item = resources.find(item => item.id === button.dataset.favoriteId);
        button.setAttribute('aria-label', `${selected ? 'Прибрати з обраного' : 'Додати в обране'}: ${item?.title || ''}`);
      });
      filter();
    });
    titleLine.append(element('h3', '', resource.title), star);
    copy.append(titleLine, element('p', '', resource.description), element('span', 'document-meta', `${categoryLabel(resource)} · ${typeName}`));
    const {url, label} = documentState(resource);
    copy.append(element('span', 'document-status', label));
    if (modalView && !url) copy.append(element('span','missing-regulation-link',label === 'Очікує посилання' ? 'Посилання ще не додано' : label));
    const isSearch = container === results && !categories.some(category=>category.directResourceId===resource.id);
    const action = element(url && !isSearch ? 'a' : 'button', 'document-action', isSearch ? 'Переглянути' : resource.buttonLabel || 'Відкрити');
    if (isSearch) {
      action.type='button'; action.addEventListener('click',()=>{
        const category = categories.find(cat => resourceCategories(resource).includes(cat.category));
        if (category) openCategory(category,resource.id);
      });
    } else if (url) {
      action.href = url; action.target = '_blank'; action.rel = 'noopener noreferrer';
      action.setAttribute('aria-label', `Відкрити: ${resource.title} (у новій вкладці)`);
      action.addEventListener('click', () => remember(resource));
      action.addEventListener('auxclick', event => { if (event.button === 1) remember(resource); });
    } else {
      action.type = 'button'; action.disabled = true;
      action.setAttribute('aria-label', `${resource.title}: ${label}`);
    }
    row.append(icon, copy, action); container.append(row);
    if (modalView) { const arrow=element('span','regulation-arrow','→'); arrow.setAttribute('aria-hidden','true'); action.append(arrow); }
  });
}
let modalTrigger = null;
let savedScroll = 0;
let closeTimer;
function renderSections(category) {
  const container=document.querySelector('#dialog-documents');container.replaceChildren();
  const assigned=new Set();
  (category.sections || []).forEach(section=>{
    const documents=(section.resourceIds || []).map(id=>resources.find(resource=>resource.id===id)).filter(Boolean);
    documents.forEach(resource=>assigned.add(resource.id));
    const view = documents.length === 1 ? {...documents[0]} : {id:section.id,category:category.category,url:'',status:'pending',type:section.type};
    Object.assign(view,{title:section.title,description:section.description,modalIcon:section.icon,modalAccent:section.accent || category.accent});
    const holder=element('div');renderDocuments(holder,[view],true);
    const tile=holder.firstElementChild;tile.dataset.sectionId=section.id;
    tile.style.setProperty('--reg-delay',`${container.children.length*30}ms`);
    if(documents.length!==1)tile.querySelector('.favorite-button').remove();
    if(documents.length>1 || section.questions?.length){
      tile.querySelector('.missing-regulation-link')?.remove();
      const action=tile.querySelector('.document-action');action.remove();
      const details=element('details','section-details');
      const summary=element('summary','document-action',documents.length>1?'Переглянути документи':'Питання та відповіді');details.append(summary);
      const list=element('div','nested-documents');
      if(documents.length>1)renderDocuments(list,documents);
      (section.questions || []).forEach(item=>{
        const answer=element('details','faq-answer');answer.append(element('summary','',item.question),element('p','',item.answer));list.append(answer);
      });
      details.append(list);tile.append(details);
    }
    container.append(tile);
  });
  // Documents added later remain visible even before assignment to a subcategory.
  const extra=resources.filter(resource=>resourceCategories(resource).includes(category.category)&&!assigned.has(resource.id));
  if(extra.length)renderDocuments(container,extra,true,true);
  if(!container.children.length)container.append(element('p','empty-documents','У цьому розділі поки немає доданих документів'));
  const count=container.children.length;
  dialog.dataset.layout=count===5?'five':count===2?'two':count===1?'one':'grid';
}
function openCategory(category, focusId = null) {
  if(category.directResourceId) {
    const resource=resources.find(item=>item.id===category.directResourceId);
    const url=resource && documentState(resource).url;
    if(url){window.open(url,'_blank','noopener,noreferrer');remember(resource);}
    return;
  }
  if(!dialog.open){modalTrigger=document.activeElement;savedScroll=window.scrollY;}
  clearTimeout(closeTimer);dialog.classList.remove('is-closing');
  dialog.classList.add('portal-dialog');
  dialog.dataset.category=category.category;
  dialog.style.setProperty('--section-accent',category.accent);
  let headerIcon = document.querySelector('#regulations-header-icon');
  if (!headerIcon) {
    headerIcon = element('span','regulations-header-icon'); headerIcon.id='regulations-header-icon';
    document.querySelector('.dialog-header').prepend(headerIcon);
  }
  headerIcon.replaceChildren(svgIcon(category.icon));headerIcon.hidden=false;
  document.querySelector('#dialog-title').textContent = category.title;
  document.querySelector('#dialog-description').textContent = category.modalDescription || category.description;
  renderSections(category);
  if(!dialog.open)dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
  if(focusId){
    const section=category.sections?.find(section=>section.id===focusId||section.resourceIds?.includes(focusId));
    const target=[...dialog.querySelectorAll('[data-section-id],[data-document-id]')].find(node=>node.dataset.sectionId===section?.id||node.dataset.documentId===focusId);
    if(target){
      target.querySelectorAll('.section-details').forEach(details=>details.open=true);
      target.classList.add('search-highlight');target.tabIndex=-1;
      target.scrollIntoView({block:'nearest'});target.focus({preventScroll:true});
    }
  }
}
categories.forEach((category, index) => {
  const card = element('article', 'resource-card'); card.dataset.resourceId = category.id;
  card.style.setProperty('--accent', category.accent); card.style.setProperty('--glow', category.accent); card.style.setProperty('--delay', `${index * 35}ms`);
  const icon = element('span', 'card-icon'); icon.setAttribute('aria-hidden', 'true');
  icon.append(svgIcon(({roles:'users',instructions:'book'})[category.category] || category.icon));
  const directResource=resources.find(resource=>resource.id===category.directResourceId);
  const directUrl=directResource && documentState(directResource).url;
  const button = element(directUrl?'a':'button', 'resource-action category-action', category.buttonLabel);
  if(category.directResourceId) {
    if(directUrl){
      button.href=directUrl;button.target='_blank';button.rel='noopener noreferrer';
      button.setAttribute('aria-label',`Відкрити: ${directResource.title} (у новій вкладці)`);
      button.addEventListener('click',()=>remember(directResource));
      button.addEventListener('auxclick',event=>{if(event.button===1)remember(directResource);});
    }else{button.type='button';button.disabled=true;button.textContent='Посилання ще не додано';}
  }else{
    button.type = 'button'; button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-controls', 'resource-dialog'); button.setAttribute('aria-label', `Відкрити розділ: ${category.title}`);
    button.addEventListener('click', () => openCategory(category));
  }
  card.append(icon, element('h2', '', category.title), element('p', '', category.description), button); grid.append(card);
});
function closeDialog(){
  if(!dialog.open || dialog.classList.contains('is-closing'))return;
  dialog.classList.add('is-closing');
  closeTimer=setTimeout(()=>dialog.close(),window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:180);
}
document.querySelector('#close-dialog').addEventListener('click', closeDialog);
dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
// Only a full pointer gesture on the backdrop closes the window.
let backdropDown = false;
function outside(event) { const box = dialog.getBoundingClientRect(); return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom; }
dialog.addEventListener('pointerdown', event => { backdropDown = event.target === dialog && outside(event); });
dialog.addEventListener('click', event => { if (backdropDown && event.target === dialog && outside(event)) closeDialog(); backdropDown = false; });
dialog.addEventListener('close', () => {
  dialog.classList.remove('is-closing');document.body.classList.remove('modal-open');
  window.scrollTo({top:savedScroll,behavior:'instant'});
  if(modalTrigger?.isConnected)modalTrigger.focus({preventScroll:true});
});
// Native dialog handles Escape, focus trapping and return to the trigger.
function filter() {
  const words = normalize(search.value).split(/\s+/).filter(Boolean);
  clear.hidden = !search.value;
  const filtered = activeFilter !== 'all';
  results.hidden = !words.length && !filtered;
  results.replaceChildren(); status.textContent = '';
  const selected = filters.find(item => item.id === activeFilter);
  document.querySelectorAll('.resource-card').forEach(card => {
    const category = categories.find(item => item.id === card.dataset.resourceId);
    card.hidden = Boolean(selected.categories && !selected.categories.includes(category?.category));
  });
  if (!words.length && !filtered) return;
  const matches = resources.filter(resource => {
    if (selected.categories && !resourceCategories(resource).some(key => selected.categories.includes(key))) return false;
    if (activeFilter === 'favorites' && !favorites.has(resource.id)) return false;
    const sectionText=categories.flatMap(category=>category.sections || []).filter(section=>section.resourceIds?.includes(resource.id)).map(section=>`${section.title} ${section.description}`).join(' ');
    const text = normalize(`${resource.title} ${resource.description} ${resourceCategories(resource).join(' ')} ${categoryLabel(resource)} ${sectionText}`);
    return words.every(word => text.includes(word));
  });
  if (matches.length) renderDocuments(results, matches);
  let groupCount=0;
  if(words.length && activeFilter!=='favorites')categories.forEach(category=>{
    if(category.directResourceId)return;
    if(selected.categories&&!selected.categories.includes(category.category))return;
    const sections=(category.sections || []).filter(section=>words.every(word=>normalize(`${section.title} ${section.description} ${category.title} ${(section.questions || []).map(item=>`${item.question} ${item.answer}`).join(' ')}`).includes(word)));
    const rootMatch=words.every(word=>normalize(`${category.title} ${category.description}`).includes(word));
    if(!sections.length&&!rootMatch)return;
    const group=element('div','search-sections');
    (rootMatch?[null]:sections).forEach(section=>{
      const button=element('button','search-section',`${category.title}${section?' · '+section.title:''}`);button.type='button';
      button.addEventListener('click',()=>openCategory(category,section?.id));group.append(button);groupCount++;
    });
    results.append(group);
  });
  const total=matches.length+groupCount;
  status.textContent=total?`Знайдено: ${total}`:'Нічого не знайдено. Спробуйте інший запит';
}
search.addEventListener('input', filter);
clear.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
search.addEventListener('keydown', event => { if (event.key === 'Escape' && !dialog.open) { search.value = ''; filter(); } });
filters.forEach(item => {
  const button = element('button', 'filter-button', item.title); button.type = 'button'; button.dataset.filter = item.id;
  button.setAttribute('aria-pressed', String(item.id === activeFilter));
  button.addEventListener('click', () => {
    activeFilter = item.id;
    document.querySelectorAll('[data-filter]').forEach(control => control.setAttribute('aria-pressed', String(control.dataset.filter === activeFilter)));
    filter();
  });
  document.querySelector('#category-filters').append(button);
});
const quickDefaults = [
  {category:'schedule', title:'Графік роботи'}, {category:'payroll', title:'Розрахунки'},
  {category:'extra-shifts', resourceId:'extra-shifts-and-fines', title:'Додаткові виходи та штрафи'},
  {category:'regulations', title:'Регламенти'}, {category:'instructions', title:'Робочі інструкції'}
];
(window.portalCatalog.quickAccess || quickDefaults).forEach(item => {
  const category = categories.find(category => category.category === item.category);
  const resource = resources.find(resource => resource.id === (item.resourceId || category?.directResourceId));
  const url = resource && documentState(resource).url;
  const control = element(url ? 'a' : 'button', 'quick-link', item.title || resource?.title || category?.title);
  if (url) { control.href = url; control.target = '_blank'; control.rel = 'noopener noreferrer'; control.addEventListener('click', () => remember(resource)); control.addEventListener('auxclick', event => { if (event.button === 1) remember(resource); }); }
  else { control.type = 'button'; control.addEventListener('click', () => { if (category) openCategory(category); }); }
  document.querySelector('#quick-links').append(control);
});
const relativeTime = new Intl.RelativeTimeFormat('uk', {numeric:'always',style:'short'});
function recentTimeLabel(timestamp) {
  const seconds=Math.max(0,Math.floor((Date.now()-timestamp)/1000));
  if(seconds<60)return 'Щойно';
  if(seconds<3600)return relativeTime.format(-Math.floor(seconds/60),'minute');
  if(seconds<86400)return relativeTime.format(-Math.floor(seconds/3600),'hour');
  return relativeTime.format(-Math.floor(seconds/86400),'day');
}
function renderRecent() {
  const container = document.querySelector('#recent-links'); container.replaceChildren();
  const documents = recent.map(id => resources.find(resource => resource.id === id)).filter(Boolean);
  document.querySelector('#clear-history').hidden = !recent.length;
  document.querySelector('#show-recent').hidden = !documents.length;
  if (!documents.length) { container.append(element('p', 'recent-empty', 'Відкриті документи з’являться тут')); return; }
  documents.forEach(resource => {
    const url = documentState(resource).url;
    const link = element(url ? 'a' : 'button', 'recent-link');
    const icon=element('span',`recent-document-icon recent-type-${resource.type || 'site'}`);icon.setAttribute('aria-hidden','true');
    const category=categories.find(category=>resourceCategories(resource).includes(category.category));
    icon.append(svgIcon(category?.icon || (resource.type==='sheets'?'calendar':'check')));
    const name=element('span','recent-document-name',resource.title);
    const timestamp=recentTimes[resource.id];
    const time=element(timestamp?'time':'span','recent-time',timestamp?recentTimeLabel(timestamp):'Нещодавно');
    if(timestamp){time.dateTime=new Date(timestamp).toISOString();time.title=new Date(timestamp).toLocaleString('uk-UA');}
    link.title=`${resource.title} · ${categoryLabel(resource)}`;
    link.append(icon,name,time);
    if (url) { link.href=url; link.target='_blank'; link.rel='noopener noreferrer'; link.addEventListener('click', () => remember(resource)); link.addEventListener('auxclick', event => { if (event.button===1) remember(resource); }); }
    else { link.type='button'; link.disabled=true; link.append(element('small', '', documentState(resource).label)); }
    container.append(link);
  });
}
document.querySelector('#show-recent').addEventListener('click',()=>{
  const documents=recent.map(id=>resources.find(resource=>resource.id===id)).filter(Boolean);
  openCategory({category:'recent',title:'Нещодавно відкриті',modalDescription:'Останні п’ять документів у цьому браузері.',accent:'#77d8ff',icon:'calendar',sections:documents.map(resource=>({id:`recent-${resource.id}`,title:resource.title,description:resource.description,icon:resource.type==='sheets'?'calendar':'check',resourceIds:[resource.id]}))});
});
document.querySelector('#clear-history').addEventListener('click', () => { recent=[];recentTimes={};persist(storageKeys.recent, recent);persist(storageKeys.recentTimes,recentTimes);renderRecent(); });
setInterval(()=>{
  if(document.hidden)return;
  document.querySelectorAll('.recent-time[datetime]').forEach(time=>{time.textContent=recentTimeLabel(Date.parse(time.dateTime));});
},60000);
renderRecent(); filter();
})();
