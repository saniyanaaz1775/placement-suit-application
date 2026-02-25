import React from 'react'
import Input from '../../../packages/ui/src/components/Input'
import Select from '../../../packages/ui/src/components/Select'
import Button from '../../../packages/ui/src/components/Button'
import Card from '../../../packages/ui/src/components/Card'
import { useStore } from '../../../packages/state/src/store'

export default function ResumePage() {
  const setResumeData = useStore(s => s.setResumeData)
  const resumeData = useStore(s => s.resumeData || {})
  const [form, setForm] = React.useState(() => resumeData)

  React.useEffect(() => {
    setForm(resumeData)
  }, [resumeData])

  React.useEffect(() => {
    const t = setTimeout(() => {
      setResumeData(form || {})
    }, 500)
    return () => clearTimeout(t)
  }, [form, setResumeData])

  return (
    <div style={{ display:'flex', gap:24 }}>
      <div style={{ flex:7, maxWidth:720 }}>
        <h1 style={{ fontFamily:'serif' }}>Resume Builder</h1>
        <Card>
          <Input label="Name" value={form.name||''} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          <Input label="Email" value={form.email||''} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
          <Input label="Phone" value={form.phone||''} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
          <Input label="Location" value={form.location||''} onChange={e=>setForm(f=>({...f,location:e.target.value}))} />
          <div style={{ marginTop:16 }}>
            <label style={{ display:'block', marginBottom:8 }}>Summary</label>
            <textarea value={form.summary||''} onChange={e=>setForm(f=>({...f,summary:e.target.value}))} style={{ width:'100%', minHeight:120, padding:12, borderRadius:8, border:'1px solid #e6e2dd' }} />
          </div>
          <div style={{ marginTop:12 }}>
            <Input label="Skills (comma separated)" value={form.skills||''} onChange={e=>setForm(f=>({...f,skills:e.target.value}))} />
          </div>
          <div style={{ marginTop:12 }}>
            <Button onClick={() => { setForm({}); setResumeData({}) }}>Reset</Button>
          </div>
        </Card>
      </div>
      <aside style={{ flex:3 }}>
        <Card>
          <h3 style={{ fontFamily:'serif' }}>Live Preview</h3>
          <div style={{ marginTop:12 }}>
            <div style={{ fontWeight:700, fontSize:18 }}>{form.name || 'Your Name'}</div>
            <div style={{ color:'#6b6b6b' }}>{form.email || ''} {form.phone ? ' • ' + form.phone : ''}</div>
            <div style={{ marginTop:12 }}>{form.summary || 'Summary will appear here.'}</div>
            <div style={{ marginTop:12 }}>
              <strong>Skills:</strong> {form.skills || '—'}
            </div>
          </div>
        </Card>
      </aside>
    </div>
  )
}

import React from 'react'

export default function ResumePage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'serif', fontSize: 36 }}>Resume</h1>
      <p style={{ color: '#6b6b6b' }}>This section will be built in the next step.</p>
    </div>
  )
}

