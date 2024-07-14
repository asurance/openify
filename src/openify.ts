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

export function openify<ModalProps extends OpenableProps>(
  comp: ComponentType<ModalProps>,
): (openProps: Omit<ModalProps, PropsName>) => Promise<OpenResult<ModalProps>>;
// eslint-disable-next-line @typescript-eslint/ban-types
export function openify<OpenProps extends OpenableProps, ModalProps extends {}>(
  comp: ComponentType<ModalProps>,
  config: OpenifyConfig<OpenProps, ModalProps>,
): (openProps: Omit<OpenProps, PropsName>) => Promise<OpenResult<OpenProps>>;
export function openify<
  OpenProps extends OpenableProps,
  // eslint-disable-next-line @typescript-eslint/ban-types
  ModalProps extends {},
>(
  comp: ComponentType<ModalProps>,
  config: OpenifyConfig<OpenProps, ModalProps> | undefined = {},
) {
  const { transformProps = noop } = config;
  return (openProps?: Partial<Omit<OpenProps, PropsName>>) => {
    return new Promise<OpenResult<OpenProps>>(resolve => {
      const element = document.createElement('div');
      const currentRenderHook = openify.defaultRenderHook || noop;
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

openify.defaultRenderHook = undefined as OpenifyRenderHook | undefined;
