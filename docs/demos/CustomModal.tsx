import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { type OpenParams, Slot, openify } from "openify";
import React, { useEffect, useState } from "react";
import { slotId, wait } from "./utils";

type CustomModalProps = {
    open?: boolean;
    id: string;
    onOk?: (id: string) => void;
    onCancel?: () => void;
    afterClose?: () => void;
};

const CustomModal = ({
    open,
    id,
    onOk,
    onCancel,
    afterClose,
}: CustomModalProps) => {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    // biome-ignore lint/correctness/useExhaustiveDependencies(form.setFieldValue): <explanation>
    // biome-ignore lint/correctness/useExhaustiveDependencies(id): <explanation>
    useEffect(() => {
        if (open) {
            form.setFieldValue("id", id);
        }
    }, [open]);
    return (
        <Modal
            title="自定义弹窗"
            open={open}
            confirmLoading={loading}
            onOk={async () => {
                const nextId = form.getFieldValue("id");
                setLoading(true);
                await wait(1000);
                setLoading(false);
                onOk?.(nextId);
            }}
            onCancel={onCancel}
            afterClose={afterClose}
        >
            <Form form={form}>
                <Form.Item label="ID" name="id">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

type OpenableCustomModalParams = OpenParams<string | null> &
    Omit<CustomModalProps, "open" | "onOk" | "onCancel" | "afterClose">;

const openableCustomModal = openify<OpenableCustomModalParams>(
    ({ open, onClose, onUnmount, ...rest }) => (
        <CustomModal
            {...rest}
            open={open}
            onOk={(taskId) => onClose(taskId)}
            onCancel={() => onClose(null)}
            afterClose={onUnmount}
        />
    ),
);

export default () => {
    const [form] = useForm();
    return (
        <>
            <Form form={form}>
                <Form.Item label="ID" name="id">
                    <Input />
                </Form.Item>
            </Form>
            <Button
                onClick={async () => {
                    const id = form.getFieldValue("id");
                    const nextId = await Slot.getById(slotId).open(
                        openableCustomModal,
                        { id },
                    );
                    if (nextId !== null) {
                        message.success(`生成新ID: ${nextId}`);
                        form.setFieldValue("id", nextId);
                    } else {
                        message.warning("弹窗取消");
                    }
                }}
            >
                自定义弹窗
            </Button>
        </>
    );
};
