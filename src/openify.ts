import { ComponentType, createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  OpenResult,
  OpenableProps,
  OpenifyConfig,
  OpenifyRenderHook,
  PropsName,
} from './interface';
import { noop } from './contant';

export function openify<
  Value,
  OpenProps extends OpenableProps<Value>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  ModalProps extends {} = OpenProps,
>(
  comp: ComponentType<ModalProps>,
  config?: OpenifyConfig<Value, OpenProps, ModalProps>,
) {
  const {
    container = document.createElement('div'),
    renderHook,
    transformProps = noop,
  } = config || {};
  const getContainer =
    typeof container === 'function' ? container : () => container;
  return (openProps?: Partial<Omit<OpenProps, PropsName>>) => {
    return new Promise<OpenResult<OpenProps>>(resolve => {
      const element = getContainer();
      const currentRenderHook =
        renderHook || openify.defaultRenderHook || (node => node);
      const renderComp = () => {
        render(
          currentRenderHook(createElement(comp, transformProps(curretProps))),
          element,
        );
      };
      let curretProps = {
        ...openProps,
        visible: true,
        onClose(value: OpenResult<OpenProps>) {
          resolve(value);
          curretProps = { ...curretProps, visible: false };
          renderComp();
        },
        afterClose() {
          unmountComponentAtNode(element);
        },
      } as OpenProps;
      renderComp();
    });
  };
}

openify.defaultRenderHook = noop as OpenifyRenderHook;
