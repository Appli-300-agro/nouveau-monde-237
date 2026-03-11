import React from 'react';
import { cn } from '../../utils/cn';

const Loader = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizes[size],
          className
        )}
      />
    </div>
  );
};

export default Loader;
