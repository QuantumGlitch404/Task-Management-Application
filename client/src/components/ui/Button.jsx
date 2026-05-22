import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  disabled = false, 
  className = '', 
  type = 'button',
  onClick,
  ...props 
}) => {
  let baseStyles = "interactive font-body font-semibold text-[14px] uppercase tracking-[0.02em] h-12 px-6 rounded-md transition-colors duration-300 ease-out flex items-center justify-center gap-2 ";
  
  if (disabled) {
    baseStyles += "opacity-50 cursor-not-allowed ";
  }

  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-blue-primary text-white hover:bg-blue-light ";
      break;
    case 'secondary':
      variantStyles = "bg-transparent border-[1.5px] border-border text-silver hover:border-blue-primary hover:text-white ";
      break;
    case 'danger':
      variantStyles = "bg-red text-white hover:bg-red-light ";
      break;
    default:
      variantStyles = "bg-blue-primary text-white hover:bg-blue-light ";
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
