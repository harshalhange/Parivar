import React from 'react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toasts } = useStore();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-[#2c1810] text-white text-sm font-medium px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-[#c9a227]/30 animate-bounce-short pointer-events-auto"
        >
          <span>{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
