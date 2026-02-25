import React from 'react'
import { jobs } from '../../../../packages/data/src/jobs'
import Card from '../../../../packages/ui/src/components/Card'
import Button from '../../../../packages/ui/src/components/Button'
import { useStore } from '../../../../packages/state/src/store'

const STATUSES = ['Not Applied','Applied','Interview Scheduled','Interview Completed','Selected','Rejected']

export default function ApplicationsPage() {
  const apps = useStore(s=> s.applications || {})
  const setJobStatus = useStore(s=> s.setJobStatus)
  const saved = JSON.parse(localStorage.getItem('placementSuite_savedJobs')||'[]')
  const savedJobs = jobs.filter(j=> saved.includes(j.id))

  return (
    <div>
      <h1 style={{ fontFamily: 'serif', fontSize: 36 }}>Applications</h1>
      <p style={{ color: '#6b6b6b' }}>Track application stages.</p>
      <div style={{ marginTop: 16 }}>
        {savedJobs.length===0 && <div style={{ color:'#6b6b6b' }}>No saved jobs yet.</div>}
        {savedJobs.map(j=> {
          const status = (apps[j.id] && apps[j.id].status) || 'Not Applied'
          return (
            <Card key={j.id} style={{ marginBottom: 12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontWeight:700 }}>{j.title}</div>
                  <div style={{ color:'#6b6b6b' }}>{j.company} • {j.location}</div>
                </div>
                <div>
                  <select value={status} onChange={(e)=> setJobStatus(j.id, e.target.value)} style={{ padding:8, borderRadius:6 }}>
                    {STATUSES.map(s=> <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

import React from 'react'

export default function ApplicationsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'serif', fontSize: 36 }}>Applications</h1>
      <p style={{ color: '#6b6b6b' }}>This section will be built in the next step.</p>
    </div>
  )
}

