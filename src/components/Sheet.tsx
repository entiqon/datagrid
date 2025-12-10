'use client';

import * as React from 'react';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: 'right' | 'bottom';
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, side = 'right', children }: SheetProps) {
  return (
    <>
      {/* Overlay (non-interactive) */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.32)',
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          zIndex: 1001,
          background: 'white',
          transition: 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',

          ...(side === 'bottom'
            ? {
                left: 0,
                right: 0,
                bottom: 0,
                height: '70vh',
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                transform: open ? 'translateY(0)' : 'translateY(110%)',
                boxShadow: '0 -8px 16px rgba(0,0,0,0.15)',
              }
            : {
                top: 0,
                bottom: 0,
                right: 0,
                width: '380px',
                transform: open ? 'translateX(0)' : 'translateX(110%)',
                boxShadow: '-8px 0 16px rgba(0,0,0,0.15)',
              }),
        }}
      >
        {children}
      </div>
    </>
  );
}

/* -----------------------------------------------------
 * FIXED HEADER WITH CLOSE BUTTON
 * --------------------------------------------------- */

export function SheetHeader({
  title,
  description,
  onClose,
}: {
  title?: string;
  description?: string;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        padding: '5px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
        flexShrink: 0, // ❗ Prevents shrinking (fixed)
      }}
    >
      <div>
        {title && <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{title}</h2>}
        {description && (
          <p style={{ margin: '6px 0 0', color: '#666', fontSize: 14 }}>{description}</p>
        )}
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          border: 'none',
          background: 'transparent',

          padding: 4,
          marginLeft: 12,
          cursor: 'pointer',
          fontSize: 20,
          lineHeight: 1,
          opacity: 0.6,
        }}
      >
        ×
      </button>
    </div>
  );
}

/* -----------------------------------------------------
 * FLEXIBLE SCROLL CONTENT
 * --------------------------------------------------- */

export function SheetContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: '20px',
        flex: 1, // ❗ Content grows
        overflowY: 'auto', // ❗ Scrollable
      }}
    >
      {children}
    </div>
  );
}

/* -----------------------------------------------------
 * FIXED FOOTER
 * --------------------------------------------------- */

export function SheetFooter({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: '16px 20px',
        borderTop: '1px solid #eee',
        background: '#fafafa',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        flexShrink: 0, // ❗ Prevents shrinking (fixed)
      }}
    >
      {children}
    </div>
  );
}
