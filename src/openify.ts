import { ComponentType, createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { OpenifyConfig } from './interface';
import { defaultPropsName } from './constant';

export function openify(comp: ComponentType<any>, config: OpenifyConfig) {
  const { transformPropsName, defaultProps } = config;
  const {
    visible: visiblePropName,
    onOk: onOkPropName,
    onCancel: onCancelPropName,
    afterClose: afterClosePropName,
  } = { ...defaultPropsName, ...transformPropsName };
  const element = document.createElement('div');
  return {
    open(openProps: any) {
      return new Promise<void>((resolve, reject) => {
        const renderComp = () => {
          render(createElement(comp, curretProps), element);
        };
        let curretProps = {
          ...defaultProps,
          openProps,
          [visiblePropName]: true,
          [onOkPropName]() {
            resolve();
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          [onCancelPropName]() {
            reject(new Error());
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          [afterClosePropName]() {
            unmountComponentAtNode(element);
          },
        };
        renderComp();
      });
    },
    openSafely(openProps: any) {
      return new Promise<void>(resolve => {
        const renderComp = () => {
          render(createElement(comp, curretProps), element);
        };
        let curretProps = {
          ...defaultProps,
          openProps,
          [visiblePropName]: true,
          [onOkPropName]() {
            resolve();
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          [onCancelPropName]() {
            resolve();
            curretProps = { ...curretProps, visible: false };
            renderComp();
          },
          [afterClosePropName]() {
            unmountComponentAtNode(element);
          },
        };
        renderComp();
      });
    },
  };
}
