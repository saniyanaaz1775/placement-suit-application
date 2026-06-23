import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import TopBar from '../../../packages/ui/src/components/TopBar'
import ContextHeader from '../../../packages/ui/src/components/ContextHeader'
import LandingPage from './pages/LandingPage'
import JobsPage from './pages/JobsPage'
import ResumePage from './pages/ResumePage'
import ApplicationsPage from './pages/ApplicationsPage'
import DashboardPage from './pages/DashboardPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import SavedPage from './pages/SavedPage'

export default function App() {
  const loc = useLocation()
  const hideSecondary = loc.pathname === '/dashboard'
  return (
    <div style={{ background: '#F7F6F3', minHeight: '100vh', color: '#111111' }}>
      <TopBar />
      <ContextHeader title="Career Connect" subtitle="Connect to Opportunities" />
      <div style={{ display: 'flex', gap: 24, padding: 24 }}>
        <main style={{ flex: 7 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {/* Secondary panel removed per user request */}
      </div>
    </div>
  )
}
