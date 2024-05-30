import { ComponentType, createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  OpenResult,
  OpenableProps,
  OpenifyConfig,
  OpenifyRenderHook,
  PropsName,
} from './interface';

export function openify<ModalProps extends OpenableProps<any>>(
  comp: ComponentType<ModalProps>,
  config?: OpenifyConfig<ModalProps> & { bindToComponent?: true },
): ComponentType<ModalProps> & {
  open: (
    openProps?: Partial<Omit<ModalProps, PropsName>>,
  ) => Promise<OpenResult<ModalProps>>;
};
export function openify<ModalProps extends OpenableProps<any>>(
  comp: ComponentType<ModalProps>,
  config?: OpenifyConfig<ModalProps> & { bindToComponent: false },
): {
  open: (
    openProps?: Partial<Omit<ModalProps, PropsName>>,
  ) => Promise<OpenResult<ModalProps>>;
};
export function openify<ModalProps extends OpenableProps<any>>(
  comp: ComponentType<ModalProps>,
  config: OpenifyConfig<ModalProps> & { bindToComponent?: boolean } = {},
) {
  const {
    bindToComponent = true,
    defaultProps,
    container = document.createElement('div'),
    renderHook,
  } = config;
  const getContainer =
    typeof container === 'function' ? container : () => container;
  const fns = {
    open(openProps?: Partial<Omit<ModalProps, PropsName>>) {
      return new Promise<OpenResult<ModalProps>>(resolve => {
        const element = getContainer();
        const currentRenderHook =
          renderHook || openify.defaultRenderHook || (node => node);
        const renderComp = () => {
          render(currentRenderHook(createElement(comp, curretProps)), element);
        };
        let curretProps = {
          ...defaultProps,
          ...openProps,
          visible: true,
          onClose(value: OpenResult<ModalProps>) {
            resolve(value);
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          afterClose() {
            unmountComponentAtNode(element);
          },
        } as ModalProps;
        renderComp();
      });
    },
  };
  return bindToComponent ? Object.assign(comp, fns) : fns;
}

openify.defaultRenderHook = (node => node) satisfies OpenifyRenderHook;
