import React, { createRef, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Space } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

type MyModalProps = OpenableProps<void> & {
  title: string;
};

type MyModalRef = {
  close: () => void;
};

const MyModal = openify(
  forwardRef<MyModalRef, MyModalProps>(
    ({ visible, onClose, afterClose, title }: MyModalProps, ref) => {
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
          title={title}
          visible={visible}
          afterClose={afterClose}
          closable={false}
        >
          静态打开
        </Modal>
      );
    },
  ),
);

export default () => (
  <Space>
    <Button
      onClick={() => {
        const ref = createRef<MyModalRef>();
        MyModal.open({ title: '标题', ref });
        setTimeout(() => {
          ref.current?.close();
        }, 1000);
      }}
    >
      打开弹窗
    </Button>
  </Space>
);