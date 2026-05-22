import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        className: 'animate-slide-in-right',
        style: {
          background: '#141414',
          color: '#fafafa',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          padding: '16px',
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#141414',
          },
          style: {
            borderLeft: '4px solid #22c55e',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#141414',
          },
          style: {
            borderLeft: '4px solid #ef4444',
          },
        },
      }}
    />
  );
};

// We will use toast() directly from react-hot-toast in components
