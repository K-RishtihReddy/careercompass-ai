import React from 'react';

export const LoadingSkeleton = ({ count = 3, height = 120 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            height: `${height}px`,
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            animation: 'pulse 1.5s infinite ease-in-out',
            border: '1px solid var(--border-color)',
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
