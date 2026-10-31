import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '../button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-rose-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            문제가 발생했습니다.
          </h2>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            {this.state.error?.message || '예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
          </p>
          <Button onClick={this.handleReset} variant="primary" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            새로고침
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
