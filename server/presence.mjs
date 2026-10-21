import {authenticatedSession,authDiagnostic,json} from './auth.mjs';
export const ONLINE_WINDOW=90;
export function normalizeName(value) {
  if(typeof value!=='string')return null;
  const name=value.normalize('NFC').replace(/\s+/gu,' ').trim();
  if(!name || [...name].length>80 || /[\p{Cc}\p{Cf}]/u.test(name))return null;
  return name;
}
export async function registerPresence(env,token,name,now=Math.floor(Date.now()/1000)) {
  // token is created by createSession on this server; never supplied by a client body.
  try {
    await env.AUTH_RATE_LIMIT.prepare('INSERT INTO session_presence (session_id, display_name, last_seen) VALUES (?1, ?2, ?3)').bind(token.split('.')[2],name,now).run();
    return true;
  } catch { authDiagnostic('PRESENCE_REGISTER_FAILED');return false; }
}
export async function requirePresenceSession(request,env,now=Math.floor(Date.now()/1000)) {
  return authenticatedSession(request,env,now,true);
}
export function presenceFailure() {
  authDiagnostic('PRESENCE_STORAGE_FAILED');
  return json({error:'Не вдалося оновити інформацію про команду. Спробуйте пізніше.'},503);
}
export async function onlinePeople(env,now=Math.floor(Date.now()/1000)) {
  const result=await env.AUTH_RATE_LIMIT.prepare(`SELECT p.display_name AS name FROM session_presence p
    JOIN auth_sessions s ON s.id = p.session_id
    WHERE s.expires > ?1 AND p.last_seen >= ?2 AND p.last_seen <= ?1
    ORDER BY p.display_name COLLATE NOCASE, p.session_id`).bind(now,now-ONLINE_WINDOW).all();
  return result.results.map(row=>({name:row.name})).sort((a,b)=>a.name.localeCompare(b.name,'uk'));
}
