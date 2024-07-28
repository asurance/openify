import React, { createContext, useContext } from 'react';
import { Button, Modal, Space } from '@douyinfe/semi-ui';
import { OpenableProps, openify } from 'openify';

const myContext = createContext('默认内容');

type MyModalProps = OpenableProps<void>;

const MyModal = ({ visible, onClose, afterClose }: MyModalProps) => {
  const context = useContext(myContext);
  return (
    <Modal
      title="弹窗"
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
          openMyModal({});
        }}
      >
        默认获取不到context
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
          openMyModal({});
        }}
      >
        共享context
      </Button>
    </Space>
  </myContext.Provider>
);
