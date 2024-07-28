import React, { ReactNode } from 'react';
import { Modal } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type MyAsyncModalProps = OpenableProps<void> & {
  content: ReactNode;
};

const MyAsyncModal = ({
  visible,
  content,
  onClose,
  afterClose,
}: MyAsyncModalProps) => {
  return (
    <Modal
      title="动态加载弹窗"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
    >
      {content}
    </Modal>
  );
};

export const openMyAsyncModal = openify(MyAsyncModal);

export default MyAsyncModal;
