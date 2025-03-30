import { Button, message, Modal, Space } from "antd";
import { openify, Slot, type OpenParams } from "openify";
import { slotId } from "./utils";
import React, { useEffect, useRef, useState } from "react";

type RenderSelfProps = {
    open?: boolean;
    onClose?: () => void;
    afterClose?: () => void;
};

const RenderSelf = ({ open, onClose, afterClose }: RenderSelfProps) => {
    const [flag, update] = useState({});
    const initRef = useRef(false);
    // biome-ignore lint/correctness/useExhaustiveDependencies(flag): <explanation>
    useEffect(() => {
        if (initRef.current) {
            message.info("弹窗渲染");
        } else {
            initRef.current = true;
        }
    }, [flag]);
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
    const [flag, update] = useState({});
    const initRef = useRef(false);
    // biome-ignore lint/correctness/useExhaustiveDependencies(flag): <explanation>
    useEffect(() => {
        if (initRef.current) {
            message.info("App渲染");
        } else {
            initRef.current = true;
        }
    }, [flag]);
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
            <Button
                onClick={async () => {
                    await Slot.getById(slotId).open(openableRenderSelf);
                }}
            >
                打开弹窗
            </Button>
        </Space>
    );
};
