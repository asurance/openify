import { Button, Modal, Space } from "antd";
import { openify, Slot, type OpenParams } from "openify";
import React, { createContext, useContext } from "react";
import { slotId } from "./utils";

const MyContext = createContext("默认Context");

type GetContextProps = {
    open?: boolean;
    onClose?: () => void;
    afterClose?: () => void;
};

const GetContext = ({ open, onClose, afterClose }: GetContextProps) => {
    const contextValue = useContext(MyContext);
    return (
        <Modal
            title="获取Context"
            open={open}
            onOk={onClose}
            onCancel={onClose}
            afterClose={afterClose}
        >
            {`当前Context值: ${contextValue}`}
        </Modal>
    );
};

type OpenableGetContextParams = OpenParams<string | null> &
    Omit<GetContextProps, "open" | "onOk" | "onCancel" | "afterClose">;

const openableGetContext = openify<OpenableGetContextParams>(
    ({ open, onClose, onUnmount, ...rest }) => (
        <GetContext
            {...rest}
            open={open}
            onClose={onClose}
            afterClose={onUnmount}
        />
    ),
);

export default () => {
    return (
        <MyContext.Provider value="自定义Context">
            <Space size={16}>
                <Button
                    onClick={async () => {
                        await Slot.getById(slotId).open(openableGetContext);
                    }}
                >
                    默认Context
                </Button>
                <Button
                    onClick={async () => {
                        await Slot.getById("in-context").open(
                            openableGetContext,
                        );
                    }}
                >
                    自定义Context
                </Button>
            </Space>
            <Slot id="in-context" />
        </MyContext.Provider>
    );
};
