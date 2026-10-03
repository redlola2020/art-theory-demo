# 艺术概论 · Introduction to Art

一门《艺术概论》课程的**交互式网页讲义**。以全屏演示文稿（幻灯片）的形式，围绕"艺术是什么"与"艺术有什么用"两条主线，带领学生通过案例投票、小组讨论和理论工具，一步步探讨**艺术的边界与功能**。

> 作者：王静（Yvonne） · 技术栈：React 19 + TypeScript + Vite + Tailwind CSS

## 功能特性

- **全屏翻页演示**：鼠标滚轮、方向键或点击均可翻页，`Esc` 返回主页。
- **十个案例实时投票**：蒙娜丽莎、杜尚《泉》、AI 生成作品、游戏画面、潮玩、涂鸦等，配合动态柱状图（`recharts`）。
- **理论工具箱**：模仿论 / 表现论 / 形式论 / 体制论，以及柏拉图、亚里士多德、墨子、荀子、孔子的对比。
- **课堂互动**：翻转式小组讨论卡片、"8 分钟讨论"计时引导。
- **视觉效果**：粒子文字（Canvas）、漂浮粒子、花瓣形章节入口、渐变与模糊玻璃质感。
- **响应式**：桌面与移动端均可使用。

## 页面结构

| 视图 | 说明 | 页数 |
| --- | --- | --- |
| 主页 | 花瓣式章节入口（第 1–10 章） | — |
| 第一章 | 艺术是什么 → 艺术边界测试 → 理论工具 → 设计是不是艺术 | 33 页 |
| 第二章 | 艺术有没有用 → 艺术的功能（认识 / 教育 / 娱乐 / 体验） → AI / 游戏 / 设计问题 | 30 页 |

> 目前第 1、2 章内容完整；第 3–10 章为"敬请期待"占位，点击后自动返回主页。

## 技术栈

| 分类 | 选型 |
| --- | --- |
| 框架 | React 19 + TypeScript 5.8 |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 4（`@tailwindcss/vite`） |
| 动画 | `motion`（Framer Motion）、`gsap`、原生 Canvas |
| 图表 | `recharts` |
| 图标 | `lucide-react` |

## 快速开始

**环境要求：** Node.js >= 20.19（推荐使用 npm）。

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:3000）
npm run dev

# 3. 生产构建，产物输出到 dist/
npm run build

# 4. 本地预览构建产物
npm run preview
```

## 可用脚本

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器（端口 3000） |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建产物（端口 4173） |
| `npm run typecheck` | TypeScript 类型检查（`tsc --noEmit`） |
| `npm run lint` | ESLint 检查 |
| `npm run lint:fix` | ESLint 自动修复 |
| `npm run format` | Prettier 格式化 |
| `npm run clean` | 清理 `dist/` |

## 目录结构

```
.
├── .github/workflows/ci.yml   # CI：类型检查 + Lint + 构建
├── public/                    # 静态资源（图片、视频）
├── src/
│   ├── App.tsx                # 根组件与视图/章节路由
│   ├── main.tsx               # 应用入口
│   ├── index.css              # 全局样式（Tailwind）
│   ├── data/questions.ts      # 投票案例数据
│   └── components/
│       ├── HomePage.tsx           # 主页与花瓣章节入口
│       ├── Chapter1.tsx           # 第一章容器（33 页）
│       ├── Chapter1Part3.tsx      # 第一章第三部分
│       ├── Chapter1Part4.tsx      # 第一章第四部分
│       ├── Chapter2.tsx           # 第二章容器（30 页）
│       ├── Chapter2PagesPart1-3.tsx # 第二章分页内容
│       ├── Chapter2Hooks.tsx      # 分步导航 Hook
│       ├── VotingSlide.tsx        # 案例投票与实时图表
│       ├── TaskCardBoard.tsx      # 小组讨论翻转卡片
│       ├── ParticleText.tsx       # Canvas 粒子文字
│       └── FloatingParticles.tsx  # 背景漂浮粒子
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 部署

构建产物为纯静态文件（`dist/`），可部署到任意静态托管（Vercel、Netlify、Cloudflare Pages、GitHub Pages 等）。

> **注意**：项目中的图片/视频使用以 `/` 开头的根路径引用（例如 `/bg1.png`）。部署到**子路径**（如 `https://<user>.github.io/<repo>/`）时需要相应配置 Vite 的 `base`，或将资源引用改为基于 `import.meta.env.BASE_URL` 的相对路径。

## 资源与版权

- `public/` 中部分图片来自维基共享资源、Unsplash 等第三方来源，仅用于课堂教学演示；如需公开发布或商用，请自行确认并替换为拥有授权的素材。
- 代码部分以 MIT 许可证开源（见 `LICENSE`）；第三方素材不包含在该许可范围内。

## 已知事项 / 后续计划

- 投票数据为前端模拟（随机数），尚未接入真实后端或 Mentimeter。
- 第 3–10 章内容待补充。
- 依赖中的 `@google/genai`、`express`、`dotenv` 为 AI Studio 模板遗留，当前源码未使用，可在后续清理。
