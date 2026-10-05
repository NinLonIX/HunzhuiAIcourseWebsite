# 魂坠自动化卡片演示 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付一个单文件的深色终端风 3D 卡片演示，按顺序讲清楚魂坠自动化控制台的 8 个功能模块。

**Architecture:** 使用一个自包含 HTML 文件，内联 CSS 和 JavaScript。数据数组负责驱动侧栏文案、卡片标题和卡片内部摘要；CSS 负责 Coverflow 透视、选中态展开、荧光笔和响应式布局；原生事件处理键盘、滚轮、点击和顶部索引。

**Tech Stack:** HTML5、CSS3（`transform`、`backdrop-filter`、`perspective`）、Vanilla JavaScript；不依赖外部图片或运行时服务。

**Spec:** `docs/superpowers/specs/2026-10-05-hunzhui-card-theater-design.md`

## Global Constraints

- 输出文件固定为 `outputs/魂坠自动化卡片演示.html`。
- 卡片顺序固定为主界面、自动化详情、挂机统计、完整地图、宝石合成、护符探寻、护符分解、护符打孔。
- 页面不请求项目外的本地文件，不依赖截图附件才能运行。
- 深色终端风，使用蓝灰面板与绿色/紫色/金色状态色。
- 支持 `←` / `→`、鼠标滚轮、点击卡片、顶部索引按钮。
- 桌面宽屏和窄屏均无横向溢出。

---

### Task 1: Build the self-contained card theater page

**Files:**
- Create: `outputs/魂坠自动化卡片演示.html`

**Interfaces:**
- Produces a standalone HTML document that opens from `file:///` and exposes no external application API.
- Internal data shape: `{id, index, title, subtitle, tone, summary, bullets[], highlight, mini}` for each of 8 cards.

- [ ] **Step 1: Add the document shell and content model**

Create the HTML skeleton with a title, a top index bar, a narrative sidebar, a stage container, and a footer hint. Define the eight card objects in one JavaScript array using the exact order and screenshot-grounded copy from the spec.

- [ ] **Step 2: Add the visual system and responsive layout**

Write inline CSS for the dark terminal palette, glass panels, card sizing, stage perspective, active/inactive card states, index buttons, focus rings, and a media query that turns the stage into a single-card layout below 900px.

- [ ] **Step 3: Render card summaries and mini console previews**

Implement `renderCards()` and `renderMini(card)` so each card shows a recognizable CSS-only preview: log rows for the main page, status blocks for automation detail, metric/table rows for statistics, nodes/edges for the map, inventory rows for gems, loot list for talisman search, filter/table controls for recycle, and socket comparison for drilling.

- [ ] **Step 4: Implement navigation and active-state animation**

Implement `setActive(index, announce = true)` and bind it to arrow keys, wheel events, card clicks, and index buttons. Update the sidebar title, summary, bullets, progress counter, active card class, and highlight width. Respect `prefers-reduced-motion` by shortening transitions.

- [ ] **Step 5: Commit the page implementation**

Run `git add outputs/魂坠自动化卡片演示.html` and commit with `feat: add hunzhui card theater presentation`.

### Task 2: Validate the delivered page in a browser

**Files:**
- Inspect: `outputs/魂坠自动化卡片演示.html`

**Interfaces:**
- Browser validation exercises the rendered DOM and navigation behavior without modifying the page.

- [ ] **Step 1: Run static checks**

Use PowerShell to confirm the file exists, count exactly 8 card data entries, and verify the page contains the four navigation bindings (`keydown`, `wheel`, card click, index click) plus the eight required Chinese titles.

- [ ] **Step 2: Open the file in a browser preview**

Serve the project with a local static server and open the output in the browser. Check that the first card renders, the sidebar has matching copy, and the page has no horizontal scrollbar at desktop width.

- [ ] **Step 3: Exercise interaction states**

Click the third index, press `ArrowRight`, scroll the stage, and click a neighboring card. Confirm the progress counter and sidebar content update each time, and inspect a narrow viewport to confirm the single-card layout.

- [ ] **Step 4: Commit validation notes if needed**

If validation finds an issue, fix the HTML and amend with a focused commit; otherwise keep the implementation commit as the final code change.

