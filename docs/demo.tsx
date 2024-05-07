import { Button, Modal } from '@arco-design/web-react';
import { openify } from 'src/openify';
import '@arco-design/web-react/dist/css/arco.css';

const MyModal = (props: any) => {
  return <Modal title="Demo" {...props} />;
};

const { open } = openify(MyModal, {});

const Demo = () => {
  return (
    <Button
      onClick={async () => {
        open({});
      }}
    >
      Demo
    </Button>
  );
};

export default Demo;
