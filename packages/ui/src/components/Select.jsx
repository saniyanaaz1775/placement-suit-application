import React from 'react'
import { tokens } from '../theme'

export default function Select({ label, children, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: tokens.spacing.small }}>
      {label && <div style={{ marginBottom: 8, fontSize: 14 }}>{label}</div>}
      <select {...props} style={{
        width: '100%',
        padding: `${tokens.spacing.small}px`,
        borderRadius: tokens.radius,
        border: `1px solid ${tokens.colors.cardBorder}`,
        fontSize: tokens.typography.bodySize,
        fontFamily: tokens.typography.bodyFont,
        lineHeight: tokens.typography.lineHeight,
        background: '#fff'
      }}>
        {children}
      </select>
    </label>
  )
}

