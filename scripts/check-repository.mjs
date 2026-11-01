import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const root = process.cwd();
const problems = [];
const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }).split("\0").filter(Boolean);
for (const file of tracked) {
  if (/^(outputs|work|\.tmp)\//.test(file)) problems.push(`Generated file tracked by Git: ${file}`);
  if (/\.(pem|key|p12|pfx)$/i.test(file) || (/(^|\/)\.env(?:\.|$)/.test(file) && !file.endsWith(".example"))) problems.push(`Secret/config file tracked by Git: ${file}`);
}
function checkPublic(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) { problems.push(`Link inside public: ${file}`); continue; }
    if (entry.isDirectory()) { checkPublic(file); continue; }
    if (/^\.env|\.(sql|bak|log|pem|key|p12|pfx|zip|tar|gz)$/i.test(entry.name)) problems.push(`Private/archive file in public: ${file}`);
    const fd = fs.openSync(file, "r");
    const head = Buffer.alloc(120);
    fs.readSync(fd, head, 0, head.length, 0); fs.closeSync(fd);
    if (head.toString().startsWith("version https://git-lfs.github.com/spec/v1")) problems.push(`Unresolved Git LFS media: ${file}`);
  }
}
checkPublic(path.join(root, "frontend/public"));
checkPublic(path.join(root, "cms/public"));
if (problems.length) { console.error(problems.join("\n")); process.exitCode = 1; }
else console.log("Repository checks passed: no tracked scratch/secrets, no private files or unresolved LFS pointers in public.");
