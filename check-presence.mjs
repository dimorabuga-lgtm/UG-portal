import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile} from 'node:fs/promises';
import {onRequest as middleware} from './functions/_middleware.js';
import {onRequest as login} from './functions/api/login.js';
import {onRequest as logout} from './functions/api/logout.js';
import {onRequest as list} from './functions/api/presence/index.js';
import {onRequest as heartbeat} from './functions/api/presence/heartbeat.js';
import {normalizeName,onlinePeople,registerPresence} from './server/presence.mjs';
import {COOKIE,createSession,validSession,TTL} from './server/auth.mjs';
const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');
for(const file of ['0001_auth_rate_limit.sql','0002_session_presence.sql'])db.exec(await readFile(new URL('./migrations/'+file,import.meta.url),'utf8'));
// Idempotent migration: applying again preserves existing auth data.
const storage={
  prepare(sql){
    return {bind(...values){
      return {
        async first(){return db.prepare(sql).get(...values);},
        async run(){return db.prepare(sql).run(...values);},
        async all(){return {results:db.prepare(sql).all(...values)};}
      };
    }};
  }
};
const env={PORTAL_PASSWORD:crypto.randomUUID(),SESSION_SECRET:crypto.randomUUID()+crypto.randomUUID(),AUTH_RATE_LIMIT:storage};
const origin='https://portal.test';const logs=[];const originalLog=console.error;console.error=value=>logs.push(String(value));
async function request(route,{cookie,method='GET',body,bindings=env,foreign=false}={}){
 const headers={Origin:foreign?'https://other.test':origin,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})};
 const req=new Request(origin+route,{method,headers,...(body===undefined?{}:{body:JSON.stringify(body)})});
 return middleware({request:req,env:bindings,next:()=>{
  const handlers={'/api/login':login,'/api/logout':logout,'/api/presence':list,'/api/presence/heartbeat':heartbeat};
  return handlers[route]?handlers[route]({request:req,env:bindings}):new Response('private');
 }});
}
const signin=async(name,password=env.PORTAL_PASSWORD,bindings=env)=>request('/api/login',{method:'POST',body:{name,password},bindings});
assert.equal(normalizeName('  Ірина \n  Коваль  '),'Ірина Коваль');assert.equal(normalizeName(' '),null);assert.equal(normalizeName('a'.repeat(81)),null);assert.equal(normalizeName('ab\u0000cd'),null);assert.equal(normalizeName('a'.repeat(80)).length,80);
assert.equal((await signin('Ірина Коваль','wrong')).status,401);
for(const name of ['', '  ', 'a'.repeat(81),null])assert.equal((await signin(name)).status,400);
assert.equal(db.prepare('SELECT COUNT(*) AS n FROM auth_sessions').get().n,0);
const a=await signin('  Ірина   Коваль  '),b=await signin('Дмитро Шевченко');assert.equal(a.status,200);assert.equal(b.status,200);
const cookieA=a.headers.get('Set-Cookie').split(';')[0],cookieB=b.headers.get('Set-Cookie').split(';')[0];
const idA=cookieA.split('=')[1].split('.')[2],idB=cookieB.split('=')[1].split('.')[2];
db.exec(await readFile(new URL('./migrations/0002_session_presence.sql',import.meta.url),'utf8'));
let response=await request('/api/presence',{cookie:cookieA});let data=await response.json();assert.equal(data.count,2);assert.deepEqual(data.people.map(p=>p.name),['Дмитро Шевченко','Ірина Коваль']);
assert(data.people.every(p=>Object.keys(p).join(',')==='name'));assert(response.headers.get('Cache-Control').includes('no-store'));
assert(!JSON.stringify(data).includes(idA));assert(!JSON.stringify(data).includes(cookieA));
const now=Math.floor(Date.now()/1000);db.prepare('UPDATE session_presence SET last_seen=? WHERE session_id=?').run(now-91,idB);
assert.equal((await(await request('/api/presence',{cookie:cookieA})).json()).count,1);
assert.equal((await request('/api/presence/heartbeat',{method:'POST',cookie:cookieA,body:{session_id:idB,name:'Підміна'}})).status,200);
assert.equal(db.prepare('SELECT display_name,last_seen FROM session_presence WHERE session_id=?').get(idB).last_seen,now-91);
assert.equal(db.prepare('SELECT display_name FROM session_presence WHERE session_id=?').get(idA).display_name,'Ірина Коваль');
assert.equal((await request('/api/presence/heartbeat',{method:'POST',cookie:cookieB})).status,200);
for(let i=0;i<3;i++)assert.deepEqual(await(await request('/api/presence/heartbeat',{method:'POST',cookie:cookieB})).json(),{ok:true,identified:true});
assert.equal(db.prepare('SELECT COUNT(*) AS n FROM session_presence WHERE session_id=?').get(idB).n,1,'Repeated bodyless heartbeats update one row');
assert.equal((await(await request('/api/presence',{cookie:cookieA})).json()).count,2);
assert.equal((await request('/api/presence')).status,401);assert.equal((await request('/api/presence/heartbeat',{method:'POST'})).status,401);
assert.equal((await request('/api/presence/heartbeat',{method:'POST',cookie:cookieA,foreign:true})).status,403);
assert.equal((await request('/api/presence',{method:'DELETE',cookie:cookieA})).status,405);
assert.equal((await request('/api/presence/heartbeat',{cookie:cookieA})).status,405);
const expired=await createSession(env,now-TTL-1);await registerPresence(env,expired,'Expired',now);assert.equal((await request('/api/presence',{cookie:COOKIE+'='+expired})).status,401);assert.equal((await onlinePeople(env,now)).length,2);
const legacy=await createSession(env);const legacyCookie=COOKIE+'='+legacy;assert(await validSession(new Request(origin,{headers:{Cookie:legacyCookie}}),env));assert.equal((await(await request('/api/presence',{cookie:legacyCookie})).json()).identified,false);
assert.equal((await request('/api/presence/heartbeat',{method:'POST',cookie:legacyCookie})).status,200);
assert.equal((await request('/api/presence/heartbeat',{method:'POST',cookie:COOKIE+'='+expired})).status,401);
for(const route of ['/api/presence','/api/presence/heartbeat']){
  const missingBinding=await request(route,{cookie:cookieA,method:route.endsWith('heartbeat')?'POST':'GET',bindings:{...env,AUTH_RATE_LIMIT:undefined}});
  assert.equal(missingBinding.status,503);
  const diagnostic=logs.map(line=>JSON.parse(line)).findLast(entry=>entry.requestId===missingBinding.headers.get('X-Request-ID'));
  assert.equal(diagnostic.code,'D1_BINDING_MISSING');
  assert.deepEqual(diagnostic.issues,['PRESENCE_SESSION_LOOKUP']);
}
const brokenPresence={...env,AUTH_RATE_LIMIT:{prepare(sql){if(sql.includes('session_presence'))throw Error('private database diagnostic');return env.AUTH_RATE_LIMIT.prepare(sql);}}};
const partialLogin=await signin('Оператор Без Обліку',env.PORTAL_PASSWORD,brokenPresence);assert.equal(partialLogin.status,200,'Presence failure cannot prevent authentication');
const failed=await request('/api/presence',{cookie:cookieA,bindings:brokenPresence});assert.equal(failed.status,503);assert(!Object.hasOwn(await failed.json(),'people'));
const brokenAll={...env,AUTH_RATE_LIMIT:{prepare(){throw Error('private failure');}}};assert.equal((await request('/api/presence',{cookie:cookieA,bindings:brokenAll})).status,503);
assert.equal((await request('/api/logout',{cookie:cookieA,method:'POST'})).status,200);
assert.equal(db.prepare('SELECT * FROM session_presence WHERE session_id=?').get(idA),undefined);
assert.equal((await request('/api/presence',{cookie:cookieA})).status,401);assert.equal((await(await request('/api/presence',{cookie:cookieB})).json()).count,1);
assert.equal((await request('/api/presence/heartbeat',{method:'POST',cookie:cookieA})).status,401);
assert.equal((await onlinePeople(env,now+92)).length,0);
// Missing migration reproduces the generic error without affecting authentication.
db.exec('DROP TABLE session_presence');
for(const route of ['/api/presence','/api/presence/heartbeat']){
  const missing=await request(route,{cookie:cookieB,method:route.endsWith('heartbeat')?'POST':'GET'});
  assert.equal(missing.status,503);assert.match(missing.headers.get('X-Request-ID'),/^[a-f0-9-]{36}$/);
  assert(!(await missing.text()).includes('session_presence'),'SQL details must stay private');
  const diagnostic=logs.map(line=>JSON.parse(line)).findLast(entry=>entry.requestId===missing.headers.get('X-Request-ID'));
  assert.equal(diagnostic.code,'PRESENCE_TABLE_MISSING');
  assert.deepEqual(diagnostic.issues,[route.endsWith('heartbeat')?'PRESENCE_HEARTBEAT_UPDATE':'PRESENCE_LIST_QUERY']);
}
assert.equal((await signin('Без Таблиці Присутності')).status,200);
assert(logs.some(line=>JSON.parse(line).code==='PRESENCE_TABLE_MISSING'));
db.exec(await readFile(new URL('./migrations/0002_session_presence.sql',import.meta.url),'utf8'));
assert.equal((await request('/api/presence',{cookie:cookieB})).status,200,'Applying the existing migration restores the endpoint');
assert.deepEqual(await(await request('/api/presence/heartbeat',{cookie:cookieB,method:'POST'})).json(),{ok:true,identified:false},'Migration cannot recover a name that was never stored');
const recoveredLogin=await signin('Відновлений Оператор');assert.equal(recoveredLogin.status,200);
const recoveredCookie=recoveredLogin.headers.get('Set-Cookie').split(';')[0];
assert.deepEqual(await(await request('/api/presence/heartbeat',{cookie:recoveredCookie,method:'POST'})).json(),{ok:true,identified:true});
assert.deepEqual(await(await request('/api/presence',{cookie:recoveredCookie})).json(),{people:[{name:'Відновлений Оператор'}],count:1,identified:true});
db.exec('ALTER TABLE session_presence RENAME COLUMN last_seen TO invalid_column');
assert.equal((await request('/api/presence',{cookie:cookieB})).status,503);
assert(logs.some(line=>JSON.parse(line).code==='PRESENCE_SCHEMA_MISMATCH'));
assert(!logs.join('').includes(env.PORTAL_PASSWORD));assert(!logs.join('').includes(cookieA));assert(!logs.join('').includes('private database diagnostic'));
console.error=originalLog;db.close();console.log('PASS: normalized/empty/long names, wrong password, two sessions, 90s timeout, heartbeat isolation, expiry, legacy session compatibility, logout removal, unauthorized/CSRF/methods, safe DTOs, idempotent migration, missing-table reproduction/recovery, schema diagnostics and D1 fault isolation.');
