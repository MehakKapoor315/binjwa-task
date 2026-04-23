import { useEffect } from 'react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDone={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={`toast toast--${toast.type}`}>
      <span>{toast.type === 'success' ? '✅' : '❌'}</span>
      {toast.message}
    </div>
  );
}
