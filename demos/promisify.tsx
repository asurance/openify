import React, { useState } from 'react';
import { Button, Input, Modal, Space, Toast } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type Value =
  | {
      isOk: true;
      id: string;
    }
  | { isOk: false };

type MyModalProps = OpenableProps<Value> & {
  id: string;
};

const MyModal = ({ visible, onClose, afterClose, id }: MyModalProps) => {
  const [nextId, setNextId] = useState(id || '');
  return (
    <Modal
      title={id ? '编辑任务' : '新建任务'}
      visible={visible}
      onOk={() => {
        onClose({ isOk: true, id: nextId });
      }}
      onCancel={() => {
        onClose({ isOk: false });
      }}
      afterClose={afterClose}
    >
      <Input value={nextId} onChange={setNextId} placeholder="请输入任务ID" />
    </Modal>
  );
};

const openMyModal = openify(MyModal);

export default () => {
  const [taskId, setTaskId] = useState('');
  return (
    <Space>
      <Input placeholder="请输入任务ID" value={taskId} onChange={setTaskId} />
      <Button
        onClick={async () => {
          const res = await openMyModal({ id: taskId });
          if (res.isOk) {
            Toast.success('任务ID填写成功');
            setTaskId(res.id);
          } else {
            Toast.warning('任务ID取消填写');
          }
        }}
      >
        {taskId ? '编辑任务' : '新建任务'}
      </Button>
    </Space>
  );
};
