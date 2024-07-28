import React, { createRef, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Space, Toast } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type MyModalProps = OpenableProps<void>;

type MyModalRef = {
  close: () => void;
};

const MyModal = forwardRef<MyModalRef, MyModalProps>(
  ({ visible, onClose, afterClose }: MyModalProps, ref) => {
    useImperativeHandle(
      ref,
      () => ({
        close() {
          onClose();
        },
      }),
      [],
    );
    return (
      <Modal
        title="弹窗"
        visible={visible}
        afterClose={afterClose}
        onOk={onClose}
        onCancel={onClose}
      >
        弹窗内容
      </Modal>
    );
  },
);

const openMyModal = openify(MyModal);

export default () => {
  return (
    <Space>
      <Button
        onClick={() => {
          const ref = createRef<MyModalRef>();
          openMyModal({ ref });
          Toast.info({
            content: '即将自动关闭弹窗',
            onClose: () => {
              ref.current?.close();
            },
          });
        }}
      >
        打开弹窗
      </Button>
    </Space>
  );
};
