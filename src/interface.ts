export type PropsName = 'visible' | 'onOk' | 'onCancel' | 'afterClose';

export type OpenifyConfig = {
  defaultProps?: any;
  transformPropsName?: { [name in PropsName]?: string };
};
