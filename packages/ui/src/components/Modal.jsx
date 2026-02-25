import React from 'react'
import Card from './Card'

export default function Modal({ open, onClose, children, width=720 }) {
  if (!open) return null
  return (
    <div style={{
      position:'fixed', left:0, top:0, right:0, bottom:0,
      background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000
    }}>
      <div style={{ width, maxWidth: '95%' }}>
        <Card>
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <button onClick={onClose} style={{ border:'none', background:'transparent', fontSize:18 }}>✕</button>
          </div>
          <div>
            {children}
          </div>
        </Card>
      </div>
    </div>
  )
}

