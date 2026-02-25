import React from 'react'
import { tokens } from '../theme'

export default function Card({ children, style = {}, ...props }) {
  return (
    <div {...props} style={{
      border: `1px solid ${tokens.colors.cardBorder}`,
      borderRadius: tokens.radius,
      padding: tokens.spacing.medium,
      background: '#fff',
      ...style
    }}>
      {children}
    </div>
  )
}

