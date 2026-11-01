// Creates and removes ONLY an isolated test database. Never migrates DATABASE_URL itself.
import fs from "node:fs";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { Client } from "pg";
import dotenv from "dotenv";
const env = dotenv.parse(fs.readFileSync("backend/.env"));
const connectionString = process.env.DATABASE_URL || env.DATABASE_URL;
const name = `vgg_admin_test_${randomBytes(8).toString("hex")}`;
const server = new Client({ connectionString, connectionTimeoutMillis: 5000 });
await server.connect();
let created = false;
try {
  await server.query(`CREATE DATABASE "${name}"`);
  created = true;
  const url = new URL(connectionString);
  url.pathname = `/${name}`;
  const isolated = new Client({ connectionString: url.toString() });
  await isolated.connect();
  try {
    for (const folder of fs.readdirSync("backend/prisma/migrations").sort()) {
      const path = `backend/prisma/migrations/${folder}/migration.sql`;
      if (folder >= "20261028000000_public_foundation" && fs.existsSync(path))
        await isolated.query(fs.readFileSync(path, "utf8"));
    }
  } finally {
    await isolated.end();
  }
  if ((process.argv.includes("--preview") || process.argv.includes("--verify"))) {
    process.env.DATABASE_URL = url.toString();
    process.env.PUBLIC_APP_URL = "http://localhost:3400";
    process.env.CMS_APP_URL = "http://localhost:3401";
    process.env.NODE_ENV = "test";
    const { buildApp } = await import("../backend/dist/app.js");
    const { prisma } =
      await import("../backend/dist/shared/database/prisma.js");
    const { hashPassword } =
      await import("../backend/dist/modules/consultation-admin/password.js");
    const app = await buildApp();
    await prisma.consultationStaff.create({
      data: {
        email: "qa@example.test",
        fullName: "Cán bộ kiểm thử",
        passwordHash: await hashPassword("Integration-only-password-294!"),
      },
    });
    await app.listen({ host: "127.0.0.1", port: 4401 });
    const frontend = spawn(
      process.execPath,
      ["../node_modules/next/dist/bin/next", "start", "-p", "3401", "-H", "127.0.0.1"],
      {
        cwd: "cms",
        stdio: "inherit",
        env: {
          ...process.env,
          NODE_ENV: "production",
          BACKEND_INTERNAL_URL: "http://127.0.0.1:4401",
          CMS_APP_URL: "http://localhost:3401",
        },
      },
    );
    const website = spawn(process.execPath, ["../node_modules/next/dist/bin/next", "start", "-p", "3400", "-H", "127.0.0.1"], { cwd: "frontend", stdio: "inherit", env: { ...process.env, NODE_ENV: "production", BACKEND_INTERNAL_URL: "http://127.0.0.1:4401", PUBLIC_APP_URL: "http://localhost:3400" } });
    try {
      let ready = false;
      for (let i = 0; i < 60; i++) {
        try {
          if (
            (await fetch("http://localhost:3401/api/admin/me")).status === 401 && (await fetch("http://localhost:3400/api/consultations")).status === 405
          ) { ready = true; break; }
        } catch {}
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      if (!ready) throw Error("Website/CMS did not become ready; build both apps before running this check.");
      const submission = await fetch(
        "http://localhost:3400/api/consultations",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: "Người đăng ký kiểm thử",
            email: "candidate@example.test",
            phone: "0900000000",
            programme: "Kiến trúc",
            consent: true,
            message: "Muốn được tư vấn lịch học.",
            sourcePage: "/vi/admissions",
          }),
        },
      );
      if (submission.status !== 201)
        throw Error("Public proxy submission failed");
      console.log("ISOLATED_PREVIEW_READY http://localhost:3401/admin");
      if (process.argv.includes("--verify")) {
        const assert = (await import("node:assert/strict")).default;
        const cmsOrigin = "http://localhost:3401";
        const credentials = JSON.stringify({ email: "qa@example.test", password: "Integration-only-password-294!" });
        const rejected = await fetch(`${cmsOrigin}/api/admin/login`, { method: "POST", headers: { origin: "http://localhost:3400", "x-vgg-admin": "1", "content-type": "application/json" }, body: credentials });
        assert.equal(rejected.status, 403);
        const login = await fetch(`${cmsOrigin}/api/admin/login`, { method: "POST", headers: { origin: cmsOrigin, "x-vgg-admin": "1", "content-type": "application/json" }, body: credentials });
        assert.equal(login.status, 200);
        const cookie = login.headers.get("set-cookie").split(";")[0];
        const listing = await fetch(`${cmsOrigin}/api/admin/consultations`, { headers: { cookie } });
        assert.equal(listing.status, 200);
        assert.match(await listing.text(), /candidate@example.test/);
        assert.equal((await fetch("http://localhost:3400/api/admin/me")).status, 404);
        assert.equal((await fetch("http://localhost:3400/vi/admin")).status, 404);
        console.log("PASS: website submission visible in separate CMS; website has no admin routes; wrong origin rejected.");
      } else await new Promise((resolve) => {
        process.stdin.resume();
        process.stdin.once("data", resolve);
        process.once("SIGINT", resolve);
        process.once("SIGTERM", resolve);
        frontend.once("exit", resolve);
      });
    } finally {
      process.stdin.pause();
      frontend.kill();
      website.kill();
      await app.close();
    }
  } else {
    const code = await new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        ["--test", "backend/tests/consultation-admin.test.mjs", "backend/tests/cms-modules.test.mjs"],
        {
          stdio: "inherit",
          env: { ...process.env, ADMIN_TEST_DATABASE_URL: url.toString() },
        },
      );
      child.on("error", reject);
      child.on("exit", resolve);
    });
    if (code !== 0) process.exitCode = 1;
  }
} finally {
  if (created && /^vgg_admin_test_[a-f0-9]{16}$/.test(name))
    await server.query(`DROP DATABASE "${name}" WITH (FORCE)`);
  await server.end();
}
