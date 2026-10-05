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
assert.match(automation, /自动化卡片演示|内容整理中|页面占位/);
assert.match(automation, /index\.html/);
assert.match(automation, /automation-demo\.html/);
assert.equal(fs.existsSync(path.join(root, "automation-demo.html")), true, "automation demo should be copied into dist");
assert.equal(fs.existsSync(path.join(root, "assets", "01-主界面.png")), true, "automation demo assets should be copied into dist");

const pricing = fs.readFileSync(path.join(root, "pricing.html"), "utf8");
for (const price of ["98", "148", "298"]) assert.match(pricing, new RegExp(`¥?${price}`));
assert.match(pricing, /体验成品权限/);
assert.match(pricing, /私人远程服务/);
for (const qq of ["1557871458", "705496011"]) assert.match(pricing, new RegExp(qq));

const course = fs.readFileSync(path.join(root, "course.html"), "utf8");
assert.match(course, /公开版路线预览/);
for (const title of [
  "风险规避",
  "逐步拆解游戏流程",
  "算法练手：打孔策略",
  "感知与状态建模",
  "代码解耦与策略插件",
  "状态机与工作流编排",
  "动作执行与反馈确认",
  "规划与资源管理",
  "战斗策略与决策搜索",
  "异常恢复与幂等控制",
  "模拟器与测试方法",
  "部署、监控与维护",
]) assert.match(course, new RegExp(title));

const faq = fs.readFileSync(path.join(root, "faq.html"), "utf8");
for (const qq of ["1557871458", "705496011"]) assert.match(faq, new RegExp(qq));
for (const text of ["成品策略需求及即将制作的内容", "和音奏者策略（成品）", "百战无畏策略（跟随课程进度11月前完成制作）", "离群使者策略（跟随课程进度12月前完成制作）", "冰系法师，电系法师，小骑士都需要二次共鸣"]) assert.match(faq, new RegExp(text));

console.log("site structure checks passed");
