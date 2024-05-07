import { PropsName } from './interface';

export const defaultPropsName: { [name in PropsName]: name } = {
  visible: 'visible',
  onOk: 'onOk',
  onCancel: 'onCancel',
  afterClose: 'afterClose',
};