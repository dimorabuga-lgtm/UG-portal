import {json,sameOrigin,sessionCookie,revokeSession,authDiagnostic} from '../../server/auth.mjs';
export async function onRequest({request,env}) {
  if (request.method !== 'POST') return json({error:'Метод не підтримується'},405,{Allow:'POST'});
  if (!sameOrigin(request)) return json({error:'Запит відхилено'},403);
  try {
    await revokeSession(request,env);
    return json({ok:true},200,{'Set-Cookie':sessionCookie(request,'',0)});
  } catch { authDiagnostic('SESSION_REVOKE_FAILED');return json({error:'Не вдалося завершити сесію. Спробуйте ще раз.'},503); }
}
