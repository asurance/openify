import { ComponentType, createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { OpenifyCallabck, OpenifyConfig, OpenifyRenderHook } from './interface';
import { defaultPropsName } from './constant';
import { OpenifyError } from './openifyError';

export function openify<ModalProps extends object, Value, Reason>(
  comp: ComponentType<ModalProps>,
  config: OpenifyConfig<ModalProps> & { bindToComponent?: true },
): ComponentType<ModalProps> & {
  open: (openProps: Partial<ModalProps>) => Promise<Value>;
  openSafely: (
    openProps: Partial<ModalProps>,
  ) => Promise<OpenifyCallabck<Value, Reason>>;
};
export function openify<ModalProps extends object, Value, Reason>(
  comp: ComponentType<ModalProps>,
  config: OpenifyConfig<ModalProps> & { bindToComponent: false },
): {
  open: (openProps: Partial<ModalProps>) => Promise<Value>;
  openSafely: (
    openProps: Partial<ModalProps>,
  ) => Promise<OpenifyCallabck<Value, Reason>>;
};
export function openify<ModalProps extends object, Value, Reason>(
  comp: ComponentType<ModalProps>,
  config: OpenifyConfig<ModalProps> & { bindToComponent?: boolean },
) {
  const {
    bindToComponent = true,
    transformPropsName,
    defaultProps,
    container = document.createElement('div'),
    renderHook,
  } = config;
  const {
    visible: visiblePropName,
    onOk: onOkPropName,
    onCancel: onCancelPropName,
    afterClose: afterClosePropName,
  } = { ...defaultPropsName, ...transformPropsName };
  const getContainer =
    typeof container === 'function' ? container : () => container;
  const fns = {
    open(openProps: Partial<ModalProps>) {
      return new Promise<Value>((resolve, reject) => {
        const element = getContainer();
        const currentRenderHook =
          renderHook || openify.defaultRenderHook || (node => node);
        const renderComp = () => {
          render(currentRenderHook(createElement(comp, curretProps)), element);
        };
        let curretProps = {
          ...defaultProps,
          ...openProps,
          [visiblePropName]: true,
          [onOkPropName](value: Value) {
            resolve(value);
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          [onCancelPropName](reason: Reason) {
            reject(new OpenifyError(reason));
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          [afterClosePropName]() {
            unmountComponentAtNode(element);
          },
        } as ModalProps;
        renderComp();
      });
    },
    openSafely(openProps: Partial<ModalProps>) {
      return new Promise<OpenifyCallabck<Value, Reason>>(resolve => {
        const element = getContainer();
        const currentRenderHook =
          renderHook || openify.defaultRenderHook || (node => node);
        const renderComp = () => {
          render(currentRenderHook(createElement(comp, curretProps)), element);
        };
        let curretProps = {
          ...defaultProps,
          ...openProps,
          [visiblePropName]: true,
          [onOkPropName](value: Value) {
            resolve({
              isOk: true,
              value,
            });
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          [onCancelPropName](reason: Reason) {
            resolve({
              isOk: false,
              reason,
            });
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          [afterClosePropName]() {
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
