import { Form, Input, Modal } from "antd";

export type NormalModalProps = {
  open: boolean;
  id: string;
  onOk?: (nextId: string) => void;
  onCancel?: () => void;
  afterClose?: () => void;
};

const NormalModal = ({
  open,
  id,
  onOk,
  onCancel,
  afterClose,
}: NormalModalProps) => {
  const [form] = Form.useForm<{ id: string }>();
  return (
    <Modal
      open={open}
      title="样板2弹窗"
      onOk={async () => {
        const { id } = await form.validateFields();
        onOk?.(id);
      }}
      onCancel={onCancel}
      afterClose={afterClose}
    >
      <Form form={form} initialValues={{ id }}>
        <Form.Item name="id" label="id">
          <Input placeholder="请输入最新ID" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NormalModal;
