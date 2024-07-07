import React from 'react';
import {
  Button,
  Drawer,
  DrawerProps,
  Modal,
  ModalProps,
  Space,
} from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

type OpenModalProps = OpenableProps<void> &
  Omit<ModalProps, 'visible' | 'onOk' | 'onCancel' | 'afterClose'>;

const openModal = openify(Modal, {
  transformProps({
    visible,
    onClose,
    afterClose,
    ...restProps
  }: OpenModalProps) {
    return {
      ...restProps,
      visible,
      onOk: onClose,
      onCancel: onClose,
      afterClose,
    };
  },
});

type OpenDrawerProps = OpenableProps<void> &
  Omit<DrawerProps, 'visible' | 'onOk' | 'onCancel' | 'afterClose'>;

const openDrawer = openify(Drawer, {
  transformProps({
    visible,
    onClose,
    afterClose,
    ...restProps
  }: OpenDrawerProps) {
    return {
      ...restProps,
      visible,
      onOk: onClose,
      onCancel: onClose,
      afterClose,
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
