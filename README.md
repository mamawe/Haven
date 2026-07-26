# 锚点 (Haven)

> 育儿这条路，你不需要完美。

**锚点** 是一款帮助父母缓解育儿焦虑的随身应用。它把「觉察 — 记录 — 看见变化 — 被温柔提醒」串成一条轻量的日常闭环，用克制、安静的 Apple 风格设计，陪你把飘忽的情绪重新锚定在当下。

仓库英文名 `Haven`：焦虑来袭时，这里是一处可以停靠的避风港。

---

## ✨ 核心功能

| 模块 | 说明 |
| --- | --- |
| **焦虑自测量表** | 轻量自评量表，记录每次得分，不贴标签、只帮你看见状态。 |
| **心情日记** | 每天一句话 + 情绪滑块，低成本记录，长期可回看。 |
| **趋势图表** | 基于你的记录生成折线/趋势图，让变化「看得见」而非靠感觉。 |
| **知识库** | 育儿与情绪相关的科普短文，按需取用。 |
| **今日一句** | 每天一条确定性推送的温柔提醒，可设定时通知，温和不侵扰。 |
| **伴侣双视角** | 「我 / 伴侣」一键切换，各自独立记录与图表，命名可编辑。 |
| **分享卡片** | 一键生成带背景图的精美卡片（12 款背景可选），把状态与今日一句分享出去。 |
| **PWA 离线可用** | 可安装到主屏、离线打开、接收本地通知，像原生 App 一样。 |

---

## 🎨 设计理念

- **Apple 风格贯穿全站**：单一强调色 Action Blue `#0066cc`、中性留白画布、发丝级边框、`18px` 圆角卡片、胶囊按钮、`active:scale-95` 微交互。
- **不制造焦虑**：没有红绿警示、没有排名、没有连续打卡压力；图形与文案都偏向安抚。
- **隐私优先**：所有数据仅存于本地 `localStorage`，不上传任何服务器。

---

## 🧱 技术栈

- **React 19** + **TypeScript**
- **Vite 6**（构建工具）
- **Tailwind CSS 4**（`@theme` 设计令牌 + `data-theme` 多主题）
- **Recharts 2**（趋势图表）
- **Canvas 2D API**（零依赖分享卡片导出）
- **PWA**：`manifest.webmanifest` + Service Worker + Notification API
- **零后端**：纯静态 SPA，localStorage 持久化

---

## 📂 目录结构

```
parent-calm/
├── public/
│   ├── cards/          # 12 张分享卡片背景图（jpg + webp 双格式）
│   ├── splash.jpg/.webp# 启动开屏图
│   ├── manifest.webmanifest
│   └── sw.js           # Service Worker
├── src/
│   ├── components/     # 页面级组件（卡片、弹窗、切换器等）
│   ├── context/        # ProfileContext 伴侣双视角
│   ├── data/           # 静态数据（量表题目、提醒文案等）
│   ├── pages/          # 6 个 Tab 页：首页/量表/知识/日记/趋势/急救
│   ├── utils/          # storage / reminder / whisper 等工具
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css       # 全局主题令牌与基础样式
└── ...
```

---

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 类型检查 + 生产构建（输出到 dist/）
npm run build

# 本地预览构建产物
npm run preview
```

> 要求 Node 18+。

---

## 🌐 部署

纯静态产物，可托管到任意静态平台：

- **Vercel**：导入本仓库，构建命令 `npm run build`，输出目录 `dist`。
- **其他静态托管**（Netlify / GitHub Pages / CloudBase 等）：构建后上传 `dist/` 即可。
- PWA 需通过 **HTTPS** 访问才能注册 Service Worker 与接收通知。

---

## 🔒 隐私

- 所有量表记录、日记、设置均保存在**你自己的浏览器**中。
- 无账号系统、无后端、无数据上报。
- 清除浏览器数据即可彻底删除全部内容。

---

## 📄 许可证

MIT —— 免费使用、修改与分发。
