import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const pages = ["index.html", "automation.html", "course.html", "pricing.html", "faq.html"];

for (const page of pages) {
  assert.equal(fs.existsSync(path.join(root, page)), true, `${page} should exist`);
}

const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(index, /AI自动化课程/);
assert.match(index, /automation\.html/);
assert.match(index, /pricing\.html/);

const automation = fs.readFileSync(path.join(root, "automation.html"), "utf8");
assert.match(automation, /内容整理中|页面占位/);
assert.match(automation, /index\.html/);

const pricing = fs.readFileSync(path.join(root, "pricing.html"), "utf8");
for (const price of ["98", "148", "298"]) assert.match(pricing, new RegExp(`¥?${price}`));
assert.match(pricing, /体验成品权限/);
assert.match(pricing, /私人远程服务/);

console.log("site structure checks passed");
