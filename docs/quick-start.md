# 快速开始

## 安装

::: code-group

```sh [npm]
$ npm add -D openify
```

```sh [yarn]
$ yarn add -D openify
```

```sh [pnpm]
$ pnpm add -D openify
```

:::

## openify对应弹窗

```tsx
type OpenableModalProps = OpenParams<void> &
    Omit<ModalProps, "visible" | "onOk" | "onCancel" | "afterClose">;

const openableModal = openify<OpenableModalProps>(
    ({ visible, onClose, afterClose, ...restProps }) => (
        <Modal
            open={visible}
            onOk={onClose}
            onCancel={onClose}
            afterClose={afterClose}
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