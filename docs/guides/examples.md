# 更多例子

<div ref="app"/>

## 自定义弹窗
openify 支持任意类型可打开的组件,只要它能实现`OpenParams`中的`open`,`onClose`,`onUnmount`即可

<div ref="customModal"/>

::: details 查看代码
<<< @/demos/CustomModal.tsx
:::

## 错误捕获
弹窗异常崩溃时,不会影响主应用,并且会`reject`对应错误至`open`生成的`Promise`

<div ref="catchError"/>

::: details 查看代码
<<< @/demos/CatchError.tsx
:::


## 获取Context
将`Slot`放在合适的位置,就能拿到对应位置的`Context`

<div ref="getContext"/>

::: details 查看代码
<<< @/demos/GetContext.tsx
:::


## 外部关闭
`open`返回的是一个带`cancel`的`Promise`,可以手动调用`cancel`关闭弹窗,传入参数同`onClose`

<div ref="closeOutside"/>

::: details 查看代码
<<< @/demos/CloseOutside.tsx
:::


## 渲染隔离
`Slot`外部组件和内部组件之间的渲染是独立的,自身更新不会带来另一方的非必要渲染
::: warning  注意
`Context`或`Store`之类的更新依然会生效
:::

<div ref="renderSelf"/>

::: details 查看代码
<<< @/demos/RenderSelf.tsx
:::


<script setup>
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { onMounted, useTemplateRef } from "vue";
import CustomModalDemo from "../demos/CustomModal";
import CatchErrorDemo from "../demos/CatchError";
import GetContextDemo from "../demos/GetContext";
import CloseOutsideDemo from "../demos/CloseOutside";
import RenderSelfDemo from "../demos/RenderSelf";
import App from "../demos/App";

const app = useTemplateRef("app");
const customModal = useTemplateRef("customModal");
const catchError = useTemplateRef("catchError");
const getContext = useTemplateRef("getContext");
const closeOutside = useTemplateRef("closeOutside");
const renderSelf = useTemplateRef("renderSelf");
onMounted(() => {
    const appRoot = createRoot(app.value);
    appRoot.render(createElement(App, {}));
    const customModalRoot = createRoot(customModal.value);
    customModalRoot.render(createElement(CustomModalDemo, {}));
    const catchErrorRoot = createRoot(catchError.value);
    catchErrorRoot.render(createElement(CatchErrorDemo, {}));
    const getContextRoot = createRoot(getContext.value);
    getContextRoot.render(createElement(GetContextDemo, {}));
    const closeOutsideRoot = createRoot(closeOutside.value);
    closeOutsideRoot.render(createElement(CloseOutsideDemo, {}));
    const renderSelfRoot = createRoot(renderSelf.value);
    renderSelfRoot.render(createElement(RenderSelfDemo, {}));
});
</script>