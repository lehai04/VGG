import Fastify, { type FastifyError } from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { env } from "./config/environment.js";
import { prisma } from "./shared/database/prisma.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { consultationRoutes } from "./modules/consultations/consultations.routes.js";
import { cmsRoutes } from "./modules/cms/cms.routes.js";

export async function buildApp() {
  const app = Fastify({ logger: true, trustProxy: true, bodyLimit: 1_000_000, maxParamLength: 300 });
  await app.register(helmet);
  await app.register(cookie);
  await app.register(cors, { origin: [env.PUBLIC_APP_URL, env.ADMIN_APP_URL], credentials: true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] });
  await app.register(rateLimit, { global: false });

  app.get("/health", async () => ({ success: true, data: { status: "ok" }, message: "" }));
  app.get("/ready", async (_request, reply) => {
    try { await prisma.$queryRaw`SELECT 1`; return { success: true, data: { database: "ready" }, message: "" }; }
    catch { return reply.code(503).send({ success: false, message: "Database chưa sẵn sàng.", code: "DATABASE_UNAVAILABLE" }); }
  });

  await app.register(authRoutes);
  await app.register(consultationRoutes);
  await app.register(cmsRoutes);
  app.setErrorHandler((error: FastifyError, request, reply) => { request.log.error(error); const status = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500; reply.code(status).send({ success: false, message: status < 500 ? error.message : "Hệ thống đang bận.", code: "INTERNAL_ERROR" }); });
  app.addHook("onClose", () => prisma.$disconnect());
  return app;
}
