import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { OpenifyRenderHook } from './interface';

export type ErrorBoundaryProps = PropsWithChildren<{
  onError: (error: Error, errorInfo: ErrorInfo) => void;
}>;

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError(error, errorInfo);
  }

  render(): ReactNode {
    return this.props.children;
  }
}

export default ErrorBoundary;

export const defaultRenderHook: OpenifyRenderHook = (node, onError) => (
  <ErrorBoundary onError={onError}>{node}</ErrorBoundary>
);
