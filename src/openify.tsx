import { type ErrorInfo, PureComponent, type ReactNode } from "react";

export type OpenParams<Result> = {
    open: boolean;
    onClose: [Result] extends [undefined]
        ? () => void
        : (result: Result) => void;
    onUnmount: () => void;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ExtraParams<Params> = Params extends OpenParams<any>
    ? Omit<Params, "open" | "onClose" | "onUnmount">
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type OpenableCompProps<Params extends OpenParams<any>> = {
    onClose: (result?: OpenResult<Params>) => void;
    onError: (error: OpenifyError) => void;
    onUnmount: () => void;
};

export type OpenableCompState = {
    open: boolean;
    hasError: boolean;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function openify<Params extends OpenParams<any>>(
    fn: (props: Params) => ReactNode,
) {
    const openable = class extends PureComponent<
        OpenableCompProps<Params>,
        OpenableCompState
    > {
        static getDerivedStateFromError() {
            return {
                open: false,
                hasError: true,
            };
        }

        _currentParams = {} as ExtraParams<Params>;
        _promiseRef: PromiseRef<OpenResult<Params>> | null = null;
        constructor(props: OpenableCompProps<Params>) {
            super(props);
            this.state = {
                open: false,
                hasError: false,
            };
        }

        open = (params?: ExtraParams<Params>) => {
            this._currentParams = params || ({} as ExtraParams<Params>);
            this.setState((prev) => ({ ...prev, open: true }));
        };

        close = (result?: OpenResult<Params>) => {
            this._onClose(result);
        };

        _onClose = (result?: OpenResult<Params>) => {
            this.setState((prev) => ({ ...prev, open: false }));
            this.props.onClose(result);
        };

        _onUnmount = () => {
            this.props.onUnmount();
        };

        componentDidCatch(error: Error, errorInfo: ErrorInfo) {
            (error as OpenifyError).info = errorInfo;
            this.props.onError(error as OpenifyError);
        }

        render() {
            const { open, hasError } = this.state;
            if (hasError) {
                return null;
            }
            return fn({
                open,
                onClose: this._onClose,
                onUnmount: this._onUnmount,
                ...this._currentParams,
            } as unknown as Params);
        }
    };
    return openable;
}
