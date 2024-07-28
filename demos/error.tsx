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
      title="异常弹窗"
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
        发生异常
      </Button>
    </Modal>
  );
};

const openModal = openify(MyModal);

export default () => (
  <Button onClick={() => openModal({})}>异常弹窗组件</Button>
);
