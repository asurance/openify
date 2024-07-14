import React, { createContext, useContext } from 'react';
import { Button, Modal, Space } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

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

const openMyModal = openify(MyModal);

export default () => (
  <myContext.Provider value="context提供内容">
    <Space>
      <Button
        onClick={() => {
          openify.defaultRenderHook = undefined;
          openMyModal({ title: '弹窗' });
        }}
      >
        打开弹窗
      </Button>
      <Button
        onClick={() => {
          openify.defaultRenderHook = node => {
            return (
              <myContext.Provider value="context提供内容">
                {node}
              </myContext.Provider>
            );
          };
          openMyModal({ title: '弹窗' });
        }}
      >
        打开弹窗
      </Button>
    </Space>
  </myContext.Provider>
);
