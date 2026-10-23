import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading election data...',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-3" role="status">
      <div
        className={`animate-spin rounded-full border-brand-500 border-t-transparent ${sizeClasses[size]}`}
      />
      {message && <p className="text-sm font-medium text-slate-500">{message}</p>}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
