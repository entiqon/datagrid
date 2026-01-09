'use client';

import { ReactNode } from 'react';
import { useActions } from '@hooks';
import { Sheet, SheetContent, SheetFooter, SheetHeader } from '@components';
import { FormContext } from '@contracts/action-context';

interface DataGridDialogsProps {
  renderForm: (ctx: FormContext) => ReactNode;
  renderFooter?: (ctx: FormContext) => ReactNode;
  onSubmit: () => Promise<void> | void;
  onCancel?: () => void;
}

/**
 * Dialog orchestrator for DataGrid.
 * Supports: create, update, delete, import.
 * Explicitly DOES NOT support multi-row delete.
 */
export function DataGridDialogManager({
  renderForm,
  renderFooter,
  onSubmit,
  onCancel,
}: DataGridDialogsProps) {
  const actions = useActions();

  /** Always close dialog by resetting mode + triggering optional callback */
  const close = () => {
    actions.reset();
    onCancel?.();
  };

  // ---- Dialog Titles Per Mode ----
  const titles: Record<string, string> = {
    create: 'Create Record',
    update: 'Update Record',
    delete: 'Delete Record',
    import: 'Import Data',
  };

  const descriptions: Record<string, string> = {
    create: 'Add a new entry',
    update: 'Modify the selected entry',
    delete: 'This action cannot be undone',
    import: 'Upload a file to import',
  };

  // ---- Primary Button Labels Per Mode ----
  const submitLabels: Record<string, string> = {
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
    import: 'Import',
  };

  const title = titles[actions.mode] ?? 'Dialog';
  const description = descriptions[actions.mode] ?? '';
  const submitLabel = submitLabels[actions.mode] ?? 'Submit';

  // Context to pass to form + footer
  const formCtx: FormContext = {
    onSubmit,
    onCancel: close,
  };

  // ---- Default Footer (used if no override is provided) ----
  const defaultFooter = (
    <>
      <button onClick={close}>Cancel</button>
      <button
        onClick={onSubmit}
        style={{
          color: actions.mode === 'delete' ? 'white' : 'inherit',
          background: actions.mode === 'delete' ? '#d32f2f' : 'inherit',
        }}
      >
        {submitLabel}
      </button>
    </>
  );

  return (
    <Sheet
      open={!['idle', 'reload'].includes(actions.mode)}
      onOpenChange={() => actions.set('idle')}
    >
      <SheetHeader title={title} description={description} onClose={close} />

      <SheetContent>{renderForm(formCtx)}</SheetContent>

      <SheetFooter>{renderFooter ? renderFooter(formCtx) : defaultFooter}</SheetFooter>
    </Sheet>
  );
}
