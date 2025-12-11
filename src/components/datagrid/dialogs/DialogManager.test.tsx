import '@testing-library/jest-dom';

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { DataGridDialogManager } from './DialogManager';

// Mock components used by the dialog manager
vi.mock('@components', () => ({
  Sheet: ({ open, onOpenChange, children }: any) => (
    <div data-testid="sheet" data-open={open} onClick={() => onOpenChange(false)}>
      {children}
    </div>
  ),
  SheetHeader: ({ title, description, onClose }: any) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button data-testid="close" onClick={onClose}>
        X
      </button>
    </div>
  ),
  SheetContent: ({ children }: any) => <div data-testid="content">{children}</div>,
  SheetFooter: ({ children }: any) => <div data-testid="footer">{children}</div>,
}));

// Mock useActions()
const reset = vi.fn();
const set = vi.fn();
let mode = 'create';

vi.mock('@hooks', () => ({
  useActions: () => ({
    mode,
    reset,
    set,
  }),
}));

// Utility: render form content
const renderForm = (ctx: any) => <div>FORM</div>;

describe('DataGridDialogManager', () => {
  beforeEach(() => {
    reset.mockClear();
    set.mockClear();
    mode = 'create'; // default mode
  });

  it('renders correct title/description/submit label for CREATE', () => {
    render(<DataGridDialogManager renderForm={renderForm} onSubmit={() => {}} />);

    expect(screen.getByText('Create Record')).toBeInTheDocument();
    expect(screen.getByText('Add a new entry')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('renders UPDATE mode correctly', () => {
    mode = 'update';

    render(<DataGridDialogManager renderForm={renderForm} onSubmit={() => {}} />);

    expect(screen.getByText('Update Record')).toBeInTheDocument();
    expect(screen.getByText('Modify the selected entry')).toBeInTheDocument();
    expect(screen.getByText('Update')).toBeInTheDocument();
  });

  it('renders DELETE mode with red danger button', () => {
    mode = 'delete';

    render(<DataGridDialogManager renderForm={renderForm} onSubmit={() => {}} />);

    const deleteBtn = screen.getByText('Delete');
    expect(deleteBtn).toHaveStyle('background: #d32f2f');
  });

  it('renders IMPORT mode correctly', () => {
    mode = 'import';

    render(<DataGridDialogManager renderForm={renderForm} onSubmit={() => {}} />);

    expect(screen.getByText('Import Data')).toBeInTheDocument();
    expect(screen.getByText('Upload a file to import')).toBeInTheDocument();
    expect(screen.getByText('Import')).toBeInTheDocument();
  });

  it('Sheet opens when mode ≠ idle/reload', () => {
    mode = 'create';

    render(<DataGridDialogManager renderForm={renderForm} onSubmit={() => {}} />);

    const sheet = screen.getByTestId('sheet');
    expect(sheet.getAttribute('data-open')).toBe('true');
  });

  it('Sheet closes when onOpenChange is triggered', () => {
    mode = 'create';

    render(<DataGridDialogManager renderForm={renderForm} onSubmit={() => {}} />);

    fireEvent.click(screen.getByTestId('sheet'));
    expect(set).toHaveBeenCalledWith('idle');
  });

  it('calls reset + onCancel when close() is invoked', () => {
    const onCancel = vi.fn();
    mode = 'create';

    render(
      <DataGridDialogManager
        renderForm={renderForm}
        onSubmit={() => {}}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByTestId('close'));

    expect(reset).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });

  it('cancel button triggers close logic', () => {
    const onCancel = vi.fn();

    render(
      <DataGridDialogManager
        renderForm={renderForm}
        onSubmit={() => {}}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(reset).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('submit button calls onSubmit', () => {
    const onSubmit = vi.fn();

    render(<DataGridDialogManager renderForm={renderForm} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('Create'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('renders custom footer when provided', () => {
    const footer = vi.fn().mockReturnValue(<div>MY FOOTER</div>);

    render(
      <DataGridDialogManager
        renderForm={renderForm}
        renderFooter={footer}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByText('MY FOOTER')).toBeInTheDocument();
    expect(footer).toHaveBeenCalled();
  });
});
