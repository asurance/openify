import { type ErrorInfo, PureComponent, type ReactNode } from "react";

export type OpenParams<Result> = {
    visible: boolean;
    onClose: [Result] extends [undefined]
        ? () => void
        : (result: Result) => void;
    afterClose: () => void;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ExtraParams<Params> = Params extends OpenParams<any>
    ? Omit<Params, "visible" | "onClose" | "afterClose">
    : never;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type OpenResult<Params extends OpenParams<any>> = Parameters<
    Params["onClose"]
>["0"];

export type OpenifyError = Error & { info: ErrorInfo };

export type PromiseRef<Result> = {
    resolve: (result: Result) => void;
    reject: (reason: OpenifyError) => void;
};

export type OpenableCompState = {
    visible: boolean;
    hasError: boolean;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function openify<Params extends OpenParams<any>>(
    fn: (props: Params) => ReactNode,
) {
    const openable = class extends PureComponent<
        Record<string, unknown>,
        OpenableCompState
    > {
        static getDerivedStateFromError() {
            return {
                visible: false,
                hasError: true,
            };
        }

        _currentParams = {} as ExtraParams<Params>;
        _promiseRef: PromiseRef<OpenResult<Params>> | null = null;
        constructor(props: Record<string, unknown>) {
            super(props);
            this.state = {
                visible: false,
                hasError: false,
            };
        }

        open = (params?: ExtraParams<Params>) => {
            this._currentParams = params || ({} as ExtraParams<Params>);
            this.setState((prev) => ({ ...prev, visible: true }));
        };

        close = (result?: OpenResult<Params>) => {
            this._onClose(result);
        };

        onClose: ((result?: OpenResult<Params>) => void) | null = null;
        onError: ((error: OpenifyError) => void) | null = null;
        afterClose: (() => void) | null = null;

        _onClose = (result?: OpenResult<Params>) => {
            this.setState((prev) => ({ ...prev, visible: false }));
            this.onClose?.(result);
        };

        _onAfterClose = () => {
            this.afterClose?.();
        };

        componentDidCatch(error: Error, errorInfo: ErrorInfo) {
            (error as OpenifyError).info = errorInfo;
            this.onError?.(error as OpenifyError);
        }

        render() {
            const { visible, hasError } = this.state;
            if (hasError) {
                return null;
            }
            return fn({
                visible,
                onClose: this._onClose,
                afterClose: this._onAfterClose,
                ...this._currentParams,
            } as unknown as Params);
        }
    };
    return openable;
}
