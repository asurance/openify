import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Space, Toast } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type MyModalProps = OpenableProps<void> & {
  id: string;
};

const MyModal = ({ visible, onClose, afterClose, id }: MyModalProps) => {
  const [requestedMsg, setRequestMessage] = useState('');
  useEffect(
    () => {
      // 无需判断仅visible为true
      // 模拟异步请求
      Toast.info(`请求ID: ${id}`);
      setTimeout(() => {
        setRequestMessage(`当前ID: ${id}`);
      }, 100);
    },
    // 一次性请求无需声明id为依赖项
    [],
  );
  return (
    <Modal
      title="弹窗标题"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
    >
      {requestedMsg}
    </Modal>
  );
};

const openMyModal = openify(MyModal);

export default () => {
  const [taskId, setTaskId] = useState('');
  return (
    <Space>
      <Input placeholder="请输入任务ID" value={taskId} onChange={setTaskId} />
      <Button onClick={() => openMyModal({ id: taskId })}>openify打开</Button>
    </Space>
  );
};
