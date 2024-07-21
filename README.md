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

### 开发组件，注意实现`visible`, `onClose`, `afterClose`这三个 props

```tsx
type MyModalProps = OpenableProps<xxx> & {
  /** your props **/
};

const MyModal = ({ visible, onClose, afterClose, ...props }: MyModalProps) => {
  // your code here
  return (
    <Modal
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
      // your other props
    >
      {/** your content here **/}
    </Modal>
  );
};
```

### 使用`openify`生成对应的`open`函数

```tsx
const openMyModal = openify(MyModal);
```

### 使用`open`方法

```tsx
function MyApp() {
  return <Button onClick={() => openMyModal()}>打开弹窗</Button>;
}
```

## [在线文档](https://asurance.github.io/openify/)
