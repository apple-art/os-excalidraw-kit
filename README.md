# OS Sketch Kit

**[访问组件网站](https://apple-art.github.io/os-excalidraw-kit/)**

36 个操作系统手绘组件：任务、进程、线程、CPU、队列、调度器、锁、时钟、利用率、调频和功耗等。支持搜索分类、放大预览，以及三种复制方式：

- **Excalidraw**：复制原生图元，到 Excalidraw 画布粘贴，框、线和文字可继续编辑。
- **SVG**：浏览器支持时复制 SVG 图像及源码，否则复制 SVG 源码；也可以下载透明底文件。
- **PNG**：复制真正的 PNG 图片，或下载白底图片。

复制图片需要浏览器支持剪贴板 API，并允许当前页面写入剪贴板。GitHub Pages 使用 HTTPS；若复制被拒绝，可直接下载，不影响素材使用。

整套素材库：[os-components.excalidrawlib](assets/os-components.excalidrawlib)。每个组件也保留 `.excalidraw`、`.svg` 和 `.png` 文件。

## 本地运行

这是无框架、无运行时依赖的静态网站，发布不需要构建。

```sh
python -m http.server 8000
```

访问 `http://localhost:8000`。请使用本地 HTTP 服务，图片复制依赖浏览器安全上下文，不建议双击 HTML 后用 `file://` 测试。

## 文件组织

- `index.html`、`styles.css`、`app.js`：网页界面与交互。
- `sketch.js`：使用本地 Rough.js 给卡片和控件绘制手绘双描线。
- `assets/`：36 套组件、原生素材库、分类数据与本地手写字体。
- `source/`：组件生成代码，以及调用 Excalidraw 官方 API 的导出工具。
- `scripts/build-catalog.mjs`：从素材元数据及原生文件生成网页目录和素材库。
- `downloads/`：整套素材与组件代码压缩包。

修改网页不需要编译。修改组件时，在 `source/` 运行 `npm install`、`npm run build`、`npm start`，通过本机导出按钮重新生成组件，再在仓库根目录运行 `node scripts/build-catalog.mjs` 更新网页数据。

部署使用 GitHub Pages 的 `main` 分支根目录，`.nojekyll` 保证静态文件直接发布。

## 图形范围与第三方资源

这些是概念图标，不是硬件规格图或特定内核版本的实现图。各组件的说明见预览弹窗。

组件使用 [Excalidraw](https://github.com/excalidraw/excalidraw) 0.18.1 的原生图元与导出功能。图中的 Excalifont 及 Excalidraw 相关代码许可见 [Excalidraw MIT](licenses/Excalidraw-MIT.txt)。网站手写字体为 [小赖字体 Xiaolai](https://github.com/lxgw/kose-font) 的字符子集，重命名为 OS Sketch Hand；保留原版权声明，按 [SIL Open Font License](licenses/Xiaolai-OFL.txt) 分发。

本项目与 Excalidraw 官方无隶属关系。
