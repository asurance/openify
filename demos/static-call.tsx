import React from 'react';
import { Button, Modal, Space } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

type MyModalProps = OpenableProps<void> & {
  title: string;
};

const MyModal = openify(
  ({ visible, onClose, afterClose, title }: MyModalProps) => {
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
  },
);

async function openMyModal(title: string) {
  return MyModal.open({ title });
}

async function openMyDrawer(title: '标题') {
  const MyDrawer = await import('./mydrawer');
  return MyDrawer.default.open({ title });
}

export default () => (
  <Space>
    <Button onClick={() => openMyModal('标题')}>打开弹窗</Button>
    <Button onClick={() => openMyDrawer('标题')}>动态加载</Button>
  </Space>
);
