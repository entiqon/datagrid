export interface ActionContext {
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
  onCreate: () => Promise<void> | void;
  onImport: () => void;
  learnMoreLink?: string;
}

export type FormContext = Pick<ActionContext, 'onSubmit' | 'onCancel'>;

export type EmptyStateContext = Partial<
  Pick<ActionContext, 'onCreate' | 'onImport' | 'learnMoreLink'>
>;
