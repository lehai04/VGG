import test from "node:test";
import assert from "node:assert/strict";
process.env.DATABASE_URL ||= "postgresql://unused:unused@127.0.0.1:1/unused";
const {cleanNewsHtml}=await import("../dist/modules/cms/schemas.js");
test("CMS formatting survives publication while executable content is removed",()=>{
 for(const tag of ["h1","h2","h3","h4","h5","h6","p"]){
 for(const align of ["left","center","right","justify"]){
 const html=cleanNewsHtml(`<${tag} style="text-align:${align};font-size:24px;color:#123456;line-height:1.6"><strong><em>Nội dung mẫu</em></strong></${tag}>`);
 assert.ok(html.startsWith(`<${tag}`));assert.ok(html.includes(`text-align:${align}`));assert.match(html,/font-size:24px/);assert.match(html,/color:#123456/);assert.match(html,/<strong><em>/);
 }}
 const clean=cleanNewsHtml('<h2 onclick="alert(1)" style="text-align:center">Tiêu đề</h2><script>alert(1)</script>');assert.doesNotMatch(clean,/onclick|<script/);assert.match(clean,/text-align:center/);
});
