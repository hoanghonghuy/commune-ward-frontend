import { Component } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
          <Card className="max-w-md w-full shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="text-2xl text-red-600">
                  Đã có lỗi xảy ra
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Chúng tôi rất tiếc nhưng đã có lỗi không mong muốn xảy ra. Vui
                lòng thử lại hoặc làm mới trang.
              </p>

              {import.meta.env.VITE_ENABLE_DEBUG === "true" && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                    Chi tiết lỗi (Debug)
                  </summary>
                  <div className="mt-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-md text-xs overflow-auto max-h-48">
                    <p className="font-semibold text-red-600 mb-1">
                      {this.state.error?.toString()}
                    </p>
                    {this.state.errorInfo?.componentStack && (
                      <pre className="whitespace-pre-wrap text-slate-600 dark:text-slate-400">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => window.location.reload()} className="flex-1">
                  Làm mới trang
                </Button>
                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  Thử lại
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
