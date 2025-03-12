import {
    type ComponentType,
    type ReactElement,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

export type PlaceholderProps = {
    id: string;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const slotMap = new Map<any, any>();

const Slot = ({ id }: PlaceholderProps) => {
    const [insMap, setInsMap] = useState<Record<string, ReactElement>>({});
    const keyRef = useRef(0);

    useLayoutEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const openModal = (Comp: ComponentType<any>, props: any) => {
            const currentKey = keyRef.current;
            const currentRef = {
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                current: null as any,
            };
            keyRef.current += 1;
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            const promise = new Promise<any>((resolve, reject) => {
                const clear = () => {
                    setInsMap((prev) => {
                        const { [currentKey]: _, ...rest } = prev;
                        return rest;
                    });
                };
                const ins = (
                    <Comp
                        key={currentKey}
                        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                        ref={(ref: any) => {
                            currentRef.current = ref;
                            if (ref) {
                                ref.onClose = resolve;
                                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                                ref.onError = (reason: any) => {
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
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            }) as any;
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            promise.cancel = (props: any) => {
                if (currentRef.current) {
                    currentRef.current.close(props);
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
Slot.getById = (id: any) => {
    return slotMap.get(id);
};

export default Slot;
