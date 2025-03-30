import React, { type PropsWithChildren } from "react";
import { openify, Slot, type OpenParams } from "openify";
import { Button, Modal, type ModalProps } from "antd";

// region openify
type OpenableModalProps = OpenParams<void> &
    Omit<ModalProps, "open" | "onOk" | "onCancel" | "afterClose">;

const openableModal = openify<OpenableModalProps>(
    ({ open, onClose, onUnmount, ...restProps }) => (
        <Modal
            open={open}
            onOk={onClose}
            onCancel={onClose}
            afterClose={onUnmount}
            {...restProps}
        />
    ),
);
// endregion openify

// region slot
const Layout = ({ children }: PropsWithChildren) => (
    <>
        {children}
        <Slot id="root" />
    </>
);
// endregion slot

// region app
export default () => (
    <Layout>
        <Button
            onClick={() => {
                Slot.getById("root").open(openableModal, {
                    title: "欢迎使用Openify",
                    okText: "确定",
                    cancelText: "取消",
                });
            }}
        >
            打开弹窗
        </Button>
    </Layout>
);
// endregion app
