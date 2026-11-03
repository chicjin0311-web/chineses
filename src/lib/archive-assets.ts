export type ArchiveAsset={id:string;slug:string;kind:'worksheet'|'ppt';label:string;pages:number;size:number};
export const validAssetId=(id:string)=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
export const fileUrl=(id:string,page?:number)=>`/api/archive-assets/${id}${page?`?page=${page}`:''}`;
