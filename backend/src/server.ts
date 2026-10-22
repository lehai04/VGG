import "dotenv/config";
import { buildApp } from "./app.js";
import { env } from "./config/environment.js";

// Entry point mở cổng mạng. Tách buildApp khỏi listen để các bài test
// có thể khởi tạo Fastify và inject request mà không chiếm một cổng thật.
const app = await buildApp();
await app.listen({ host: env.BACKEND_HOST, port: env.BACKEND_PORT });

