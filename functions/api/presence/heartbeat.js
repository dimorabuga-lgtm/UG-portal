import {json,sameOrigin} from '../../../server/auth.mjs';
import {requirePresenceSession,presenceFailure} from '../../../server/presence.mjs';
export async function onRequest({request,env}) {
  if(request.method!=='POST')return json({error:'Метод не підтримується'},405,{Allow:'POST'});
  if(!sameOrigin(request))return json({error:'Запит відхилено'},403);
  try {
    const session=await requirePresenceSession(request,env);
    if(!session)return json({error:'Потрібна авторизація'},401);
    // The body is deliberately ignored: neither identity nor name can be changed through heartbeat.
    const updated=await env.AUTH_RATE_LIMIT.prepare(`UPDATE session_presence SET last_seen = ?1 WHERE session_id = ?2
      AND EXISTS (SELECT 1 FROM auth_sessions WHERE id = ?2 AND expires > ?1) RETURNING session_id`).bind(Math.floor(Date.now()/1000),session.id).first();
    return json({ok:true,identified:Boolean(updated)});
  } catch { return presenceFailure(); }
}
