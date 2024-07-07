import React, { ComponentType } from 'react';
import { Button, Modal, SideSheet, Space } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';
import { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal';
import { SideSheetReactProps } from '@douyinfe/semi-ui/lib/es/sideSheet';

type OpenModalProps = OpenableProps<void> &
  Omit<ModalReactProps, 'visible' | 'onOk' | 'onCancel' | 'afterClose'>;

const openModal = openify(Modal as ComponentType<ModalReactProps>, {
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

type OpenSideSheetProps = OpenableProps<void> &
  Omit<SideSheetReactProps, 'visible' | 'onCancel' | 'afterVisibleChange'>;

const openSideSheet = openify(SideSheet as ComponentType<SideSheetReactProps>, {
  transformProps({
    visible,
    onClose,
    afterClose,
    ...restProps
  }: OpenSideSheetProps) {
    return {
      ...restProps,
      visible,
      onCancel: onClose,
      afterVisibleChange: isVisible => {
        if (!isVisible) {
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
    <Button onClick={() => openSideSheet({ title: '自定义滑动侧边栏' })}>
      自定义滑动侧边栏
    </Button>
  </Space>
);
