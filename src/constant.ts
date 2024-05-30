import { PropsName } from './interface';

export const defaultPropsName: { [name in PropsName]: name } = {
  visible: 'visible',
  onClose: 'onClose',
  afterClose: 'afterClose',
};
