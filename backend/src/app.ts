import { workQueueRoutes } from "./modules/cms/work-queue.routes.js";
import { newsSchedules } from "./modules/cms/news-schedules.js";
import Fastify, { type FastifyError } from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { env } from "./config/environment.js";
import { prisma } from "./shared/database/prisma.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { consultationRoutes } from "./modules/consultations/consultations.routes.js";
import { consultationWorkspaceRoutes } from "./modules/consultations/workspace.routes.js";
import { cmsRoutes } from "./modules/cms/cms.routes.js";
import { websiteRoutes } from "./modules/cms/website.routes.js";
import { newsWorkspaceRoutes } from "./modules/cms/news-workspace.routes.js";
import { ZodError } from 'zod';

/** Lắp ráp backend: cấu hình HTTP → plugin → endpoint sức khỏe → module nghiệp vụ.
 * Hàm chỉ tạo app; server.ts chịu trách nhiệm listen trên host/port đã cấu hình. */
export async function buildApp() {
  // bodyLimit giới hạn body ở 1.000.000 byte; maxParamLength giới hạn tham số route.
  // trustProxy=true dùng thông tin proxy, cần đối chiếu cấu hình reverse proxy khi triển khai.
  const app = Fastify({
    logger: true,
    trustProxy: true,
    bodyLimit: 1_000_000,
    routerOptions: { maxParamLength: 300 },
  });
  // Đăng ký plugin trước route để các handler dùng được cookie và cấu hình bảo vệ.
  await app.register(helmet);
  await app.register(cookie);
  await app.register(cors, { origin: [env.PUBLIC_APP_URL, env.ADMIN_APP_URL], credentials: true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] });
  // global:false không giới hạn mọi route; route cần giới hạn phải cấu hình riêng.
  await app.register(rateLimit, { global: false });

  // /health chỉ xác nhận tiến trình trả lời; /ready mới thử truy vấn PostgreSQL.
  app.get("/health", async () => ({ success: true, data: { status: "ok" }, message: "" }));
  app.get("/ready", async (_request, reply) => {
    try { await prisma.$queryRaw`SELECT 1`; return { success: true, data: { database: "ready" }, message: "" }; }
    catch { return reply.code(503).send({ success: false, message: "Database chưa sẵn sàng.", code: "DATABASE_UNAVAILABLE" }); }
  });

  // Ghi lỗi chi tiết phía server, nhưng lỗi 5xx chỉ trả thông báo chung cho client.
  app.setErrorHandler((error: FastifyError, request, reply) => { if (error instanceof ZodError) return reply.code(400).send({ success: false, message: 'Dữ liệu gửi lên không hợp lệ.', code: 'VALIDATION_ERROR' }); request.log.error(error); const status = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500; reply.code(status).send({ success: false, message: status < 500 ? error.message : "Hệ thống đang bận.", code: "INTERNAL_ERROR" }); });
  await app.register(authRoutes);
  await app.register(consultationRoutes);
  await app.register(consultationWorkspaceRoutes);
  await app.register(cmsRoutes);
  await app.register(websiteRoutes);
  await app.register(newsWorkspaceRoutes);
  await app.register(newsSchedules);
  await app.register(workQueueRoutes);
  // Khi app đóng có kiểm soát, giải phóng client database dùng chung.
  app.addHook("onClose", () => prisma.$disconnect());
  return app;
}
