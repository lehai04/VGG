import test from "node:test";
import assert from "node:assert/strict";
import frontend from "../next.config.ts";
import cms from "../../cms/next.config.ts";
for (const [name,config] of [["website",frontend],["cms",cms]]) {
 test(`${name}: pages cannot be framed, document endpoints permit same-origin previews`,async()=>{
 const rules=await config.headers();
 const base=Object.fromEntries(rules.find(r=>r.source==="/:path*").headers.map(h=>[h.key.toLowerCase(),h.value]));
 assert.equal(base["x-frame-options"],"DENY");
 assert.match(base["content-security-policy"],/frame-ancestors 'none'/);
 const exceptions=rules.filter(r=>r.source.startsWith("/api/"));assert.ok(exceptions.length);
 for(const rule of exceptions){const headers=Object.fromEntries(rule.headers.map(h=>[h.key.toLowerCase(),h.value]));assert.equal(headers["x-frame-options"],"SAMEORIGIN");assert.match(headers["content-security-policy"],/frame-ancestors 'self'/);}
 });
}
