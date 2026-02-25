import React from 'react'
import { tokens } from '../theme'

export default function Button({ variant = 'primary', children, ...props }) {
  const base = {
    padding: `${tokens.spacing.small / 2}px ${tokens.spacing.medium}px`,
    borderRadius: tokens.radius,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 160ms ease-in-out',
  }
  if (variant === 'primary') {
    return (
      <button {...props} style={{ ...base, background: tokens.colors.accent, color: '#fff', border: 'none' }}>
        {children}
      </button>
    )
  }
  return (
    <button {...props} style={{ ...base, background: 'transparent', border: `1px solid ${tokens.colors.accent}`, color: tokens.colors.accent }}>
      {children}
    </button>
  )
}

