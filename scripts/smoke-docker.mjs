// Ephemeral containers only; never runs compose down or touches application volumes.
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import assert from "node:assert/strict";
const image = process.argv[2] || "vgg:cleanup-test";
const names = [];
const suffix = randomBytes(4).toString("hex");
const docker = (...args) => execFileSync("docker", args, { encoding: "utf8" }).trim();
try {
  for (const [service, port, command] of [["frontend",3000,"start"],["cms",3001,"start:cms"]]) {
    const name = `vgg-smoke-${service}-${suffix}`;
    docker("run", "--rm", "-d", "--read-only", "--cap-drop=ALL", "--security-opt=no-new-privileges", "--tmpfs", "/tmp", "--tmpfs", `/app/${service}/.next/cache:uid=1000,gid=1000`, "--name", name, "-p", `127.0.0.1::${port}`, "-e", "PUBLIC_APP_URL=https://staging.example.test", "-e", "SITE_INDEXABLE=false", "-e", "HOSTNAME=localhost", "-e", "NODE_OPTIONS=--dns-result-order=ipv4first", image, "npm", "run", command);
    names.push(name);
    const mapping = docker("port", name, `${port}/tcp`).split(":").at(-1);
    const url = `http://localhost:${mapping}`;
    let response;
    for (let i=0;i<60;i++) {
      try { response = await fetch(url + (service === "frontend" ? "/vi" : "/"), { redirect: "manual" }); if (response.status === 200) break; } catch {}
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (response?.status !== 200) console.error(docker("logs", name));
    assert.equal(response?.status, 200, `${service} must render without a redirect loop`);
    if (service === "frontend") {
      assert.equal((await fetch(url+"/api/admin/me")).status,404);
      assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
      assert.match(await response.text(), /https:\/\/staging\.example\.test/);
      assert.match(await (await fetch(url+"/robots.txt")).text(), /Disallow: \//);
      const pdf = await fetch(url + "/api/resources/file?url=" + encodeURIComponent("/documents/demo/thong-bao-tuyen-sinh-thac-si-2027.pdf") + "&name=test.pdf");
      assert.equal(pdf.status, 200); assert.match(pdf.headers.get("content-type"), /application\/pdf/);
      const bytes = new Uint8Array(await pdf.arrayBuffer()); assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), "%PDF-");
      assert.equal((await fetch(url+"/fonts/vlu/IBMPlexSans-Variable.woff2", {redirect:"manual"})).status, 200);
    }
    console.log(`PASS ${service}: production container renders; runtime does not need dev dependencies.`);
  }
} finally { for (const name of names) { try { docker("rm", "-f", name); } catch {} } }
