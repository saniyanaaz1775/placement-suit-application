import React from 'react'
import { tokens } from '../theme'

export default function TagInput({ value = [], onChange }) {
  const [input, setInput] = React.useState('')

  function addTag(tag) {
    const t = tag.trim()
    if (!t) return
    const next = Array.from(new Set([...value, t]))
    onChange && onChange(next)
    setInput('')
  }

  function removeTag(tag) {
    const next = value.filter(v => v !== tag)
    onChange && onChange(next)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        {value.map(v => (
          <div key={v} style={{ background: '#f3f0ef', padding: '6px 8px', borderRadius: 999, display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <span>{v}</span>
            <button onClick={() => removeTag(v)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); addTag(input) }}} style={{ flex:1, padding: tokens.spacing.small, borderRadius: tokens.radius, border: `1px solid ${tokens.colors.cardBorder}` }} placeholder="Type a skill and press Enter" />
        <button onClick={()=>addTag(input)} style={{ background: tokens.colors.accent, color:'#fff', border:'none', padding: '8px 12px', borderRadius: tokens.radius }}>Add</button>
      </div>
    </div>
  )
}

