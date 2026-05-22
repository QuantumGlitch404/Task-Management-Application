import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-overlay backdrop-blur-[8px]" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-[600px] max-h-[90vh] bg-charcoal border border-border-light rounded-[16px] shadow-[0_24px_80px_rgba(0,0,0,0.6)] animate-scale-in flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-border relative flex-shrink-0">
          <h2 id="modal-title" className="font-heading font-semibold text-[24px] text-white m-0">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-8 h-8 flex items-center justify-center bg-transparent border-none text-silver hover:text-white hover:bg-white/5 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
