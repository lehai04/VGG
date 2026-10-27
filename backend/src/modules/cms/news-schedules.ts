import type { FastifyInstance } from "fastify";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { fail,ok } from "../../shared/http/response.js";
import { publishNews } from "./news-workspace.routes.js";
const keyFor=(id:string)=>"cms.news.schedule."+id;
const schedule=z.object({id:z.string(),revision:z.string(),dueAt:z.string().datetime(),status:z.enum(["PENDING","PUBLISHED","CANCELLED","FAILED"])});
export async function runNewsSchedules(){
  const rows=await prisma.siteContent.findMany({where:{section:"cms-news-schedule",AND:[{value:{path:["status"],equals:"PENDING"}},{value:{path:["dueAt"],lte:new Date().toISOString()}}]},take:50,orderBy:{updatedAt:"asc"}});
  for(const row of rows){
    const parsed=schedule.safeParse(row.value);if(!parsed.success)continue;const data=parsed.data;
    try{await prisma.$transaction(async tx=>{
      const current=await tx.siteContent.findUnique({where:{key:row.key}});if(!current||current.updatedAt.getTime()!==row.updatedAt.getTime()||(current.value as {status:string}).status!=="PENDING")return;
      const actor=row.authorId?await tx.admin.findUnique({where:{id:row.authorId},include:{role:{include:{permissions:{include:{permission:true}}}}}}):null;
      if(!actor||actor.status!=="ACTIVE"||actor.mustChangePassword||(actor.role.code!=="SUPER_ADMIN"&&!actor.role.permissions.some(item=>item.permission.code==="news.publish")))throw Error("FORBIDDEN");
      await publishNews(tx,data.id,data.revision,actor.id);
      await tx.siteContent.update({where:{key:row.key},data:{value:{...data,status:"PUBLISHED"}}});
      await tx.auditLog.create({data:{action:"NEWS_UPDATED",actorAdminId:actor.id,targetType:"news",targetId:data.id,metadata:{operation:"CMS_NEWS_SCHEDULE_PUBLISHED",revision:data.revision}}});
    },{isolationLevel:"Serializable"});}catch(error){
      if(error instanceof z.ZodError||(error instanceof Error&&["CONFLICT","REVIEW","NOT_FOUND","FORBIDDEN"].includes(error.message))){await prisma.siteContent.updateMany({where:{key:row.key,updatedAt:row.updatedAt},data:{value:{...data,status:"FAILED",error:"Nội dung, phê duyệt hoặc quyền đã thay đổi. Kiểm tra, duyệt lại và đặt lịch mới."}}});}
      else if(!(error instanceof Prisma.PrismaClientKnownRequestError&&error.code==="P2034"))throw error;
    }
  }
}
export async function newsSchedules(app:FastifyInstance){
  app.get("/api/admin/news-workspace/:id/schedule",async(request,reply)=>{
    const user=await authenticateRequest(request);if(!user)return fail(reply,401,"Bạn chưa đăng nhập.","UNAUTHENTICATED");
    if(user.mustChangePassword||(user.role.code!=="SUPER_ADMIN"&&!user.permissions.includes("news.view")))return fail(reply,403,"Không có quyền xem lịch.","FORBIDDEN");
    const {id}=z.object({id:z.string()}).parse(request.params);const row=await prisma.siteContent.findUnique({where:{key:keyFor(id)}});
    reply.header("Cache-Control","private, no-store");return ok(reply,{schedule:row?.value??null,revision:row?.updatedAt.toISOString()??null});
  });
  app.put("/api/admin/news-workspace/:id/schedule",async(request,reply)=>{
    const user=await authenticateRequest(request);if(!user)return fail(reply,401,"Bạn chưa đăng nhập.","UNAUTHENTICATED");
    if(user.mustChangePassword||(user.role.code!=="SUPER_ADMIN"&&!user.permissions.includes("news.publish")))return fail(reply,403,"Không có quyền đặt lịch.","FORBIDDEN");
    const {id}=z.object({id:z.string()}).parse(request.params);
    const body=z.object({revision:z.string(),scheduleRevision:z.string().nullable(),dueAt:z.string().datetime().nullable()}).parse(request.body);
    if(body.dueAt&&(Date.parse(body.dueAt)<Date.now()+60000||Date.parse(body.dueAt)>Date.now()+366*86400000))return fail(reply,400,"Chọn thời gian từ 1 phút đến 1 năm trong tương lai.","INVALID_SCHEDULE");
    try{await prisma.$transaction(async tx=>{
      const current=await tx.siteContent.findUnique({where:{key:keyFor(id)}});if((current?.updatedAt.toISOString()??null)!==body.scheduleRevision)throw Error("CONFLICT");
      const post=await tx.newsPost.findUnique({where:{id}});if(!post)throw Error("CONFLICT");
      if(body.dueAt){const draft=await tx.siteContent.findUnique({where:{key:"cms.news.draft."+id}});const value=draft?.value as {status:string;baseRevision:string;values:unknown}|undefined;if(!draft||draft.updatedAt.toISOString()!==body.revision||value?.status!=="APPROVED"||value.baseRevision!==post.updatedAt.toISOString()||post.status==="ARCHIVED")throw Error("REVIEW");}
      else if(!current||(current.value as {status:string}).status!=="PENDING")throw Error("CONFLICT");
      const data={page:"/news/"+post.slug,locale:post.locale,section:"cms-news-schedule",published:false,authorId:user.id,value:{id,revision:body.revision,dueAt:body.dueAt??new Date().toISOString(),status:body.dueAt?"PENDING":"CANCELLED"}};
      await tx.siteContent.upsert({where:{key:keyFor(id)},create:{key:keyFor(id),...data},update:data});
      await tx.auditLog.create({data:{action:"NEWS_UPDATED",actorAdminId:user.id,targetType:"news",targetId:id,metadata:{operation:body.dueAt?"CMS_NEWS_SCHEDULE":"CMS_NEWS_SCHEDULE_CANCEL",dueAt:body.dueAt}}});
    },{isolationLevel:"Serializable"});return ok(reply,{},"Đã cập nhật lịch.");}catch(error){
      if(error instanceof Error&&error.message==="REVIEW")return fail(reply,422,"Cần duyệt đúng phiên bản trước khi đặt lịch.","REVIEW");
      if((error instanceof Error&&error.message==="CONFLICT")||(error instanceof Prisma.PrismaClientKnownRequestError&&["P2034","P2002"].includes(error.code)))return fail(reply,409,"Dữ liệu đã thay đổi. Tải lại trước khi đặt lịch.","CONFLICT");throw error;
    }
  });
  let pending:Promise<void>|undefined;let timer:ReturnType<typeof setInterval>|undefined;
  const tick=()=>{if(!pending)pending=runNewsSchedules().catch(error=>app.log.error(error,"News scheduler failed")).finally(()=>{pending=undefined;});};
  app.addHook("onReady",async()=>{timer=setInterval(tick,30000);timer.unref();tick();});
  app.addHook("onClose",async()=>{clearInterval(timer);await pending;});
}
