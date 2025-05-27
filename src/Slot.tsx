import { type ReactElement, useLayoutEffect, useRef, useState } from "react";
import type { ExtraParams, OpenError, OpenParams, OpenResult } from "./openify";
import type { openify } from "./openify";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type SlotId = any;

export type CancelablePromise<Result> = [Result] extends [undefined]
    ? Promise<Result> & {
          cancel: () => void;
      }
    : Promise<Result> & {
          cancel: (result: Result) => void;
      };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type OpenFn<Params extends OpenParams<any>> =
    keyof ExtraParams<Params> extends never
        ? (
              Comp: ReturnType<typeof openify<Params>>,
          ) => CancelablePromise<OpenResult<Params>>
        : (
              Comp: ReturnType<typeof openify<Params>>,
              props: ExtraParams<Params>,
          ) => CancelablePromise<OpenResult<Params>>;

export type SlotProps = {
    id: SlotId;
};

export interface SlotOperation {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    open<Params extends OpenParams<any>>(
        Comp: ReturnType<typeof openify<Params>>,
        props?: ExtraParams<Params>,
    ): CancelablePromise<OpenResult<Params>>;
}

const slotMap = new Map<SlotId, SlotOperation>();

const Slot = ({ id }: SlotProps) => {
    const [insMap, setInsMap] = useState<Record<string, ReactElement>>({});
    const keyRef = useRef(0);

    useLayoutEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const open = <Params extends OpenParams<any>>(
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
                    const onUnmount = () => {
                        setInsMap((prev) => {
                            if (!(currentKey in prev)) {
                                return prev;
                            }
                            const { [currentKey]: _, ...rest } = prev;
                            return rest;
                        });
                    };
                    const onError = (reason: OpenError) => {
                        reject(reason);
                        onUnmount();
                    };
                    const ins = (
                        <Comp
                            key={currentKey}
                            ref={(ref) => {
                                currentRef.current = ref;
                                if (ref) {
                                    ref.open();
                                }
                            }}
                            onClose={resolve}
                            onError={onError}
                            onUnmount={onUnmount}
                            openParams={props}
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
        slotMap.set(id, { open });
        return () => {
            slotMap.delete(id);
        };
    }, [id]);
    return <>{Object.keys(insMap).map((key) => insMap[key])}</>;
};

Slot.getById = (id: SlotId) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return slotMap.get(id)!;
};

export default Slot;
