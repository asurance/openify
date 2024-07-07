import React, { useState } from 'react';
import { Button, Modal } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type MyModalProps = OpenableProps<void>;

const MyModal = ({ visible, onClose, afterClose }: MyModalProps) => {
  const [showError, setShowError] = useState(false);
  if (showError) {
    throw new Error('error');
  }
  return (
    <Modal
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
    >
      <Button
        onClick={() => {
          setShowError(true);
        }}
      >
        error
      </Button>
    </Modal>
  );
};

const openModal = openify(MyModal);

export default () => (
  <Button onClick={() => openModal({ title: '自定义弹窗' })}>自定义弹窗</Button>
);
