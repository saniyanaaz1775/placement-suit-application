import React from 'react'
import { jobs } from '../../../packages/data/src/jobs'
import Card from '../../../packages/ui/src/components/Card'
import Button from '../../../packages/ui/src/components/Button'
import { useStore } from '../../../packages/state/src/store'

function JobCard({ job, onView, onSave }) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3 style={{ fontFamily: 'serif', margin: 0 }}>{job.title}</h3>
          <div style={{ color: '#6b6b6b', marginTop: 8 }}>{job.company} • {job.location} • {job.mode}</div>
          <div style={{ marginTop: 8, color: '#6b6b6b' }}>{job.experience} • {job.salaryRange}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ background: '#f3f0ef', padding: '4px 8px', borderRadius: 6 }}>{job.source}</div>
          <div style={{ color: '#6b6b6b', marginTop: 8 }}>{job.postedDaysAgo} days ago</div>
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Button onClick={() => onView(job)} variant="secondary">View</Button>
        <Button onClick={() => onSave(job.id)}>Save</Button>
        <Button onClick={() => window.open(job.applyUrl, '_blank')} variant="secondary">Apply</Button>
      </div>
    </Card>
  )
}

export default function JobsPage() {
  const setJobMatches = useStore(state => state.setJobMatches)
  const [saved, setSaved] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('placementSuite_savedJobs') || '[]')
    } catch { return [] }
  })
  const [viewJob, setViewJob] = React.useState(null)
  const [filters, setFilters] = React.useState({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest'
  })

  const filtered = React.useMemo(() => {
    let list = jobs.slice()
    const k = filters.keyword.trim().toLowerCase()
    if (k) {
      list = list.filter(j => j.title.toLowerCase().includes(k) || j.company.toLowerCase().includes(k))
    }
    if (filters.location) list = list.filter(j => j.location === filters.location)
    if (filters.mode) list = list.filter(j => j.mode === filters.mode)
    if (filters.experience) list = list.filter(j => j.experience === filters.experience)
    if (filters.source) list = list.filter(j => j.source === filters.source)
    if (filters.sort === 'latest') list = list.sort((a,b)=> a.postedDaysAgo - b.postedDaysAgo)
    if (filters.sort === 'salary') list = list.sort((a,b)=> {
      const extract = s => {
        const m = s.match(/(\\d+)(–|\\-)(\\d+)/)
        return m ? parseInt(m[1],10) : 0
      }
      return extract(b.salaryRange) - extract(a.salaryRange)
    })
    return list
  }, [filters])

  React.useEffect(() => {
    setJobMatches(jobs)
  }, [setJobMatches])

  const handleSave = (id) => {
    const next = Array.from(new Set([...saved, id]))
    setSaved(next)
    localStorage.setItem('placementSuite_savedJobs', JSON.stringify(next))
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'serif', fontSize: 36 }}>Jobs</h1>
      <p style={{ color: '#6b6b6b' }}>Browse curated job listings.</p>
      <div style={{ marginTop: 16, marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <input placeholder="Search title or company" value={filters.keyword} onChange={e=>setFilters(f=>({...f,keyword:e.target.value}))} style={{ flex:1, padding:8, borderRadius:8, border:'1px solid #e6e2dd' }} />
        <select value={filters.location} onChange={e=>setFilters(f=>({...f,location:e.target.value}))} style={{ padding:8, borderRadius:8, border:'1px solid #e6e2dd' }}>
          <option value="">All locations</option>
          {[...new Set(jobs.map(j=>j.location))].map(l=> <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={filters.mode} onChange={e=>setFilters(f=>({...f,mode:e.target.value}))} style={{ padding:8, borderRadius:8, border:'1px solid #e6e2dd' }}>
          <option value="">Any mode</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Onsite</option>
        </select>
        <select value={filters.experience} onChange={e=>setFilters(f=>({...f,experience:e.target.value}))} style={{ padding:8, borderRadius:8, border:'1px solid #e6e2dd' }}>
          <option value="">Any experience</option>
          <option>Fresher</option>
          <option>0-1</option>
          <option>1-3</option>
          <option>3-5</option>
        </select>
        <select value={filters.source} onChange={e=>setFilters(f=>({...f,source:e.target.value}))} style={{ padding:8, borderRadius:8, border:'1px solid #e6e2dd' }}>
          <option value="">Any source</option>
          <option>LinkedIn</option>
          <option>Naukri</option>
          <option>Indeed</option>
        </select>
        <select value={filters.sort} onChange={e=>setFilters(f=>({...f,sort:e.target.value}))} style={{ padding:8, borderRadius:8, border:'1px solid #e6e2dd' }}>
          <option value="latest">Latest</option>
          <option value="match">Match Score</option>
          <option value="salary">Salary</option>
        </select>
      </div>

      <div style={{ marginTop: 24 }}>
        {filtered.map(j => <JobCard key={j.id} job={j} onView={setViewJob} onSave={handleSave} />)}
      </div>

      {viewJob && (
        <div style={{
          position: 'fixed', left: 0, top: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ width: 720 }}>
            <Card>
              <h2 style={{ fontFamily: 'serif' }}>{viewJob.title} — {viewJob.company}</h2>
              <p style={{ color: '#6b6b6b' }}>{viewJob.description}</p>
              <div style={{ marginTop: 12 }}>
                <strong>Skills:</strong> {viewJob.skills.join(', ')}
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <Button onClick={() => window.open(viewJob.applyUrl, '_blank')} variant="secondary">Apply</Button>
                <Button onClick={() => handleSave(viewJob.id)}>Save</Button>
                <Button onClick={() => setViewJob(null)} variant="secondary">Close</Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

