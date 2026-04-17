import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /** When true, render nothing on error (for non-critical 3D widgets) */
  silent?: boolean;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.silent) return null;
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center bg-background p-6">
            <div className="max-w-md text-center">
              <h1 className="mb-3 font-heading text-2xl font-bold text-foreground">
                Что-то пошло не так
              </h1>
              <p className="mb-6 text-muted-foreground">
                Попробуйте обновить страницу. Если проблема повторится — напишите нам в Telegram.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Обновить страницу
                </button>
                <a
                  href="https://t.me/MalHulk"
                  className="rounded-md border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
                >
                  @MalHulk
                </a>
              </div>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
