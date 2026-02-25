import React from 'react'
import { tokens } from '../theme'

export default function Badge({ children, tone = 'neutral', style = {} }) {
  const bg = tone === 'success' ? '#e6f4ea' : tone === 'warning' ? '#fff4e6' : '#f3f0ef'
  const color = tone === 'success' ? '#2b6a3a' : tone === 'warning' ? '#8a5300' : tokens.colors.text
  return (
    <span style={{ background: bg, color, padding: '4px 8px', borderRadius: 6, fontSize: 13, ...style }}>
      {children}
    </span>
  )
}

