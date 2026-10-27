import { getResources } from '@/lib/catalog';
import { ResourceLibrary } from '@/components/resource-library';
export const metadata={title:'학습 자료'};
export const revalidate=60;
export default async function Resources({searchParams}:{searchParams:Promise<{q?:string;saved?:string}>}){const [resources,params]=await Promise.all([getResources(),searchParams]);return <div className="page"><div className="page-intro"><p className="eyebrow">조금씩, 차근차근</p><h1>{params.saved==='1'?'담아 둔 학습 자료':'배움이 쌓이는 자료실'}</h1><p>{params.saved==='1'?'다시 만나고 싶은 자료를 한곳에. 담은 목록은 이 기기에 저장돼요.':'발음부터 작은 대화까지. 오늘의 중국어를 한 장씩 펼쳐 보세요.'}</p></div><ResourceLibrary resources={resources} query={typeof params.q==='string'?params.q:''} savedOnly={params.saved==='1'}/></div>;}
