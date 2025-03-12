import type { ErrorInfo } from "react";

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
};

export type OpenFn<Params, Result> = keyof Params extends never
    ? () => Promise<Result>
    : (params: Params) => Promise<Result>;

export type CloseFn<Params> = [Params] extends [undefined]
    ? () => void
    : (params: Params) => void;

export type NullableRef<Current> = {
    current: Current | null;
};
