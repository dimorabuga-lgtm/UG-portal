import {json} from '../../../server/auth.mjs';
import {requirePresenceSession,onlinePeople,presenceFailure} from '../../../server/presence.mjs';
export async function onRequest({request,env}) {
  if(request.method!=='GET')return json({error:'Метод не підтримується'},405,{Allow:'GET'});
  let stage='PRESENCE_SESSION_LOOKUP';
  try {
    const session=await requirePresenceSession(request,env);
    if(!session)return json({error:'Потрібна авторизація'},401);
    stage='PRESENCE_LIST_QUERY';
    const people=await onlinePeople(env);
    stage='PRESENCE_IDENTITY_QUERY';
    const own=await env.AUTH_RATE_LIMIT.prepare('SELECT 1 AS registered FROM session_presence WHERE session_id = ?1').bind(session.id).first();
    return json({people,count:people.length,identified:Boolean(own)});
  } catch (error) { return presenceFailure(error,undefined,stage,env); }
}
