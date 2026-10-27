import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { randomUUID, randomBytes, createHash } from "node:crypto";
import { env } from "../../config/environment.js";
import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { fail, ok } from "../../shared/http/response.js";
import { cleanNewsHtml, newsInput } from "./cms.routes.js";
import { safeContentUrl } from "./content-patch.js";

const draftImage = z.string().max(1000).nullable().optional().refine(value => !value || safeContentUrl(value), "Đường dẫn ảnh không hợp lệ.");
const draftInput = newsInput.omit({status:true,publishedAt:true}).extend({ title:z.string().trim().min(2).max(250), excerpt:z.string().max(1000), content:z.string().max(500000).transform(cleanNewsHtml), authorName:z.string().max(120), coverImage:draftImage, ogImage:draftImage });
const envelopeSchema = z.object({ values: draftInput, baseRevision: z.string(), status:z.enum(["DRAFT","IN_REVIEW","APPROVED","CHANGES_REQUESTED"]), comment:z.string().default("") });
const keyFor = (id:string)=>`cms.news.draft.${id}`;
const identity=z.object({id:z.string().min(1).max(100)});
async function allow(request:FastifyRequest,reply:FastifyReply,permission:string){const user=await authenticateRequest(request);if(!user){fail(reply,401,"Bạn chưa đăng nhập.","UNAUTHENTICATED");return null;}if(user.mustChangePassword||(user.role.code!=="SUPER_ADMIN"&&!user.permissions.includes(permission))){fail(reply,403,"Không có quyền thực hiện thao tác này.","FORBIDDEN");return null;}return user;}
function handle(error:unknown,reply:FastifyReply){const message=error instanceof Error?error.message:"";if(message==="NOT_FOUND")return fail(reply,404,"Không tìm thấy bài viết.",message);if(message==="REVIEW")return fail(reply,422,"Cần gửi và duyệt đúng phiên bản trước khi xuất bản.",message);if(message==="SLUG_LOCKED")return fail(reply,400,"Giữ nguyên URL và ngôn ngữ của bài đã xuất bản.",message);if(message==="CONFLICT"||(error instanceof Prisma.PrismaClientKnownRequestError&&error.code==="P2034"))return fail(reply,409,"Bài viết hoặc bản nháp đã thay đổi. Sao chép nội dung cần giữ rồi tải lại.","CONFLICT");if(error instanceof Prisma.PrismaClientKnownRequestError&&error.code==="P2002")return fail(reply,409,"Slug đã tồn tại. Chọn đường dẫn khác.","DUPLICATE_SLUG");throw error;}

export async function newsWorkspaceRoutes(app:FastifyInstance){
  app.post("/api/admin/news-workspace/:id/preview",async(request,reply)=>{
    const user=await allow(request,reply,"news.view");if(!user)return;
    const {id}=identity.parse(request.params);
    const {revision}=z.object({revision:z.string()}).parse(request.body);
    const draft=await prisma.siteContent.findUnique({where:{key:keyFor(id)}});
    if(!draft||draft.updatedAt.toISOString()!==revision)return fail(reply,409,"Lưu và tải lại bản nháp trước khi xem trước.","CONFLICT");
    const envelope=envelopeSchema.parse(draft.value);const token=randomBytes(32).toString("hex");
    await prisma.siteContent.deleteMany({where:{section:"cms-news-preview",createdAt:{lt:new Date(Date.now()-3600000)}}});
    await prisma.siteContent.create({data:{key:"cms.news.preview."+createHash("sha256").update(token).digest("hex"),page:"/news/"+envelope.values.slug,locale:envelope.values.locale,section:"cms-news-preview",published:false,authorId:user.id,value:{expires:Date.now()+600000,post:{...envelope.values,id,publishedAt:null}} as Prisma.InputJsonValue}});
    reply.header("Cache-Control","private, no-store");
    return ok(reply,{url:`${env.PUBLIC_APP_URL}/${envelope.values.locale}/news/${envelope.values.slug}?cmsNewsPreview=${token}`});
  });
  app.post("/api/public/news-preview",async(request,reply)=>{
    const {token}=z.object({token:z.string().regex(/^[a-f0-9]{64}$/)}).parse(request.body);
    const row=await prisma.siteContent.findUnique({where:{key:"cms.news.preview."+createHash("sha256").update(token).digest("hex")},include:{author:{select:{status:true}}}});
    const value=row?.value as {expires:number;post:unknown}|undefined;
    reply.header("Cache-Control","private, no-store");
    if(!value||value.expires<Date.now()||row?.author?.status!=="ACTIVE")return fail(reply,404,"Bản xem trước đã hết hạn.","PREVIEW_EXPIRED");
    return ok(reply,{post:value.post});
  });
  app.get("/api/admin/news-workspace",async(request,reply)=>{
    if(!await allow(request,reply,"news.view"))return;
    const q=z.object({search:z.string().trim().max(190).default(""),page:z.coerce.number().int().min(1).max(100000).default(1),status:z.enum(["ALL","DRAFT","PUBLISHED","ARCHIVED"]).default("ALL")}).parse(request.query);
    const where:Prisma.NewsPostWhereInput={...(q.status!=="ALL"?{status:q.status}:{}),...(q.search?{OR:[{title:{contains:q.search,mode:"insensitive"}},{slug:{contains:q.search,mode:"insensitive"}}]}:{})};
    const [posts,total]=await prisma.$transaction([prisma.newsPost.findMany({where,orderBy:[{updatedAt:"desc"},{id:"asc"}],skip:(q.page-1)*25,take:25,select:{id:true,title:true,slug:true,status:true,locale:true,updatedAt:true,publishedAt:true}}),prisma.newsPost.count({where})],{isolationLevel:"RepeatableRead"});
    const drafts=await prisma.siteContent.findMany({where:{key:{in:posts.map(post=>keyFor(post.id))}},select:{key:true,value:true}});
    return ok(reply,{posts:posts.map(post=>{const parsed=envelopeSchema.safeParse(drafts.find(row=>row.key===keyFor(post.id))?.value);return {...post,draftTitle:parsed.success?parsed.data.values.title:null,reviewStatus:parsed.success?parsed.data.status:null};}),total});
  });
  app.get("/api/admin/news-workspace/:id",async(request,reply)=>{
    if(!await allow(request,reply,"news.view"))return;const {id}=identity.parse(request.params);
    const [post,draft]=await Promise.all([prisma.newsPost.findUnique({where:{id}}),prisma.siteContent.findUnique({where:{key:keyFor(id)}})]);
    if(!post)return fail(reply,404,"Không tìm thấy bài viết.","NOT_FOUND");
    const parsed=draft?envelopeSchema.parse(draft.value):null;
    reply.header("Cache-Control","private, no-store");
    return ok(reply,{id,values:parsed?.values??draftInput.parse(post),revision:draft?.updatedAt.toISOString()??null,liveRevision:post.updatedAt.toISOString(),status:parsed?.status??"DRAFT",publication:post.status,comment:parsed?.comment??"",liveConflict:!!parsed&&parsed.baseRevision!==post.updatedAt.toISOString()});
  });
  app.post("/api/admin/news-workspace",async(request,reply)=>{
    const user=await allow(request,reply,"news.create");if(!user)return;const values=draftInput.parse(request.body);
    try{const result=await prisma.$transaction(async tx=>{
      const post=await tx.newsPost.create({data:{...values,customJsonLd:values.customJsonLd?values.customJsonLd as Prisma.InputJsonValue:Prisma.JsonNull,status:"DRAFT",authorId:user.id}});
      const draft=await tx.siteContent.create({data:{key:keyFor(post.id),page:`/news/${post.slug}`,locale:post.locale,section:"cms-news-draft",title:post.title,published:false,authorId:user.id,value:{values,baseRevision:post.updatedAt.toISOString(),status:"DRAFT",comment:""} as Prisma.InputJsonValue}});
      await tx.auditLog.create({data:{action:"NEWS_CREATED",actorAdminId:user.id,targetType:"news",targetId:post.id,metadata:{operation:"CMS_NEWS_DRAFT_CREATE"}}});
      return {id:post.id,revision:draft.updatedAt.toISOString()};
    });return ok(reply,result,"Đã tạo bản nháp tin tức.");}catch(error){return handle(error,reply);}
  });
  app.put("/api/admin/news-workspace/:id",async(request,reply)=>{
    const user=await allow(request,reply,"news.update");if(!user)return;const {id}=identity.parse(request.params);
    const body=z.object({revision:z.string().nullable(),liveRevision:z.string(),values:draftInput}).strict().parse(request.body);
    try{const saved=await prisma.$transaction(async tx=>{
      const post=await tx.newsPost.findUnique({where:{id}});if(!post)throw Error("NOT_FOUND");
      const current=await tx.siteContent.findUnique({where:{key:keyFor(id)}});
      if((current?.updatedAt.toISOString()??null)!==body.revision||post.updatedAt.toISOString()!==body.liveRevision)throw Error("CONFLICT");
      if((post.status==="PUBLISHED"||post.publishedAt)&&(body.values.slug!==post.slug||body.values.locale!==post.locale))throw Error("SLUG_LOCKED");
      const value={values:body.values,baseRevision:post.updatedAt.toISOString(),status:"DRAFT",comment:""};
      const data={page:`/news/${post.slug}`,locale:post.locale,section:"cms-news-draft",title:body.values.title,published:false,authorId:user.id,value:value as Prisma.InputJsonValue};
      const draft=await tx.siteContent.upsert({where:{key:keyFor(id)},create:{key:keyFor(id),...data},update:data});
      await tx.auditLog.create({data:{action:"NEWS_UPDATED",actorAdminId:user.id,targetType:"news",targetId:id,metadata:{operation:"CMS_NEWS_DRAFT_SAVE"}}});return {revision:draft.updatedAt.toISOString()};
    },{isolationLevel:"Serializable"});return ok(reply,saved,"Đã lưu nháp, giữ nguyên bài đang công khai.");}catch(error){return handle(error,reply);}
  });
  app.post("/api/admin/news-workspace/:id/workflow",async(request,reply)=>{
    const body=z.object({revision:z.string(),action:z.enum(["submit","approve","request-changes","publish"]),comment:z.string().trim().max(2000).default("")}).strict().parse(request.body);
    const user=await allow(request,reply,body.action==="submit"?"news.update":"news.publish");if(!user)return;
    const {id}=identity.parse(request.params);if(body.action==="request-changes"&&!body.comment)return fail(reply,400,"Nhập yêu cầu chỉnh sửa.","COMMENT_REQUIRED");
    try{await prisma.$transaction(async tx=>{
      const post=await tx.newsPost.findUnique({where:{id}});if(!post)throw Error("NOT_FOUND");
      const draft=await tx.siteContent.findUnique({where:{key:keyFor(id)}});if(!draft||draft.updatedAt.toISOString()!==body.revision)throw Error("CONFLICT");
      const envelope=envelopeSchema.parse(draft.value);if(envelope.baseRevision!==post.updatedAt.toISOString())throw Error("CONFLICT");
      if(body.action==="publish"){
        await publishNews(tx,id,body.revision,user.id);
      }else{
        if(body.action==="submit"?!["DRAFT","CHANGES_REQUESTED"].includes(envelope.status):envelope.status!=="IN_REVIEW")throw Error("REVIEW");
        await tx.siteContent.update({where:{key:draft.key},data:{value:{...envelope,status:body.action==="submit"?"IN_REVIEW":body.action==="approve"?"APPROVED":"CHANGES_REQUESTED",comment:body.comment} as Prisma.InputJsonValue}});
      }
      await tx.auditLog.create({data:{action:"NEWS_UPDATED",actorAdminId:user.id,targetType:"news",targetId:id,metadata:{operation:`CMS_NEWS_${body.action.toUpperCase()}`,revision:body.revision,comment:body.comment}}});
    },{isolationLevel:"Serializable"});return ok(reply,{},"Đã cập nhật trạng thái tin tức.");}catch(error){return handle(error,reply);}
  });
  app.get("/api/admin/news-workspace/:id/versions", async(request,reply)=>{
    if(!await allow(request,reply,"news.view"))return;
    const {id}=identity.parse(request.params);
    const {page}=z.object({page:z.coerce.number().int().min(1).max(100000).default(1)}).parse(request.query);
    const where:Prisma.SiteContentWhereInput={section:"cms-news-version",value:{path:["id"],equals:id}};
    const [versions,total]=await prisma.$transaction([prisma.siteContent.findMany({where,orderBy:[{createdAt:"desc"},{id:"asc"}],skip:(page-1)*10,take:10,select:{id:true,title:true,createdAt:true,author:{select:{fullName:true}}}}),prisma.siteContent.count({where})]);
    return ok(reply,{versions,total});
  });
  app.post("/api/admin/news-workspace/:id/restore",async(request,reply)=>{
    const user=await allow(request,reply,"news.update");if(!user)return;const {id}=identity.parse(request.params);
    const body=z.object({versionId:z.string(),revision:z.string().nullable(),liveRevision:z.string()}).strict().parse(request.body);
    try{await prisma.$transaction(async tx=>{
      const post=await tx.newsPost.findUnique({where:{id}});if(!post)throw Error("NOT_FOUND");
      const draft=await tx.siteContent.findUnique({where:{key:keyFor(id)}});
      if((draft?.updatedAt.toISOString()??null)!==body.revision||post.updatedAt.toISOString()!==body.liveRevision)throw Error("CONFLICT");
      const snapshot=await tx.siteContent.findFirst({where:{id:body.versionId,section:"cms-news-version",value:{path:["id"],equals:id}}});if(!snapshot)throw Error("NOT_FOUND");
      const stored=snapshot.value as {next:unknown};const values=draftInput.parse(stored.next);
      if(post.publishedAt){values.slug=post.slug;values.locale=z.enum(["vi","en"]).parse(post.locale);}
      const data={page:`/news/${post.slug}`,locale:post.locale,section:"cms-news-draft",title:values.title,published:false,authorId:user.id,value:{values,baseRevision:post.updatedAt.toISOString(),status:"DRAFT",comment:"Khôi phục từ lịch sử; cần gửi duyệt lại."} as Prisma.InputJsonValue};
      await tx.siteContent.upsert({where:{key:keyFor(id)},create:{key:keyFor(id),...data},update:data});
      await tx.auditLog.create({data:{action:"NEWS_UPDATED",actorAdminId:user.id,targetType:"news",targetId:id,metadata:{operation:"CMS_NEWS_RESTORE",versionId:body.versionId}}});
    },{isolationLevel:"Serializable"});return ok(reply,{},"Đã khôi phục vào bản nháp.");}catch(error){return handle(error,reply);}
  });
  app.post("/api/admin/news-workspace/:id/visibility",async(request,reply)=>{
    const body=z.object({liveRevision:z.string(),action:z.enum(["withdraw","trash","restore"])}).strict().parse(request.body);
    const user=await allow(request,reply,body.action==="trash"?"news.delete":body.action==="restore"?"news.restore":"news.publish");if(!user)return;const {id}=identity.parse(request.params);
    try{await prisma.$transaction(async tx=>{
      const post=await tx.newsPost.findUnique({where:{id}});if(!post)throw Error("NOT_FOUND");if(post.updatedAt.toISOString()!==body.liveRevision)throw Error("CONFLICT");
      if((body.action==="restore"&&post.status!=="ARCHIVED")||(body.action==="withdraw"&&post.status!=="PUBLISHED"))throw Error("CONFLICT");
      await tx.siteContent.create({data:{key:`cms.news.version.${randomUUID()}`,page:`/news/${post.slug}`,locale:post.locale,section:"cms-news-version",title:post.title,published:false,authorId:user.id,value:JSON.parse(JSON.stringify({id,next:post,event:body.action}))}});
      const updated=await tx.newsPost.update({where:{id},data:{status:body.action==="trash"?"ARCHIVED":"DRAFT"}});
      const draft=await tx.siteContent.findUnique({where:{key:keyFor(id)}});if(draft){const envelope=envelopeSchema.parse(draft.value);await tx.siteContent.update({where:{key:draft.key},data:{value:{...envelope,baseRevision:updated.updatedAt.toISOString(),status:"DRAFT",comment:"Trạng thái công khai đã thay đổi; cần duyệt lại trước khi đăng."} as Prisma.InputJsonValue}});}
      await tx.auditLog.create({data:{action:"NEWS_UPDATED",actorAdminId:user.id,targetType:"news",targetId:id,metadata:{operation:`CMS_NEWS_${body.action.toUpperCase()}`}}});
    },{isolationLevel:"Serializable"});return ok(reply,{},"Đã cập nhật trạng thái công khai; dữ liệu và phiên bản vẫn được giữ lại.");}catch(error){return handle(error,reply);}
  });
}

export async function publishNews(tx:Prisma.TransactionClient,id:string,revision:string,authorId:string){
  const post=await tx.newsPost.findUnique({where:{id}});if(!post)throw Error("NOT_FOUND");
  const draft=await tx.siteContent.findUnique({where:{key:keyFor(id)}});if(!draft||draft.updatedAt.toISOString()!==revision)throw Error("CONFLICT");
  const envelope=envelopeSchema.parse(draft.value);if(envelope.baseRevision!==post.updatedAt.toISOString())throw Error("CONFLICT");
        if(envelope.status!=="APPROVED"||post.status==="ARCHIVED")throw Error("REVIEW");
        const values=newsInput.parse({...envelope.values,status:"PUBLISHED"});
        if(post.status==="PUBLISHED"&&await tx.siteContent.count({where:{section:"cms-news-version",value:{path:["id"],equals:id}}})===0){
          await tx.siteContent.create({data:{key:`cms.news.version.${randomUUID()}`,page:`/news/${post.slug}`,locale:post.locale,section:"cms-news-version",title:post.title,published:false,authorId:authorId,value:JSON.parse(JSON.stringify({id,next:post,event:"baseline"}))}});
        }
        await tx.siteContent.create({data:{key:`cms.news.version.${randomUUID()}`,page:`/news/${post.slug}`,locale:post.locale,section:"cms-news-version",title:post.title,published:false,authorId:authorId,value:JSON.parse(JSON.stringify({id,previous:post,next:values,revision:revision}))}});
        const updated=await tx.newsPost.update({where:{id},data:{...values,customJsonLd:values.customJsonLd?values.customJsonLd as Prisma.InputJsonValue:Prisma.JsonNull,publishedAt:post.publishedAt??new Date()}});
        await tx.siteContent.update({where:{key:draft.key},data:{value:{...envelope,baseRevision:updated.updatedAt.toISOString(),status:"DRAFT",comment:"Đã xuất bản phiên bản này."} as Prisma.InputJsonValue}});
  await tx.siteContent.updateMany({where:{key:"cms.news.schedule."+id,value:{path:["status"],equals:"PENDING"}},data:{value:{status:"CANCELLED",revision,dueAt:new Date().toISOString(),id}}});
}
