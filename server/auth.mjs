export const TTL = 12 * 60 * 60;
export const COOKIE = 'ug_portal_session';
const encoder = new TextEncoder();
export function configurationIssues(env) {
  const issues=[];
  if(typeof env?.PORTAL_PASSWORD!=='string'||!env.PORTAL_PASSWORD.length)issues.push('PORTAL_PASSWORD_MISSING');
  if(typeof env?.SESSION_SECRET!=='string'||!env.SESSION_SECRET.length)issues.push('SESSION_SECRET_MISSING');
  else if(env.SESSION_SECRET.length<32)issues.push('SESSION_SECRET_TOO_SHORT');
  return issues;
}
export function configured(env) {
  return configurationIssues(env).length === 0;
}
export function authDiagnostic(code, requestId = crypto.randomUUID(), issues = []) {
  // Only static diagnostic codes: never pass Error objects, requests, cookies or env values here.
  console.error(JSON.stringify({event:'portal_auth_failure',code,requestId,...(issues.length?{issues}:{})}));
}
export function response(body, status = 200, headers = {}) {
  return new Response(body, {status, headers: {'Cache-Control':'no-store, private', 'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'same-origin', ...headers}});
}
export function json(data, status = 200, headers = {}) {
  return response(JSON.stringify(data), status, {'Content-Type':'application/json; charset=utf-8', ...headers});
}
export function sameOrigin(request) {
  return request.headers.get('Origin') === new URL(request.url).origin && request.headers.get('Sec-Fetch-Site') !== 'cross-site';
}
async function key(env) {
  // Rotating either secret invalidates every existing session.
  return crypto.subtle.importKey('raw', encoder.encode(JSON.stringify([env.SESSION_SECRET, env.PORTAL_PASSWORD])), {name:'HMAC', hash:'SHA-256'}, false, ['sign','verify']);
}
const hex = bytes => [...new Uint8Array(bytes)].map(value => value.toString(16).padStart(2,'0')).join('');
export async function passwordMatches(value, expected) {
  const a = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
  const b = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(expected)));
  let diff = 0; for (let i=0;i<a.length;i++) diff |= a[i] ^ b[i]; return diff === 0;
}
export async function createSession(env, now = Math.floor(Date.now()/1000)) {
  const nonce = hex(crypto.getRandomValues(new Uint8Array(16)));
  const payload = `${now}.${now + TTL}.${nonce}`;
  await env.AUTH_RATE_LIMIT.prepare('INSERT INTO auth_sessions (id, expires) VALUES (?1, ?2)').bind(nonce,now+TTL).run();
  return `${payload}.${hex(await crypto.subtle.sign('HMAC', await key(env), encoder.encode(payload)))}`;
}
async function verifiedToken(request, env, now = Math.floor(Date.now()/1000)) {
  if (!configured(env)) return false;
  const cookie = (request.headers.get('Cookie') || '').split(';').map(part => part.trim()).find(part => part.startsWith(COOKIE+'='));
  const token = cookie?.slice(COOKIE.length+1) || '';
  if (!/^\d{1,12}\.\d{1,12}\.[a-f0-9]{32}\.[a-f0-9]{64}$/.test(token)) return false;
  const [issued, expiry, nonce, signature] = token.split('.');
  if (+issued > now || +expiry <= now || +expiry - +issued !== TTL) return false;
  const bytes = new Uint8Array(signature.match(/../g).map(part => parseInt(part,16)));
  if (!await crypto.subtle.verify('HMAC', await key(env), bytes, encoder.encode(`${issued}.${expiry}.${nonce}`))) return false;
  return {nonce,expiry:+expiry};
}
export async function authenticatedSession(request, env, now = Math.floor(Date.now()/1000), strict = false) {
  const token = await verifiedToken(request,env,now);
  if (!token) return false;
  try {
    const session = await env.AUTH_RATE_LIMIT.prepare('SELECT expires FROM auth_sessions WHERE id = ?1').bind(token.nonce).first();
    return session && session.expires > now && session.expires === token.expiry ? {id:token.nonce,expires:token.expiry} : null;
  } catch (error) { authDiagnostic('SESSION_LOOKUP_FAILED'); if(strict)throw error;return null; }
}
export async function validSession(request, env, now = Math.floor(Date.now()/1000)) {
  return Boolean(await authenticatedSession(request,env,now));
}
export async function revokeSession(request,env) {
  const token = await verifiedToken(request,env);
  if (!token) return;
  // Do not swallow database failures and report a successful logout without revocation.
  await env.AUTH_RATE_LIMIT.prepare('DELETE FROM auth_sessions WHERE id = ?1').bind(token.nonce).run();
  // The old schema remains usable if the separate presence migration is not installed yet.
  try { await env.AUTH_RATE_LIMIT.prepare('DELETE FROM session_presence WHERE session_id = ?1').bind(token.nonce).run(); }
  catch { authDiagnostic('PRESENCE_CLEANUP_FAILED'); }
}
export function sessionCookie(request, value, maxAge = TTL) {
  return `${COOKIE}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${new URL(request.url).protocol === 'https:' ? '; Secure' : ''}`;
}
export async function allowAttempt(request, env, now = Math.floor(Date.now()/1000)) {
  if (!env.AUTH_RATE_LIMIT?.prepare) throw Error('Rate limiter unavailable');
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  // HMAC avoids storing raw IP addresses. Atomic UPSERT prevents lost increments.
  const identity = hex(await crypto.subtle.sign('HMAC', await key(env), encoder.encode(ip)));
  const row = await env.AUTH_RATE_LIMIT.prepare(`INSERT INTO login_attempts (identity, started, attempts)
    VALUES (?1, ?2, 1) ON CONFLICT(identity) DO UPDATE SET
    attempts = CASE WHEN started <= ?2 - 600 THEN 1 ELSE MIN(attempts + 1, 11) END,
    started = CASE WHEN started <= ?2 - 600 THEN ?2 ELSE started END RETURNING attempts`).bind(identity,now).first();
  return row && row.attempts <= 10;
}
export async function readLoginRequest(request) {
  if (!(request.headers.get('Content-Type') || '').startsWith('application/json')) return null;
  const reader = request.body?.getReader(); if (!reader) return null;
  let total = 0; const chunks = [];
  while (true) { const {done,value} = await reader.read(); if (done) break; total += value.length; if (total > 4096) { await reader.cancel(); return null; } chunks.push(value); }
  try { const bytes = new Uint8Array(total); let offset=0; for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;} const data=JSON.parse(new TextDecoder().decode(bytes)); return typeof data.password === 'string' && data.password.length <= 1024 ? {password:data.password,name:data.name} : null; }
  catch { return null; }
}
export async function readPassword(request) { return (await readLoginRequest(request))?.password ?? null; }
