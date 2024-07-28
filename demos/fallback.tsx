import React, { useState } from 'react';
import { Button, Modal, Space } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type MyModalProps = OpenableProps<void>;

const MyModal = ({ visible, onClose, afterClose }: MyModalProps) => {
  return (
    <Modal
      title="弹窗标题"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
    >
      弹窗内容
    </Modal>
  );
};

const openMyModal = openify(MyModal);

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <Space>
      <Button onClick={() => openMyModal({})}>openify打开</Button>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        react式打开
      </Button>
      <MyModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        afterClose={() => {
          // do nothing;
        }}
      />
    </Space>
  );
};
