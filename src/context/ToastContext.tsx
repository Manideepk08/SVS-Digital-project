import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast from '../components/Toast';

interface ToastContextType {
  showToast: (
    message: string,
    type?: 'success' | 'error' | 'info',
    actionLabel?: string,
    onAction?: () => void
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<
    | { message: string; type: 'success' | 'error' | 'info'; actionLabel?: string; onAction?: () => void }
    | null
  >(null);

  const showToast = useCallback(
    (
      message: string,
      type: 'success' | 'error' | 'info' = 'info',
      actionLabel?: string,
      onAction?: () => void
    ) => {
      setToast({ message, type, actionLabel, onAction });
      if (!(actionLabel && onAction)) {
        setTimeout(() => setToast(null), 3000);
      }
    },
    []
  );

  const handleClose = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleClose}
          actionLabel={toast.actionLabel}
          onAction={toast.onAction}
        />
      )}
    </ToastContext.Provider>
  );
}; 