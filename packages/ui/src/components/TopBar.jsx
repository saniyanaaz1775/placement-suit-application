import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { tokens } from '../theme'
import { useStore } from '../../../packages/state/src/store'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/saved', label: 'Saved' },
  { to: '/digest', label: 'Digest' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/resume', label: 'Resume' },
  { to: '/applications', label: 'Applications' },
  { to: '/settings', label: 'Settings' },
  { to: '/proof', label: 'Proof' }
]

export default function TopBar() {
  const loc = useLocation()
  const [open, setOpen] = React.useState(false)
  const prefs = useStore ? useStore(s => s.preferences || {}) : {}
  const step = prefs.step || 1
  const total = prefs.totalSteps || 8

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: tokens.spacing.small,
      borderBottom: `1px solid ${tokens.colors.cardBorder}`,
      background: tokens.colors.background
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontWeight: 700 }}>Job Notification App</div>
        <div style={{ color: tokens.colors.muted, padding: '4px 8px', borderRadius: 6, border: `1px solid ${tokens.colors.cardBorder}`, fontSize: 13 }}>Step 1 / 8</div>
      </div>
      <nav style={{ display: 'flex', gap: 24 }}>
        <div className="desktop-nav" style={{ display: 'flex', gap: 24 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              paddingBottom: 6,
              borderBottom: loc.pathname === l.to ? `3px solid ${tokens.colors.accent}` : '3px solid transparent'
            }}>{l.label}</Link>
          ))}
        </div>
        <div className="mobile-nav" style={{ display: 'none' }}>
          <button aria-label="Menu" onClick={() => setOpen(s => !s)} style={{ background: 'transparent', border: 'none', fontSize: 18 }}>
            ☰
          </button>
          {open && (
            <div style={{ position: 'absolute', top: 56, right: 16, background: '#fff', border: `1px solid ${tokens.colors.cardBorder}`, borderRadius: 8, padding: 12 }}>
              {links.map(l => (
                <div key={l.to} style={{ padding: 8 }}>
                  <Link to={l.to} onClick={() => setOpen(false)} style={{ borderBottom: 'none' }}>{l.label}</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
      <div>
        <span style={{ padding: '6px 10px', borderRadius: 999, border: `1px solid ${tokens.colors.cardBorder}` }}>
          Not Started
        </span>
      </div>
    </div>
  )
}

