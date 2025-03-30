import { Button, Modal, message } from "antd";
import { type OpenParams, Slot, openify } from "openify";
import React, { useState } from "react";
import { slotId } from "./utils";

type CatchErrorProps = {
    open?: boolean;
    onClose?: () => void;
    afterClose?: () => void;
};

const CatchError = ({ open, onClose, afterClose }: CatchErrorProps) => {
    const [hasError, setHasError] = useState(false);
    if (hasError) {
        throw new Error("模拟错误");
    }
    return (
        <Modal
            title="错误捕获"
            open={open}
            onOk={onClose}
            onCancel={onClose}
            afterClose={afterClose}
        >
            <Button onClick={() => setHasError(true)}>触发异常</Button>
        </Modal>
    );
};

type OpenableCatchErrorParams = OpenParams<string | null> &
    Omit<CatchErrorProps, "open" | "onOk" | "onCancel" | "afterClose">;

const openableCatchError = openify<OpenableCatchErrorParams>(
    ({ open, onClose, onUnmount, ...rest }) => (
        <CatchError
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
                try {
                    await Slot.getById(slotId).open(openableCatchError);
                    message.success("弹窗正确关闭");
                } catch (e) {
                    console.error(e);
                    message.error("弹窗异常退出");
                }
            }}
        >
            异常弹窗
        </Button>
    );
};
