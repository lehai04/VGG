import "dotenv/config";
import { buildApp } from "./app.js";
import { env } from "./config/environment.js";

const app = await buildApp();
await app.listen({ host: env.BACKEND_HOST, port: env.BACKEND_PORT });

