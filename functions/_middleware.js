import {configured,configurationIssues,authDiagnostic,response,validSession} from '../server/auth.mjs';
import {loginPage} from '../server/login-page.mjs';

export async function onRequest(context) {
  const {request,env} = context;
  const path = new URL(request.url).pathname;
  if (path === '/api/login' || path === '/api/logout') return context.next();
  // These handlers validate the same signed/revocable session themselves, returning 503 on D1 failure.
  if (path === '/api/presence' || path === '/api/presence/' || path === '/api/presence/heartbeat' || path === '/api/presence/heartbeat/') return context.next();
  if (path === '/login' || path === '/login/') {
    if (await validSession(request,env)) return response(null,303,{Location:'/'});
    return loginPage();
  }
  if (!configured(env)) {
    authDiagnostic('AUTH_CONFIGURATION_INVALID',undefined,configurationIssues(env));
    if ((request.headers.get('Accept') || '').includes('text/html')) return response(null,303,{Location:'/login'});
    return response('Вхід тимчасово недоступний. Спробуйте пізніше.',503);
  }
  if (!await validSession(request,env)) {
    if ((request.headers.get('Accept') || '').includes('text/html')) return response(null,303,{Location:'/login'});
    return response('Потрібна авторизація',401);
  }
  const result = await context.next();
  const protectedResponse = new Response(result.body,result);
  protectedResponse.headers.set('Cache-Control','no-store, private');
  protectedResponse.headers.set('X-Content-Type-Options','nosniff');
  protectedResponse.headers.set('Referrer-Policy','same-origin');
  protectedResponse.headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  return protectedResponse;
}
