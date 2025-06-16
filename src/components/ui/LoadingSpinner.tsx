// src/components/ui/LoadingSpinner.tsx
import { cn } from '../../lib/Utils';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
};

export default function LoadingSpinner({ size = 'md', color = 'primary', className }: LoadingSpinnerProps) {
  // Ukuran spinner
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  // Warna spinner
  const colorClasses = {
    primary: 'border-t-blue-600 border-b-blue-600',
    secondary: 'border-t-gray-600 border-b-gray-600',
    white: 'border-t-white border-b-white',
  };

  return (
    <div className={cn('flex justify-center items-center', className)} aria-label="Loading..." role="status">
      <div className={cn('animate-spin rounded-full border-transparent', sizeClasses[size], colorClasses[color])} />
    </div>
  );
}

// Variasi inline spinner (opsional)
export function InlineLoadingSpinner({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size="sm" />
      <span className="text-sm text-gray-500">{text}</span>
    </div>
  );
}

// Variasi full page spinner (opsional)
export function FullPageLoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <LoadingSpinner size="lg" />
    </div>
  );
}
