import React, { createContext, useContext } from 'react';
import { Button, Modal, Space } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

const myContext = createContext('默认内容');

type MyModalProps = OpenableProps<void> & {
  title: string;
};

const MyModal = ({ visible, onClose, afterClose, title }: MyModalProps) => {
  const context = useContext(myContext);
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
    >
      {context}
    </Modal>
  );
};

const openMyModalDefault = openify<void, MyModalProps, MyModalProps>(MyModal);

const openMyModalWithRenderHook = openify<void, MyModalProps, MyModalProps>(
  MyModal,
  {
    renderHook: node => {
      return (
        <myContext.Provider value="context提供内容">{node}</myContext.Provider>
      );
    },
  },
);

export default () => (
  <myContext.Provider value="context提供内容">
    <Space>
      <Button onClick={() => openMyModalDefault({ title: '弹窗' })}>
        打开弹窗
      </Button>
      <Button onClick={() => openMyModalWithRenderHook({ title: '弹窗' })}>
        打开弹窗
      </Button>
    </Space>
  </myContext.Provider>
);
