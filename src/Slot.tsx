import { type ReactElement, useLayoutEffect, useRef, useState } from "react";
import type {
    CancelablePromise,
    ExtraParams,
    OpenifyError,
    OpenParams,
    OpenResult,
} from "./interface";
import type { openify } from "./core";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type SlotId = any;

export type PlaceholderProps = {
    id: SlotId;
};

const slotMap = new Map<
    SlotId,
    {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        openModal: <Params extends OpenParams<any>>(
            Comp: ReturnType<typeof openify<Params>>,
            props: ExtraParams<Params>,
        ) => CancelablePromise<OpenResult<Params>>;
    }
>();

const Slot = ({ id }: PlaceholderProps) => {
    const [insMap, setInsMap] = useState<Record<string, ReactElement>>({});
    const keyRef = useRef(0);

    useLayoutEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const openModal = <Params extends OpenParams<any>>(
            Comp: ReturnType<typeof openify<Params>>,
            props: ExtraParams<Params>,
        ): CancelablePromise<OpenResult<Params>> => {
            const currentKey = keyRef.current;
            const currentRef = {
                current: null as InstanceType<
                    ReturnType<typeof openify<Params>>
                > | null,
            };
            keyRef.current += 1;
            const promise = new Promise<OpenResult<Params>>(
                (resolve, reject) => {
                    const clear = () => {
                        setInsMap((prev) => {
                            const { [currentKey]: _, ...rest } = prev;
                            return rest;
                        });
                    };
                    const ins = (
                        <Comp
                            key={currentKey}
                            ref={(ref) => {
                                currentRef.current = ref;
                                if (ref) {
                                    ref.onClose = resolve;
                                    ref.onError = (reason: OpenifyError) => {
                                        reject(reason);
                                        clear();
                                    };
                                    ref.afterClose = clear;
                                    ref.open(props);
                                }
                            }}
                        />
                    );
                    setInsMap((prev) => ({ ...prev, [currentKey]: ins }));
                    return () => {
                        currentRef.current;
                    };
                },
            ) as CancelablePromise<OpenResult<Params>>;
            promise.cancel = (result) => {
                if (currentRef.current) {
                    currentRef.current.close(result);
                }
            };
            return promise;
        };
        slotMap.set(id, { openModal });
        return () => {
            slotMap.delete(id);
        };
    }, [id]);
    return <>{Object.keys(insMap).map((key) => insMap[key])}</>;
};

Slot.getById = (id: SlotId) => {
    return slotMap.get(id);
};

export default Slot;
