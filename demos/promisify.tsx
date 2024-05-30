import React, { useRef, useState } from 'react';
import { Button, Input, Modal, Space } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

export type MyModalProps = OpenableProps<
  | {
      isOk: true;
      id: string;
    }
  | { isOk: false }
> & {
  id: string;
};

const MyModal = openify(
  ({ visible, onClose, afterClose, id }: MyModalProps) => {
    const idRef = useRef(id || Math.random().toString(36).slice(2));
    return (
      <Modal
        title={id ? '编辑任务' : '新建任务'}
        visible={visible}
        onOk={() => {
          onClose({ isOk: true, id: idRef.current });
        }}
        onCancel={() => {
          onClose({ isOk: false });
        }}
        afterClose={afterClose}
      >
        {`任务ID: ${idRef.current}`}
      </Modal>
    );
  },
);

export default () => {
  const [taskId, setTaskId] = useState('');
  return (
    <Space>
      <Input placeholder="请输入任务ID" value={taskId} onChange={setTaskId} />
      <Button
        onClick={async () => {
          const res = await MyModal.open({ id: taskId });
          if (res.isOk) {
            setTaskId(res.id);
          }
        }}
      >
        {taskId ? '编辑任务' : '新建任务'}
      </Button>
    </Space>
  );
};
