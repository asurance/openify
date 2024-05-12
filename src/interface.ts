import { ReactElement } from 'react';

export type PropsName = 'visible' | 'onOk' | 'onCancel' | 'afterClose';

export type OpenifyConfig<Props> = {
  defaultProps?: Partial<Props>;
  transformPropsName?: { [name in PropsName]?: string };
  container?: OpenifyContainer;
  renderHook?: (node: ReactElement) => ReactElement;
};

export type OpenifyContainer =
  | Element
  | DocumentFragment
  | (() => Element | DocumentFragment);

export type OpenifyRenderHook = (node: ReactElement) => ReactElement;

export type OpenifyCallabck<Value, Reason> =
  | {
      isOk: true;
      value: Value;
    }
  | {
      isOk: false;
      reason: Reason;
    };
