import React, { ReactNode } from 'react';
import { Button, Modal, Space } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type MyModalProps = OpenableProps<void> & {
  content: ReactNode;
};

const MyModal = ({ visible, onClose, afterClose, content }: MyModalProps) => {
  return (
    <Modal
      title="弹窗标题"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
    >
      {content}
    </Modal>
  );
};

const openMyModal = openify(MyModal);

function doSomethingWithModal() {
  // do something
  openMyModal({ content: '静态弹窗内容' });
}

export default () => (
  <Space>
    <Button onClick={() => doSomethingWithModal()}>打开弹窗</Button>
    <Button
      onClick={async () => {
        const { openMyAsyncModal } = await import('demos/MyAsyncModal');
        openMyAsyncModal({ content: '动态加载弹窗内容' });
      }}
    >
      动态加载弹窗
    </Button>
  </Space>
);
