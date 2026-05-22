import React from 'react';

const Card = ({ children, className = '', hoverable = false, onClick }) => {
  const baseStyle = "bg-card-bg border border-border rounded-lg p-5 transition-all duration-300 ";
  const hoverStyle = hoverable ? "hover:border-blue-primary hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(59,130,246,0.1)] cursor-pointer " : "";

  return (
    <div 
      className={`${baseStyle} ${hoverStyle} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
