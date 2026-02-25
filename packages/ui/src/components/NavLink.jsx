import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { tokens } from '../theme'

export default function NavLink({ to, children }) {
  const loc = useLocation()
  const active = loc.pathname === to
  return (
    <Link to={to} style={{
      paddingBottom: 6,
      borderBottom: active ? `3px solid ${tokens.colors.accent}` : '3px solid transparent',
      color: tokens.colors.text
    }}>
      {children}
    </Link>
  )
}

