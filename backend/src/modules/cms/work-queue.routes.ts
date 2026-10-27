import { Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { fail,ok } from "../../shared/http/response.js";
export async function workQueueRoutes(app:FastifyInstance){
  app.get("/api/admin/work-queue",async(request,reply)=>{
    const user=await authenticateRequest(request);if(!user)return fail(reply,401,"Bạn chưa đăng nhập.","UNAUTHENTICATED");
    if(user.mustChangePassword)return fail(reply,403,"Cần đổi mật khẩu trước khi tiếp tục.","FORBIDDEN");
    const can=(code:string)=>user.role.code==="SUPER_ADMIN"||user.permissions.includes(code);
    const entries:Promise<{label:string;count:number;href:string}>[]=[];
    const count=(label:string,href:string,query:Promise<number>)=>entries.push(query.then(count=>({label,count,href})));
    if(can("website.view")){
      count("Trang đang chờ duyệt","/admin/content",prisma.siteContent.count({where:{section:"cms-workflow",value:{path:["status"],equals:"IN_REVIEW"}}}));
      count("Lịch xuất bản trang cần xử lý","/admin/content",prisma.siteContent.count({where:{section:"cms-schedule",value:{path:["status"],equals:"FAILED"}}}));
    }
    if(can("news.view")){
      count("Tin tức đang chờ duyệt","/admin/news-workspace",prisma.siteContent.count({where:{section:"cms-news-draft",value:{path:["status"],equals:"IN_REVIEW"}}}));
      count("Tin tức cần sửa","/admin/news-workspace",prisma.siteContent.count({where:{section:"cms-news-draft",value:{path:["status"],equals:"CHANGES_REQUESTED"}}}));
      count("Lịch đăng tin cần xử lý","/admin/news-workspace",prisma.siteContent.count({where:{section:"cms-news-schedule",value:{path:["status"],equals:"FAILED"}}}));
    }
    if(can("consultations.view")){
      count("Tư vấn chưa phân công","/admin/consultation-workspace",prisma.consultation.count({where:{assignedAdminId:null,status:{notIn:["CANCELLED","COMPLETED"]}}}));
      count("Đến hạn liên hệ tư vấn","/admin/consultation-workspace?due=1",prisma.siteContent.findMany({where:{section:"cms-consultation-followup",value:{path:["nextContactAt"],lte:new Date().toISOString(),not:Prisma.JsonNull}},select:{page:true}}).then(rows=>prisma.consultation.count({where:{id:{in:rows.map(row=>row.page)},status:{notIn:["CANCELLED","COMPLETED"]}}})));
    }
    reply.header("Cache-Control","private, no-store");return ok(reply,{items:await Promise.all(entries)});
  });
}
