import { Button, Modal } from "antd";

export type SimpleModalProps = {
    open: boolean;
    onClose?: () => void;
    afterClose?: () => void;
};

const SimpleModal = ({ open, onClose, afterClose }: SimpleModalProps) => {
    return (
        <Modal
            title="样板弹窗"
            open={open}
            footer={
                <Button type="primary" onClick={onClose}>
                    好的
                </Button>
            }
            onCancel={onClose}
            afterClose={afterClose}
        >
            欢迎使用Openify
        </Modal>
    );
};

export default SimpleModal;
