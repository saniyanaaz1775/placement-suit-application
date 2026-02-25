import React from 'react'
import { tokens } from '../theme'

export default function Field({ label, children, hint }) {
  return (
    <div style={{ marginBottom: tokens.spacing.small }}>
      {label && <div style={{ marginBottom: 8, fontSize: 14 }}>{label}</div>}
      <div>{children}</div>
      {hint && <div style={{ marginTop: 6, color: tokens.colors.muted, fontSize: 13 }}>{hint}</div>}
    </div>
  )
}

