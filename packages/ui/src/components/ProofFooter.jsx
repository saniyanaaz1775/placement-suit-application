import React from 'react'
import { tokens } from '../theme'

export default function ProofFooter() {
  return (
    <footer style={{ padding: tokens.spacing.medium, borderTop: `1px solid ${tokens.colors.cardBorder}`, background: tokens.colors.background }}>
      <div style={{ maxWidth: tokens.typography.maxTextWidth, margin: '0 auto', color: tokens.colors.muted }}>
        <div>□ UI Built □ Logic Working □ Test Passed □ Deployed</div>
      </div>
    </footer>
  )
}

