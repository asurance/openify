import React from 'react';
import { Button, Modal, Space } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

type MyModalProps = OpenableProps<void> & {
  title: string;
};

const MyModal = ({ visible, onClose, afterClose, title }: MyModalProps) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
    >
      静态打开
    </Modal>
  );
};

const openMyModal = openify<void, MyModalProps, MyModalProps>(MyModal);

export default () => (
  <Space>
    <Button onClick={() => openMyModal({ title: '标题' })}>打开弹窗</Button>
    <Button
      onClick={async () => {
        const { openMyDrawer } = await import('./mydrawer');
        openMyDrawer({ title: '标题' });
      }}
    >
      动态加载
    </Button>
  </Space>
);
