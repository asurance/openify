import { type ErrorInfo, PureComponent, type ReactNode } from "react";
import type {
  OpenableCompState,
  OpenifyError,
  PromiseRef,
  OpenFnRef,
  OpenParams,
  ExtraParams,
  OpenResult,
  OpenFn,
} from "./interface";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function openify<Params extends OpenParams<any>>(
  fn: (props: Params) => ReactNode
) {
  const openRef: OpenFnRef<ExtraParams<Params>, OpenResult<Params>> = {
    current: null,
  };
  const openable = class extends PureComponent<
    Record<string, unknown>,
    OpenableCompState
  > {
    static open: OpenFn<ExtraParams<Params>, OpenResult<Params>>;

    _currentParams = {} as ExtraParams<Params>;
    _promiseRef: PromiseRef<OpenResult<Params>> | null = null;
    constructor(props: Record<string, unknown>) {
      super(props);
      this.state = {
        visible: false,
        mount: false,
      };
    }

    _open = (params?: ExtraParams<Params>) => {
      this._currentParams = params || ({} as ExtraParams<Params>);
      this.setState((prev) => ({ ...prev, visible: true, mount: true }));
      return new Promise<OpenResult<Params>>((resolve, reject) => {
        this._promiseRef = { resolve, reject };
      });
    };

    _onClose = (result: OpenResult<Params>) => {
      this.setState((prev) => ({ ...prev, visible: false }));
      if (this._promiseRef) {
        this._promiseRef.resolve(result);
        this._promiseRef = null;
      }
    };

    _onAfterClose = () => {
      this.setState((prev) => ({ ...prev, mount: false }));
    };

    componentDidMount() {
      openRef.current = this._open;
    }

    componentWillUnmount() {
      openRef.current = null;
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      this.setState((prev) => ({ ...prev, mount: false }));
      if (this._promiseRef) {
        (error as OpenifyError).info = errorInfo;
        this._promiseRef.reject(error as OpenifyError);
        this._promiseRef = null;
      }
    }

    render() {
      console.log("openify render");
      const { visible, mount } = this.state;
      return mount
        ? fn({
            visible,
            onClose: this._onClose,
            afterClose: this._onAfterClose,
            ...this._currentParams,
          } as unknown as Params)
        : null;
    }
  };
  openable.open = ((extraParams: ExtraParams<Params>) => {
    if (openRef.current) {
      return openRef.current(extraParams);
    }
    throw new Error("为找到对应的组件实例");
  }) as OpenFn<ExtraParams<Params>, OpenResult<Params>>;
  return openable;
}
