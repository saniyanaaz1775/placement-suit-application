import React from 'react'
import { jobs } from '../../../../packages/data/src/jobs'
import Card from '../../../../packages/ui/src/components/Card'
import Button from '../../../../packages/ui/src/components/Button'

export default function SavedPage() {
  const [saved, setSaved] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('placementSuite_savedJobs') || '[]') } catch { return [] }
  })

  const savedJobs = jobs.filter(j => saved.includes(j.id))

  const remove = (id) => {
    const next = saved.filter(s => s !== id)
    setSaved(next)
    localStorage.setItem('placementSuite_savedJobs', JSON.stringify(next))
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'serif', fontSize: 36 }}>Saved</h1>
      {savedJobs.length === 0 ? (
        <div style={{ color: '#6b6b6b', marginTop: 12 }}>
          No saved jobs yet. Save jobs from the Jobs page to see them here.
        </div>
      ) : (
        <div style={{ marginTop: 16 }}>
          {savedJobs.map(j => (
            <Card key={j.id} style={{ marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontFamily: 'serif' }}>{j.title}</h3>
              <div style={{ color: '#6b6b6b', marginTop: 6 }}>{j.company} • {j.location}</div>
              <div style={{ marginTop: 8 }}>
                <Button onClick={() => window.open(j.applyUrl, '_blank')} variant="secondary">Apply</Button>
                <Button onClick={() => remove(j.id)} style={{ marginLeft: 8 }}>Remove</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

