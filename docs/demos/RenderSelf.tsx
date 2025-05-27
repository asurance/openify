import { Button, Modal, Space, message } from "antd";
import { type OpenParams, Slot, openify } from "openify";
import React, { useEffect, useRef, useState } from "react";
import { slotId } from "./utils";

type RenderSelfProps = {
    id: number;
    open?: boolean;
    onClose?: () => void;
    afterClose?: () => void;
};

const RenderSelf = ({ id, open, onClose, afterClose }: RenderSelfProps) => {
    const [_, update] = useState({});
    const initRef = useRef(false);
    if (initRef.current) {
        message.info(`弹窗渲染, 对应ID: ${id}`);
    } else {
        initRef.current = true;
    }
    console.log(`弹窗渲染, 对应ID: ${id}`);
    const [timeId, setTimeId] = useState<number | null>(null);
    useEffect(() => {
        return () => {
            if (timeId) {
                clearTimeout(timeId);
            }
        };
    }, [timeId]);
    return (
        <Modal
            title="渲染隔离"
            open={open}
            onOk={onClose}
            onCancel={onClose}
            afterClose={afterClose}
        >
            <Button
                onClick={() => {
                    if (timeId === null) {
                        setTimeId(
                            window.setInterval(() => {
                                update({});
                            }, 1000),
                        );
                    } else {
                        setTimeId(null);
                    }
                }}
            >
                {timeId === null ? "开始刷新" : "停止刷新"}
            </Button>
        </Modal>
    );
};

type OpenableRenderSelfParams = OpenParams<void> &
    Omit<RenderSelfProps, "open" | "onClose" | "afterClose">;

const openableRenderSelf = openify<OpenableRenderSelfParams>(
    ({ open, onClose, onUnmount, ...rest }) => (
        <RenderSelf
            {...rest}
            open={open}
            onClose={onClose}
            afterClose={onUnmount}
        />
    ),
);

export default () => {
    const [id, setId] = useState(0);
    const initRef = useRef(false);
    if (initRef.current) {
        message.info(`App渲染, 对应ID: ${id}`);
    } else {
        initRef.current = true;
    }
    const [timeId, setTimeId] = useState<number | null>(null);
    useEffect(() => {
        return () => {
            if (timeId) {
                clearTimeout(timeId);
            }
        };
    }, [timeId]);
    return (
        <Space size={12}>
            {`ID: ${id}`}
            <Button
                onClick={() => {
                    if (timeId === null) {
                        setTimeId(
                            window.setInterval(() => {
                                setId((i) => i + 1);
                            }, 1000),
                        );
                    } else {
                        setTimeId(null);
                    }
                }}
            >
                {timeId === null ? "开始刷新" : "停止刷新"}
            </Button>
            <Button
                onClick={async () => {
                    await Slot.getById(slotId).open(openableRenderSelf, { id });
                }}
            >
                打开弹窗
            </Button>
        </Space>
    );
};
