# Openify

> 简化 React 弹窗类组件调用的工具

## 快速上手

### 安装依赖

```bash
npm install openify
# or
yarn add openify
# or
pnpm add openify
```

### `openify`对应弹窗

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

### 准备一个插槽

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

### 这样就可以在任意位置使用你的弹窗了

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

## [在线文档](https://asurance.github.io/openify/)
