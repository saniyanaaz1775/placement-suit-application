import React from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../../../packages/ui/src/components/Input'
import Select from '../../../../packages/ui/src/components/Select'
import Button from '../../../../packages/ui/src/components/Button'

export default function SettingsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily: 'serif', fontSize: 36 }}>Settings</h1>

      <div style={{ marginTop: 24 }}>
        <Input label="Role keywords (comma separated)" placeholder="e.g. React, Java, Data Analyst" />
        <Input label="Preferred locations (comma separated)" placeholder="e.g. Bangalore, Chennai" />
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>Mode</label>
            <div style={{ display: 'flex', gap: 12 }}>
              <label><input type="checkbox" /> Remote</label>
              <label><input type="checkbox" /> Hybrid</label>
              <label><input type="checkbox" /> Onsite</label>
            </div>
          </div>
          <div style={{ width: 200 }}>
            <Select label="Experience level">
              <option>Fresher</option>
              <option>0-1</option>
              <option>1-3</option>
              <option>3-5</option>
            </Select>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button onClick={() => navigate('/dashboard')}>Save Preferences</Button>
        </div>
      </div>
    </div>
  )
}
