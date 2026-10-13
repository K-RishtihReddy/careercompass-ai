import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      {type === 'success' && <CheckCircle2 size={18} color="#10b981" />}
      {type === 'error' && <AlertCircle size={18} color="#ef4444" />}
      {type === 'info' && <Info size={18} color="#0284c7" />}
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: '0.5rem' }}>
          <X size={14} color="#94a3b8" />
        </button>
      )}
    </div>
  );
};
