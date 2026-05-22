import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  let sizeClass = '';
  switch (size) {
    case 'sm':
      sizeClass = 'w-4 h-4';
      break;
    case 'md':
      sizeClass = 'w-6 h-6';
      break;
    case 'lg':
      sizeClass = 'w-8 h-8';
      break;
    default:
      sizeClass = 'w-6 h-6';
  }

  return (
    <Loader2 className={`text-blue-primary animate-spin-custom ${sizeClass} ${className}`} />
  );
};

export default LoadingSpinner;
