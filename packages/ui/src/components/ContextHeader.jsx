import React from 'react'
import { tokens } from '../theme'

export default function ContextHeader({ title, subtitle }) {
  return (
    <div style={{
      padding: tokens.spacing.medium,
      borderBottom: `1px solid ${tokens.colors.cardBorder}`,
      background: tokens.colors.background,
      maxWidth: tokens.typography.maxTextWidth,
      margin: '0 auto'
    }}>
      <h1 style={{ fontFamily: tokens.typography.headingFont, fontSize: 36, margin: 0 }}>{title}</h1>
      <p style={{ color: tokens.colors.muted, marginTop: 8 }}>{subtitle}</p>
    </div>
  )
}

