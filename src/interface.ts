import { ReactElement } from 'react';

export type IsVoid<Value> = void extends Value
  ? true
  : undefined extends Value
  ? true
  : false;

export type OnCloseFn<Value> = IsVoid<Value> extends true
  ? () => void
  : (value: Value) => void;

export type PropsName = 'visible' | 'onClose' | 'afterClose';

export type OpenifyRenderHook = (node: ReactElement) => ReactElement;

export type OpenableProps<Value = any> = {
  visible: boolean;
  onClose: OnCloseFn<Value>;
  afterClose: () => void;
};

export type OpenResult<OpenProps extends OpenableProps<any>> = Parameters<
  OpenProps['onClose']
>[0];

export type OpenifyConfig = {
  getContainer?: () => Element | DocumentFragment;
  renderHook?: (node: ReactElement) => ReactElement;
};

export type OpenifyConfigWithTransform<
  OpenProps extends OpenableProps,
  ModalProps,
> = OpenifyConfig & {
  transformProps?: (props: OpenProps) => ModalProps;
};
