import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Data Loading Error',
  message,
  onRetry,
}) => {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-xl my-4 text-left">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-900">{title}</h4>
          <p className="text-sm text-red-700 mt-1 leading-relaxed">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-800 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry loading
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
