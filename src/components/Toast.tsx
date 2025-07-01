import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const typeStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded shadow-lg text-white flex items-center gap-4 ${typeStyles[type]}`}
      role="alert"
    >
      <span>{message}</span>
      <button
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        onClick={onClose}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast; 