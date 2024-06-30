import React from 'react';
import { Drawer } from '@arco-design/web-react';
import { OpenableProps, openify } from 'openify';

import '@arco-design/web-react/dist/css/arco.css';

type MyDrawerProps = OpenableProps<void> & {
  title: string;
};

const MyDrawer = ({ visible, onClose, afterClose, title }: MyDrawerProps) => {
  return (
    <Drawer
      title={title}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      afterClose={afterClose}
    >
      抽屉内容
    </Drawer>
  );
};

export const openMyDrawer = openify<void, MyDrawerProps, MyDrawerProps>(
  MyDrawer,
);

export default MyDrawer;
