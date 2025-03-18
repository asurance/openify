import { openify } from "openify";
import type { OpenParams } from "openify";
import NormalModal from "./NormalModal";
import SimpleModal from "./SimpleModal";

export type OpenableNormalModalParams = OpenParams<string | null> & {
    id: string;
};

export const OpenableNormalModal = openify(
    ({ visible, onClose, afterClose, id }: OpenableNormalModalParams) => (
        <NormalModal
            id={id}
            open={visible}
            onOk={(nextId) => onClose(nextId)}
            onCancel={() => onClose(null)}
            afterClose={afterClose}
        />
    ),
);

export type OpenableSimpleModalParams = OpenParams<undefined>;

export const OpenableSimpleModal = openify(
    ({ visible, onClose, afterClose }: OpenableSimpleModalParams) => (
        <SimpleModal open={visible} onClose={onClose} afterClose={afterClose} />
    ),
);
