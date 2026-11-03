export function studioPath(value?:string|null){
 if(!value)return '/studio';
 try {const url=new URL(value,'https://studio.invalid');if(url.origin!=='https://studio.invalid'||url.pathname!=='/studio')return '/studio';const slug=url.searchParams.get('slug');return slug&&/^[a-z0-9][a-z0-9-]{0,99}$/.test(slug)?`/studio?slug=${slug}`:'/studio';}catch{return '/studio';}
}
