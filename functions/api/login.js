import {configured,json,sameOrigin,allowAttempt,readPassword,passwordMatches,createSession,sessionCookie} from '../../server/auth.mjs';
export async function onRequest({request,env,waitUntil}) {
  if (request.method !== 'POST') return json({error:'Метод не підтримується'},405,{Allow:'POST'});
  if (!sameOrigin(request)) return json({error:'Запит відхилено'},403);
  if (!configured(env)) return json({error:'Вхід тимчасово недоступний'},503);
  try {
    if (!await allowAttempt(request,env)) return json({error:'Забагато спроб. Спробуйте пізніше.'},429,{'Retry-After':'600'});
    const password = await readPassword(request);
    if (password === null || !await passwordMatches(password,env.PORTAL_PASSWORD)) return json({error:'Неправильний пароль'},401);
    const token = await createSession(env);
    // Opportunistic cleanup; limiter data older than an hour is no longer useful.
    if (waitUntil) waitUntil(env.AUTH_RATE_LIMIT.prepare('DELETE FROM login_attempts WHERE started < ?1').bind(Math.floor(Date.now()/1000)-3600).run().catch(()=>{}));
    if (waitUntil) waitUntil(env.AUTH_RATE_LIMIT.prepare('DELETE FROM auth_sessions WHERE expires <= ?1').bind(Math.floor(Date.now()/1000)).run().catch(()=>{}));
    return json({ok:true},200,{'Set-Cookie':sessionCookie(request,token)});
  } catch { return json({error:'Вхід тимчасово недоступний'},503); }
}
