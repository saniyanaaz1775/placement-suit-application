import React from 'react'
import { tokens } from '../theme'

export default function Toggle({ checked=false, onChange }) {
  return (
    <label style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
      <div style={{
        width: 44,
        height: 24,
        borderRadius: 999,
        background: checked ? tokens.colors.accent : '#e6e2dd',
        padding: 3,
        transition: 'all 160ms ease-in-out',
        cursor: 'pointer'
      }} onClick={() => onChange && onChange(!checked)}>
        <div style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          background: checked ? '#fff' : '#fff',
          transform: checked ? 'translateX(20px)' : 'translateX(0)',
          transition: 'all 160ms ease-in-out'
        }} />
      </div>
    </label>
  )
}

