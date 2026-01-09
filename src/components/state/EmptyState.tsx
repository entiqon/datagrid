/** @file: components/EmptyState.tsx */

import type { CSSProperties, ReactNode } from 'react';

import { EmptyStateContext } from '@contracts';
import EmptyStateIcon from './EmptyStateIcon';

const containerStyle: CSSProperties = {
  width: '100%',
  padding: '72px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const iconStyle: CSSProperties = {
  padding: '12px',
  borderRadius: '12px',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  marginBottom: '32px',
};

const titleStyle: CSSProperties = {
  fontSize: '24px',
  fontWeight: 600,
  marginBottom: '8px',
};

const descriptionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  color: '#6f6f6f',
  maxWidth: '360px',
  fontSize: '16px',
  marginBottom: '28px',
  lineHeight: 1.4,
};

const actionsStyle: CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '28px',
};

const baseButton: CSSProperties = {
  padding: '10px 48px',
  borderRadius: '12px',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '15px',
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '36px',
};

const primaryButton: CSSProperties = {
  ...baseButton,
  background: 'black',
  color: 'white',
  border: 'none',
};

const secondaryButton: CSSProperties = {
  ...baseButton,
  background: 'white',
  border: '1px solid #d1d1d1',
  color: 'black',
};

const learnMoreStyle: CSSProperties = {
  fontSize: '15px',
  color: '#6f6f6f',
  textDecoration: 'none',
};

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  context?: EmptyStateContext;
}

export default function EmptyState({
  icon = <EmptyStateIcon />,
  title = 'No data found',
  description,
  context,
}: EmptyStateProps) {
  description = description ? (
    <p style={descriptionStyle}>{description}</p>
  ) : (
    <div style={descriptionStyle}>
      <span>There are no rows to display.</span>
      <span>Get started by creating your first record.</span>
    </div>
  );

  return (
    <div style={containerStyle}>
      {icon && <div style={iconStyle}>{icon}</div>}

      <h2 style={titleStyle}>{title}</h2>

      {description}

      {(context?.onCreate || context?.onImport) && (
        <div style={actionsStyle}>
          {context?.onCreate && (
            <button style={primaryButton} onClick={context.onCreate}>
              Create
            </button>
          )}
          {context?.onImport && (
            <button style={secondaryButton} onClick={context.onImport}>
              Import
            </button>
          )}
        </div>
      )}

      {context?.learnMoreLink && (
        <a href={context.learnMoreLink} style={learnMoreStyle}>
          Learn more →
        </a>
      )}
    </div>
  );
}
