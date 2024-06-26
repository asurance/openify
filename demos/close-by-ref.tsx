import React, {
  RefAttributes,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Button, Modal, Space } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

type MyModalProps = OpenableProps<void> & {
  title: string;
};

type MyModalRef = {
  close: () => void;
};

const MyModal = forwardRef<MyModalRef, MyModalProps>(
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
);

const openMyModal = openify<
  void,
  MyModalProps & RefAttributes<MyModalRef>,
  MyModalProps
>(MyModal);

export default () => (
  <Space>
    <Button
      onClick={() => {
        const ref = createRef<MyModalRef>();
        openMyModal({ title: '标题', ref });
        setTimeout(() => {
          ref.current?.close();
        }, 1000);
      }}
    >
      打开弹窗
    </Button>
  </Space>
);
