import { type ErrorInfo, PureComponent, type ReactNode } from "react";
import type {
    ExtraParams,
    OpenParams,
    OpenResult,
    OpenableCompState,
    OpenifyError,
    PromiseRef,
} from "./interface";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function openify<Params extends OpenParams<any>>(
    fn: (props: Params) => ReactNode,
) {
    const openable = class extends PureComponent<
        Record<string, unknown>,
        OpenableCompState
    > {
        _currentParams = {} as ExtraParams<Params>;
        _promiseRef: PromiseRef<OpenResult<Params>> | null = null;
        constructor(props: Record<string, unknown>) {
            super(props);
            this.state = {
                visible: false,
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
            const { visible } = this.state;
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
