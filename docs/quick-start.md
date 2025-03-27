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

```tsx
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

## 准备一个插槽

```tsx
const App = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
            <Slot id="root" />
        </>
    );
};
```

## 这样就可以在任意位置使用你的弹窗了

```tsx
<Button
    onClick={() =>
        Slot.getById("root").open(openableModal, {
            title: "欢迎使用Openify",
            okText: "确定",
            cancelText: "取消",
        })
    }
>
    打开弹窗
</Button>
```
## 效果示意

<div ref="app" />

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import { App, Open } from './demos'

const app = ref()
onMounted(() => {
  const root = createRoot(app.value)
  root.render(createElement(App, {}, createElement(Open)))
})
</script>