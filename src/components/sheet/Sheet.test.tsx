/**
 * @file __tests__/Sheet.test.tsx
 */

import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Sheet, SheetHeader, SheetContent, SheetFooter } from './Sheet';

// Ensure portals mount to a real body
beforeEach(() => {
  document.body.innerHTML = '';
});

function renderSheet(props: any = {}, children?: React.ReactNode) {
  return render(
    <Sheet
      open={props.open ?? true}
      onOpenChange={props.onOpenChange ?? (() => {})}
      side={props.side ?? 'right'}
    >
      {children ?? <div data-testid="sheet-body">Hello</div>}
    </Sheet>
  );
}

describe('Sheet component', () => {
  it('does not render when open=false', () => {
    renderSheet({ open: false });

    expect(screen.queryByTestId('sheet-body')).toBeNull();
  });

  it('renders children when open=true', () => {
    renderSheet({ open: true });

    expect(screen.getByTestId('sheet-body')).toBeInTheDocument();
  });

  it('calls onOpenChange(false) when clicking overlay', () => {
    const onOpenChange = vi.fn();

    render(
      <Sheet open={true} onOpenChange={onOpenChange}>
        <div>Hi</div>
      </Sheet>
    );

    fireEvent.click(screen.getByTestId('sheet-overlay'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does NOT close when clicking inside sheet', () => {
    const onOpenChange = vi.fn();
    renderSheet({ open: true, onOpenChange });

    const drawer = document.body.querySelector(
      "div[style*='position: fixed'][style*='z-index: 50']"
    );
    fireEvent.click(drawer!);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('closes when pressing ESC', () => {
    const onOpenChange = vi.fn();
    renderSheet({ open: true, onOpenChange });

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders on right side by default', () => {
    renderSheet();

    const drawer = document.body.querySelector(
      "div[style*='position: fixed'][style*='z-index: 50']"
    );
    expect(drawer?.getAttribute('style')).toContain('right: 0');
    expect(drawer?.getAttribute('style')).toContain('width: 380px');
  });

  it("renders bottom sheet when side='bottom'", () => {
    renderSheet({ side: 'bottom' });

    const drawer = document.body.querySelector(
      "div[style*='position: fixed'][style*='z-index: 50']"
    );
    expect(drawer?.getAttribute('style')).toContain('bottom: 0');
    expect(drawer?.getAttribute('style')).toContain('height: 70vh');
  });
});

describe('SheetHeader', () => {
  it('renders title and description', () => {
    render(
      <SheetHeader title="Edit Item" description="Modify fields" onClose={() => {}} />
    );

    expect(screen.getByText('Edit Item')).toBeInTheDocument();
    expect(screen.getByText('Modify fields')).toBeInTheDocument();
  });

  it('calls onClose when clicking X button', () => {
    const onClose = vi.fn();

    render(<SheetHeader title="X" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalled();
  });
});

describe('SheetContent', () => {
  it('renders scrollable content', () => {
    render(
      <SheetContent>
        <div data-testid="inner">Content</div>
      </SheetContent>
    );

    expect(screen.getByTestId('inner')).toBeInTheDocument();
  });
});

describe('SheetFooter', () => {
  it('renders footer actions', () => {
    render(
      <SheetFooter>
        <button data-testid="save-btn">Save</button>
      </SheetFooter>
    );

    expect(screen.getByTestId('save-btn')).toBeInTheDocument();
  });
});
