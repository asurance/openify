import React, { type PropsWithChildren } from "react";
import { openify, Slot, type OpenParams } from "openify";
import { Button, Modal, type ModalProps } from "antd";

type OpenableModalProps = OpenParams<void> &
    Omit<ModalProps, "visible" | "onOk" | "onCancel" | "afterClose">;

const openableModal = openify<OpenableModalProps>(
    ({ visible, onClose, afterClose, ...restProps }) => (
        <Modal
            open={visible}
            onOk={onClose}
            onCancel={onClose}
            afterClose={afterClose}
            {...restProps}
        />
    ),
);

export const App = ({ children }: PropsWithChildren) => (
    <>
        {children}
        <Slot id="root" />
    </>
);

export const Open = () => (
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
);
