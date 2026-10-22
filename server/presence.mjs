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
  } catch (error) {
    authDiagnostic(presenceErrorCode(error,env),undefined,['PRESENCE_REGISTER_FAILED']);
    return false;
  }
}
export async function requirePresenceSession(request,env,now=Math.floor(Date.now()/1000)) {
  return authenticatedSession(request,env,now,true);
}
function presenceErrorCode(error,env) {
  // Classify locally; SQL messages, names, tokens and exception details never leave the server.
  if(env && typeof env.AUTH_RATE_LIMIT?.prepare!=='function')return 'D1_BINDING_MISSING';
  const message=[error?.message,error?.cause?.message].filter(value=>typeof value==='string').join(' ');
  return /no such table:\s*(?:main\.)?session_presence\b/i.test(message)?'PRESENCE_TABLE_MISSING'
    : /no such table:\s*(?:main\.)?auth_sessions\b/i.test(message)?'PRESENCE_AUTH_TABLE_MISSING'
    : /no such column\b/i.test(message)?'PRESENCE_SCHEMA_MISMATCH':'PRESENCE_STORAGE_FAILED';
}
export function presenceFailure(error,requestId=crypto.randomUUID(),stage='PRESENCE_STORAGE_FAILED',env) {
  authDiagnostic(presenceErrorCode(error,env),requestId,[stage]);
  return json({error:'Не вдалося оновити інформацію про команду. Спробуйте пізніше.'},503,{'X-Request-ID':requestId});
}
export async function onlinePeople(env,now=Math.floor(Date.now()/1000)) {
  const result=await env.AUTH_RATE_LIMIT.prepare(`SELECT p.display_name AS name FROM session_presence p
    JOIN auth_sessions s ON s.id = p.session_id
    WHERE s.expires > ?1 AND p.last_seen >= ?2 AND p.last_seen <= ?1
    ORDER BY p.display_name COLLATE NOCASE, p.session_id`).bind(now,now-ONLINE_WINDOW).all();
  return result.results.map(row=>({name:row.name})).sort((a,b)=>a.name.localeCompare(b.name,'uk'));
}
