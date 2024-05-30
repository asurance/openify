import React from 'react';
import { Button, Drawer, Modal, Space } from '@arco-design/web-react';
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
        弹窗内容
      </Modal>
    );
  },
);

type MyDrawerProps = OpenableProps<void> & {
  title: string;
};

const MyDrawer = openify(
  ({ visible, onClose, afterClose, title }: MyDrawerProps) => {
    return (
      <Drawer
        title={title}
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
        afterClose={afterClose}
      >
        抽屉内容
      </Drawer>
    );
  },
);
export default () => (
  <Space>
    <Button onClick={() => MyModal.open({ title: '自定义弹窗' })}>
      自定义弹窗
    </Button>
    <Button onClick={() => MyDrawer.open({ title: '自定义抽屉' })}>
      自定义抽屉
    </Button>
  </Space>
);
