import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const typeStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose, actionLabel, onAction }) => {
  return (
    <div className={`fixed bottom-24 right-6 z-50 px-6 py-4 rounded shadow-lg text-white flex items-center gap-4 ${typeStyles[type]}`}
      role="alert"
    >
      <span>{message}</span>
      {actionLabel && onAction && (
        <button
          className="ml-2 px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100 font-semibold transition"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
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