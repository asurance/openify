import React from 'react';
import { OpenableProps, openify } from 'openify';
import { Button, Drawer, DrawerProps, Modal, ModalProps, Space } from 'antd';

type OpenModalProps = OpenableProps<void> &
  Omit<ModalProps, 'open' | 'onOk' | 'onCancel' | 'afterClose'>;

const openModal = openify<void, OpenModalProps, ModalProps>(Modal, {
  transformProps({ visible, onClose, afterClose, ...restProps }) {
    return {
      ...restProps,
      open: visible,
      onOk: onClose,
      onCancel: onClose,
      afterClose,
    };
  },
});

type OpenDrawerProps = OpenableProps<void> &
  Omit<DrawerProps, 'open' | 'onClose' | 'afterOpenChange'>;

const openDrawer = openify<void, OpenDrawerProps, DrawerProps>(Drawer, {
  transformProps({ visible, onClose, afterClose, ...restProps }) {
    return {
      ...restProps,
      open: visible,
      onClose,
      afterOpenChange: open => {
        if (!open) {
          afterClose();
        }
      },
    };
  },
});

export default () => (
  <Space>
    <Button onClick={() => openModal({ title: '自定义弹窗' })}>
      自定义弹窗
    </Button>
    <Button onClick={() => openDrawer({ title: '自定义抽屉' })}>
      自定义抽屉
    </Button>
  </Space>
);
