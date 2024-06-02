# Openify

> 方便 React 弹窗类使用的工具

## 快速上手

### 安装依赖

```bash
npm install openify
# or
yarn add openify
# or
pnpm add openify
```

### 使用`openify`开发组件

```tsx
export type MyModalProps = OpenableProps<xxx> & {
  /** your props **/
};

const MyModal = openify(
  ({ visible, onClose, afterClose, ... }: MyModalProps) => {
    // your code here
    return (
      <Modal {/** your props **/}>
        {/** your content here **/}
      </Modal>
    );
  },
);

export default MyModal;
```

### 使用 open 方法

```tsx
export default function MyApp() {
  return <Button onClick={() => MyModal.open()}>打开弹窗</Button>;
}
```

## [在线文档](https://asurance.github.io/openify/)
