# Openify

> 简化 React 弹窗类组件调用的工具

[![npm](https://img.shields.io/npm/v/openify)](https://www.npmjs.com/package/openify)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

`Openify` 通过 `openify` 与 `Slot` 两个 API，把任意「可打开」的 React 组件变成可以在任意位置通过方法调用的弹窗，并把打开结果通过 `Promise` 返回，避免层层回调。

## 特性

- **全局可用**：任意代码位置都能唤起弹窗，无需关心组件挂载位置。
- **Promise 化**：`open` 返回带 `cancel` 的 Promise，可直接 `await` 弹窗关闭结果。
- **渲染隔离**：弹窗与宿主的更新互不触发，避免无意义渲染。
- **非侵入集成**：现有弹窗组件零改造，写一层胶水组件即可接入。
- **框架无感知**：仅依赖 React（`>=17`），不绑定任何组件库。
- **异常隔离**：弹窗内部报错不会影响宿主应用，错误会 `reject` 给调用方。

## 安装

```bash
npm install openify
# or
yarn add openify
# or
pnpm add openify
```

`react` 与 `react-dom` 需要由宿主项目提供：

```bash
pnpm add react react-dom
```

## 快速上手

### 1. 把弹窗转换成可打开的组件

`openify` 接收一个渲染函数，函数会收到 `OpenParams` 中的 `open`、`onClose`、`onUnmount`，以及与弹窗相关的其余参数。

```tsx
import type { OpenParams } from "openify";
import { openify } from "openify";
import { Modal, type ModalProps } from "antd";

type OpenableModalProps = OpenParams<void> &
    Omit<ModalProps, "open" | "onOk" | "onCancel" | "afterClose">;

const openableModal = openify<OpenableModalProps>(
    ({ open, onClose, onUnmount, ...restProps }) => (
        <Modal
            open={open}
            onOk={onClose}
            onCancel={onClose}
            afterClose={onUnmount}
            {...restProps}
        />
    ),
);
```

### 2. 准备一个插槽

`Slot` 决定弹窗渲染在哪棵子树里，它会被挂载到谁的位置，弹窗就能拿到谁的 `Context`。

```tsx
import { Slot } from "openify";
import type { PropsWithChildren } from "react";

const App = ({ children }: PropsWithChildren) => (
    <>
        {children}
        <Slot id="root" />
    </>
);
```

### 3. 在任意位置打开弹窗

```tsx
import { Button } from "antd";

<Button
    onClick={() =>
        Slot.getById("root").open(openableModal, {
            title: "欢迎使用 Openify",
            okText: "确定",
            cancelText: "取消",
        })
    }
>
    打开弹窗
</Button>;
```

## 核心概念

### OpenParams

所有可被 `openify` 的组件参数都必须包含以下三项：

| 字段        | 类型                | 说明                                        |
| ----------- | ------------------- | ------------------------------------------- |
| `open`      | `boolean`           | 控制弹窗是否打开                            |
| `onClose`   | `(...args) => void` | 关闭弹窗，参数会作为 `open` 的 Promise 结果 |
| `onUnmount` | `() => void`        | 弹窗卸载完成时调用，用于从 Slot 中移除      |

`onClose` 的参数类型决定 `open` 返回值的类型；不传参数时结果为 `undefined`。

> `onUnmount` 建议绑定到弹窗的 `afterClose`（或卸载完成事件）。缺少它弹窗实例无法释放，会造成内存泄漏。

### Slot 与 SlotOperation

- `<Slot id={id} />`：插槽组件，`id` 可以是任意类型，会作为内部 `Map` 的 key。
- `Slot.getById(id)`：获取插槽的操作对象；插槽未渲染时会得到 `undefined`。
- `SlotOperation.open(Comp, props?)`：在插槽中打开弹窗，返回 `CancelablePromise`。

`CancelablePromise` 在 Promise 的基础上增加了 `cancel(result?)`，用于从外部关闭弹窗，返回结果与 `onClose` 一致。

## 更多用法

### 获取弹窗返回值

```tsx
const result = await Slot.getById("root").open(openableConfirmDialog, {
    content: "确认删除？",
});

if (result) {
    // 用户点击了确认
}
```

### 从外部关闭弹窗

```tsx
const promise = Slot.getById("root").open(openableTaskProgress);
setTimeout(() => promise.cancel("超时关闭"), 5000);

const reason = await promise;
```

### 错误捕获

弹窗内部抛出异常时，错误会被错误边界捕获，不会影响宿主应用，同时 `reject` 给调用方：

```tsx
try {
    await Slot.getById("root").open(openableForm);
} catch (error) {
    // error 额外带有 info: ErrorInfo
    console.error("弹窗异常退出", error);
}
```

### 获取 Context

把 `Slot` 放进对应的 `Provider` 内，弹窗即可读到该位置的 Context：

```tsx
<ConfigProvider locale={zhCN}>
    <Slot id="root" />
</ConfigProvider>
```

### 渲染隔离

`Slot` 内部组件与外部的更新互不影响；但 `Context`、`Store` 等全局状态变化依然会触发更新。

## API

### `openify<Params>(fn)`

将弹窗组件转换为可直接打开的组件。

- `fn: (props: Params) => ReactNode`：弹窗渲染函数
- 返回：可被 `SlotOperation.open` 打开的组件

相关类型：`OpenParams`、`ExtraParams`、`OpenResult`、`OpenError`、`OpenableCompProps`。

### `<Slot id={id} />`

- `id: SlotId`：插槽标识，任意类型

静态方法：

- `Slot.getById(id): SlotOperation`：根据 `id` 获取插槽操作对象

### `SlotOperation.open(Comp, props?)`

- `Comp`：由 `openify` 生成的组件
- `props`：除 `open`、`onClose`、`onUnmount` 外的其余参数；当无额外参数时可省略
- 返回：`CancelablePromise<Result>`

## 本地开发

需要 Node.js 20+ 与 pnpm 9。

```bash
pnpm install

pnpm dev          # 启动 Vite 开发服务
pnpm build        # 类型声明 + 库构建，产物在 dist/
pnpm lint         # Biome 检查并修复
pnpm docs:dev     # 启动 VitePress 文档
pnpm docs:build   # 构建文档
```

### 目录结构

```
openify/
├── src/
│   ├── index.ts        # 包入口
│   ├── openify.tsx     # openify：错误边界 + 打开状态管理
│   └── Slot.tsx        # Slot：渲染位置、实例管理与 Promise 封装
├── docs/               # VitePress 文档站（含 demos）
├── .github/workflows/  # 文档部署与 npm 发布
├── vite.config.ts      # 库模式构建配置
├── tsconfig.*.json     # 项目引用：app / node / doc / back
└── biome.json          # 代码规范
```

### 技术栈

React 17+ · TypeScript 5.6 · Vite 6 · Biome · VitePress · pnpm

## 相关链接

- [在线文档](https://asurance.github.io/openify/)
- [GitHub 仓库](https://github.com/asurance/openify)
- [更新日志](./CHANGELOG.md)
- [MIT License](./LICENSE)
