import React from 'react';
import { Button, Modal } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

export type MyModalProps = OpenableProps<void> & {
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

function openMyModal(title: '标题') {
  MyModal.open({ title });
}

export default () => (
  <Button onClick={() => openMyModal('标题')}>打开弹窗</Button>
);
