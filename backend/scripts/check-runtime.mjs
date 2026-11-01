import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Run with the service's EnvironmentFile before starting its HTTP listener.
// This check neither modifies data nor opens a connection to the database.
const mode = process.argv[2] ?? "backend";
try {
  if (!["backend", "cms"].includes(mode)) throw new Error("Expected backend or cms.");
  if (!process.env.CMS_APP_URL) throw new Error("Missing CMS_APP_URL in this service's environment.");
  const origin = new URL(process.env.CMS_APP_URL);
  if (!['http:', 'https:'].includes(origin.protocol) || origin.username || origin.password || origin.search || origin.hash)
    throw new Error("CMS_APP_URL must be an HTTP(S) URL without credentials, query or fragment.");
  if (process.env.NODE_ENV === "production" && origin.protocol !== "https:")
    throw new Error("Production CMS_APP_URL must use HTTPS.");
  if (mode === "backend") {
    if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL in backend environment.");
    const { buildApp } = await import("../dist/app.js");
    const app = await buildApp();
    try {
      const response = await app.inject({ method: "GET", url: "/health" });
      if (response.statusCode !== 200) throw new Error("Backend health check failed.");
    } finally {
      await app.close();
    }
    if (!process.env.STORAGE_ACCESS_KEY || !process.env.STORAGE_SECRET_KEY)
      console.warn("Object storage is not configured: CMS image/resource uploads will return 503.");
  } else {
    if (!process.env.BACKEND_INTERNAL_URL) throw new Error("Missing BACKEND_INTERNAL_URL in CMS environment.");
    const backend = new URL(process.env.BACKEND_INTERNAL_URL);
    if (!['http:', 'https:'].includes(backend.protocol)) throw new Error("Invalid BACKEND_INTERNAL_URL protocol.");
    const releaseCms = new URL("../../cms/", import.meta.url);
    await access(fileURLToPath(new URL("server.js", releaseCms)));
    await access(fileURLToPath(new URL(".next/BUILD_ID", releaseCms)));
  }
  console.log(`Runtime check passed (${mode}); database connectivity was not checked.`);
} catch (error) {
  // Do not print environment values or nested errors that may contain secrets.
  console.error(`Runtime check failed (${mode}): ${error.code ?? error.name}. Check environment, dependencies, generated Prisma Client and build files.`);
  if (error.message?.startsWith("Missing ") || error.message?.startsWith("Production CMS_APP_URL") || error.message?.startsWith("CMS_APP_URL must"))
    console.error(error.message);
  process.exitCode = 1;
}
