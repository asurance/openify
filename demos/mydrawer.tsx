import React from 'react';
import { Modal } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type MyAsyncModalProps = OpenableProps<void> & {
  title: string;
};

const MyAsyncModal = ({
  visible,
  onClose,
  afterClose,
  title,
}: MyAsyncModalProps) => {
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
};

export const openMyAsyncModal = openify<
  void,
  MyAsyncModalProps,
  MyAsyncModalProps
>(MyAsyncModal);

export default MyAsyncModal;
