import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  className = '', 
  id, 
  type = 'text',
  ...props 
}, ref) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="font-body font-medium text-[13px] uppercase tracking-[0.05em] text-silver mb-2"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={`w-full h-12 bg-input-bg border-[1.5px] rounded-md px-4 font-body font-normal text-[15px] text-white transition-all duration-200 outline-none
          ${error 
            ? 'border-red shadow-[0_0_0_4px_rgba(239,68,68,0.15)]' 
            : 'border-border focus:border-blue-primary focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]'
          }
        `}
        {...props}
      />
      {error && (
        <span className="font-body font-normal text-[12px] text-red mt-1.5 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
