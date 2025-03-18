import { Drawer, Form, Input } from "antd";
import { openify, type OpenParams } from "openify";

export type NormalDrawerProps = {
    open: boolean;
    id: string;
    onOk?: (nextId: string) => void;
    onCancel?: () => void;
    afterClose?: () => void;
};

const NormalDrawer = ({
    open,
    id,
    onOk,
    onCancel,
    afterClose,
}: NormalDrawerProps) => {
    const [form] = Form.useForm<{ id: string }>();
    console.log("render normal drawer");
    return (
        <Drawer
            open={open}
            title="样板2弹窗"
            onClick={async () => {
                const { id } = await form.validateFields();
                onOk?.(id);
            }}
            onClose={onCancel}
            afterOpenChange={(open) => {
                if (!open) {
                    afterClose?.();
                }
            }}
        >
            <Form form={form} initialValues={{ id }}>
                <Form.Item name="id" label="id">
                    <Input placeholder="请输入最新ID" />
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export const openableNormalDrawer = openify<
    OpenParams<string | null> & {
        id: string;
    }
>(({ visible, onClose, afterClose, id }) => (
    <NormalDrawer
        open={visible}
        id={id}
        onOk={() => onClose("ok")}
        onCancel={() => onClose("cancel")}
        afterClose={afterClose}
    />
));

export default NormalDrawer;
