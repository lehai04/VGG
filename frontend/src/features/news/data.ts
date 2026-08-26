export const newsCategories = [
  { value: "ADMISSIONS", label: "Tuyển sinh" },
  { value: "VAN_LANG_UNIVERSITY", label: "Trường Đại học Văn Lang" },
  { value: "UNIVERSITY_EVENT", label: "Sự kiện trường" },
  { value: "VAN_LANG_LIFE", label: "Đời sống Văn Lang" },
  { value: "INTERNATIONAL_COOPERATION", label: "Hợp tác quốc tế" },
] as const;
export type NewsPost = { id:string; slug:string; title:string; category:string; excerpt:string|null; content:string; coverImage:string|null; publishedAt:string|null; authorName:string|null; author?:{fullName:string} };
export function categoryLabel(category:string) { return newsCategories.find((item)=>item.value===category)?.label ?? "Tin tức"; }
export async function getNewsPosts(options:{category?:string;limit?:number;q?:string}={}) { const backend=process.env.BACKEND_INTERNAL_URL; if(!backend)return []; try { const params=new URLSearchParams({locale:"vi",limit:String(options.limit??30)}); if(options.category)params.set("category",options.category);if(options.q)params.set("q",options.q); const response=await fetch(`${backend}/api/public/news?${params}`,{next:{revalidate:60}}); if(!response.ok)throw new Error(); const payload=await response.json() as {data:{posts:NewsPost[]}}; return payload.data.posts; } catch{return [];} }
export async function getNewsPost(slug:string) { const backend=process.env.BACKEND_INTERNAL_URL; if(!backend)return null; try { const response=await fetch(`${backend}/api/public/news/${encodeURIComponent(slug)}`,{next:{revalidate:60}}); if(!response.ok)return null; const payload=await response.json() as {data:{post:NewsPost}}; return payload.data.post; } catch{return null;} }
