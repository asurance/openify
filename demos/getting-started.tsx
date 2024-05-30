import React from 'react';
import { Button, Modal } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

export type MyModalProps = OpenableProps<void> & {
  title: string;
};

const MyModal = openify(
  ({ visible, onClose, afterClose, title }: MyModalProps) => {
    const close = () => {
      onClose();
    };
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={close}
        onCancel={close}
        afterClose={afterClose}
      >
        测试
      </Modal>
    );
  },
);

export default () => <Button onClick={() => MyModal.open()}>测试</Button>;
