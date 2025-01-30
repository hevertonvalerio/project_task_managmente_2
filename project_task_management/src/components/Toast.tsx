import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message?: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info
  };

  const colors = {
    success: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200',
    error: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200',
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
  };

  const Icon = icons[type];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${colors[type]}`}>
        <Icon className="w-5 h-5" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}