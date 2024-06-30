import { ReactElement } from 'react';

export type PropsName = 'visible' | 'onClose' | 'afterClose';

export type OpenifyConfig<
  Value,
  OpenProps extends OpenableProps<Value>,
  ModalProps,
> = {
  container?: OpenifyContainer | (() => OpenifyContainer);
  renderHook?: (node: ReactElement) => ReactElement;
  transformProps?: (props: OpenProps) => ModalProps;
};

export type OpenifyContainer = Element | DocumentFragment;

export type OpenifyRenderHook = (node: ReactElement) => ReactElement;

export type OpenableProps<Value> = {
  visible: boolean;
  onClose: OnCloseFn<Value>;
  afterClose: () => void;
};

export type IsVoid<Value> = void extends Value
  ? true
  : undefined extends Value
  ? true
  : false;

export type OnCloseFn<Value> = IsVoid<Value> extends true
  ? () => void
  : (value: Value) => void;

export type OpenResult<OpenProps extends OpenableProps<any>> = Parameters<
  OpenProps['onClose']
>[0];
