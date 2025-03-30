# 快速开始

## 安装

::: code-group

```sh [npm]
$ npm add openify
```

```sh [yarn]
$ yarn add openify
```

```sh [pnpm]
$ pnpm add openify
```

:::

## `openify`对应弹窗

<<< @/demos/index.tsx#openify

## 准备一个插槽

<<< @/demos/index.tsx#slot

## 这样就可以在任意位置使用你的弹窗了

<<< @/demos/index.tsx#app

## 效果示意

<div ref="app" />

::: info 提示
你可以通过`onClose`的第一个参数来弹窗关闭时附带的信息传递给`open`的调用处
:::

::: warning 注意
不要忘了实现`onUnmount`函数,虽然表现上不会有明显的差异,但是弹窗组件会一直无法释放,造成内存泄漏
:::

<script setup>
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { onMounted, useTemplateRef } from "vue";
import Demo from "../demos";
const app = useTemplateRef("app");
onMounted(() => {
    const root = createRoot(app.value);
    root.render(createElement(Demo, {}));
});
</script>