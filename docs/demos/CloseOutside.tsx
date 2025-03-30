import { Button, message, Modal } from "antd";
import { openify, Slot, type OpenParams } from "openify";
import { slotId } from "./utils";
import React from "react";

type CloseOutsideProps = {
    open?: boolean;
    onClose?: (reaseon: string) => void;
    afterClose?: () => void;
};

const CloseOutside = ({ open, onClose, afterClose }: CloseOutsideProps) => {
    return (
        <Modal
            title="外部关闭"
            open={open}
            onOk={() => onClose?.("内部确定")}
            onCancel={() => onClose?.("内部取消")}
            afterClose={afterClose}
        />
    );
};

type OpenableCloseOutsideParams = OpenParams<string> &
    Omit<CloseOutsideProps, "open" | "onClose" | "afterClose">;

const openableCloseOutside = openify<OpenableCloseOutsideParams>(
    ({ open, onClose, onUnmount, ...rest }) => (
        <CloseOutside
            {...rest}
            open={open}
            onClose={onClose}
            afterClose={onUnmount}
        />
    ),
);

export default () => {
    return (
        <Button
            onClick={async () => {
                const res = Slot.getById(slotId).open(openableCloseOutside);
                setTimeout(() => {
                    res.cancel("外部关闭");
                }, 5000);
                const reason = await res;
                message.info(`关闭原因: ${reason}`);
            }}
        >
            打开弹窗
        </Button>
    );
};
