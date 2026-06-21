import React from 'react'
import Button from '../../../../packages/ui/src/components/Button'

export default function LandingPage() {
  return (
    <div style={{ maxWidth: 720, margin: '40px auto' }}>
      <h1 style={{ fontFamily: 'serif', fontSize: 40, marginBottom: 12 }}>Your Dream Career Starts Here.</h1>
      <p style={{ color: '#6b6b6b', fontSize: 18, lineHeight: 1.6 }}>
      Discover personalized job opportunities, track applications, and build your future with confidence.
      </p>
      <div style={{ marginTop: 24 }}>
        <Button onClick={() => window.location.href = '/settings'}>Start Tracking</Button>
      </div>
    </div>
  )
}

