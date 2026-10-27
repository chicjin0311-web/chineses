import { getSupabase } from '@/lib/supabase';
export const dynamic='force-dynamic';
export async function GET(){const db=getSupabase();if(!db)return Response.json({status:'unconfigured'},{status:503});const {error,count}=await db.from('resources').select('slug',{count:'exact',head:true}).eq('published',true);return Response.json({status:error?'unavailable':'ok',database:error?'unavailable':'connected',resources:error?undefined:count,region:'icn1'},{status:error?503:200,headers:{'Cache-Control':'no-store'}});}
