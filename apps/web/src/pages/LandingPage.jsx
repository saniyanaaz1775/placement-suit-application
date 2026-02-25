import React from 'react'
import Button from '../../../../packages/ui/src/components/Button'

export default function LandingPage() {
  return (
    <div style={{ maxWidth: 720, margin: '40px auto' }}>
      <h1 style={{ fontFamily: 'serif', fontSize: 40, marginBottom: 12 }}>Stop Missing The Right Jobs.</h1>
      <p style={{ color: '#6b6b6b', fontSize: 18, lineHeight: 1.6 }}>
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <div style={{ marginTop: 24 }}>
        <Button onClick={() => window.location.href = '/settings'}>Start Tracking</Button>
      </div>
    </div>
  )
}

