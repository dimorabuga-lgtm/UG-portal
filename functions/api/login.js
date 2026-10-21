import {configurationIssues,authDiagnostic,json,sameOrigin,allowAttempt,readPassword,passwordMatches,createSession,sessionCookie} from '../../server/auth.mjs';
export async function onRequest({request,env,waitUntil}) {
  const requestId=crypto.randomUUID();
  const reply=(data,status=200,headers={})=>json(data,status,{'X-Request-ID':requestId,...headers});
  if (request.method !== 'POST') return reply({error:'Метод не підтримується'},405,{Allow:'POST'});
  if (!sameOrigin(request)) return reply({error:'Запит відхилено'},403);
  const issues=configurationIssues(env);
  if(issues.length){authDiagnostic('AUTH_CONFIGURATION_INVALID',requestId,issues);return reply({error:'Вхід тимчасово недоступний'},503);}
  if(!env.AUTH_RATE_LIMIT?.prepare){authDiagnostic('D1_BINDING_MISSING',requestId);return reply({error:'Вхід тимчасово недоступний'},503);}
  let stage='RATE_LIMIT_CHECK_FAILED';
  try {
    if (!await allowAttempt(request,env)) return reply({error:'Забагато спроб. Спробуйте пізніше.'},429,{'Retry-After':'600'});
    stage='LOGIN_REQUEST_READ_FAILED';
    const password = await readPassword(request);
    stage='PASSWORD_CHECK_FAILED';
    if (password === null || !await passwordMatches(password,env.PORTAL_PASSWORD)) return reply({error:'Неправильний пароль'},401);
    stage='SESSION_CREATE_FAILED';
    const token = await createSession(env);
    // Opportunistic cleanup; limiter data older than an hour is no longer useful.
    if (waitUntil) waitUntil(env.AUTH_RATE_LIMIT.prepare('DELETE FROM login_attempts WHERE started < ?1').bind(Math.floor(Date.now()/1000)-3600).run().catch(()=>{}));
    if (waitUntil) waitUntil(env.AUTH_RATE_LIMIT.prepare('DELETE FROM auth_sessions WHERE expires <= ?1').bind(Math.floor(Date.now()/1000)).run().catch(()=>{}));
    return reply({ok:true},200,{'Set-Cookie':sessionCookie(request,token)});
  } catch { authDiagnostic(stage,requestId);return reply({error:'Вхід тимчасово недоступний'},503); }
}
