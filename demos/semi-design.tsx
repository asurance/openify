import React from 'react';
import { Button, Modal, SideSheet, Space } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

type MyModalProps = OpenableProps<void> & {
  title: string;
};

const MyModal = openify(
  ({ visible, onClose, afterClose, title }: MyModalProps) => {
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
        afterClose={afterClose}
      >
        弹窗内容
      </Modal>
    );
  },
);

type MySideSheetProps = OpenableProps<void> & {
  title: string;
};

const MySideSheet = openify(
  ({ visible, onClose, afterClose, title }: MySideSheetProps) => {
    return (
      <SideSheet
        title={title}
        visible={visible}
        onCancel={onClose}
        afterVisibleChange={isVisible => {
          if (!isVisible) {
            afterClose();
          }
        }}
      >
        滑动侧边栏内容
      </SideSheet>
    );
  },
);
export default () => (
  <Space>
    <Button onClick={() => MyModal.open({ title: '自定义弹窗' })}>
      自定义弹窗
    </Button>
    <Button onClick={() => MySideSheet.open({ title: '自定义滑动侧边栏' })}>
      自定义滑动侧边栏
    </Button>
  </Space>
);
