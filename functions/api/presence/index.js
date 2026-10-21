import {json} from '../../../server/auth.mjs';
import {requirePresenceSession,onlinePeople,presenceFailure} from '../../../server/presence.mjs';
export async function onRequest({request,env}) {
  if(request.method!=='GET')return json({error:'Метод не підтримується'},405,{Allow:'GET'});
  try {
    const session=await requirePresenceSession(request,env);
    if(!session)return json({error:'Потрібна авторизація'},401);
    const people=await onlinePeople(env);
    const own=await env.AUTH_RATE_LIMIT.prepare('SELECT 1 AS registered FROM session_presence WHERE session_id = ?1').bind(session.id).first();
    return json({people,count:people.length,identified:Boolean(own)});
  } catch { return presenceFailure(); }
}
