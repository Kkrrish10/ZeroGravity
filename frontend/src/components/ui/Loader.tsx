import React from 'react';
import { Loader2 } from 'lucide-react';
import { classNames } from '../../utils/helpers';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export default function Loader({ size = 'md', className, fullScreen = false }: LoaderProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const spinner = (
    <Loader2 className={classNames('animate-spin text-neutral-600', sizes[size], className)} />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
