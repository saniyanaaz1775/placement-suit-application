import React from 'react'
import Input from '../../../../packages/ui/src/components/Input'
import Select from '../../../../packages/ui/src/components/Select'
import Button from '../../../../packages/ui/src/components/Button'
import Card from '../../../../packages/ui/src/components/Card'
import { useStore } from '../../../../packages/state/src/store'

export default function ResumePage() {
  const setResumeData = useStore(s => s.setResumeData)
  const resumeData = useStore(s => s.resumeData || {})
  const [form, setForm] = React.useState(() => resumeData)

  React.useEffect(() => {
    setForm(resumeData)
  }, [resumeData])

  React.useEffect(() => {
    const t = setTimeout(() => {
      // compute ATS score
      const computeAts = (data) => {
        let score = 0
        if (data.name) score += 10
        if (data.email) score += 10
        const summaryWords = (data.summary || '').trim().split(/\s+/).filter(Boolean).length
        if (summaryWords > 50) score += 10
        // projects and experience and skills etc (basic checks)
        const projectsCount = (data.projects && data.projects.length) ? data.projects.length : 0
        if (projectsCount >= 1) score += 10
        const experienceCount = (data.experience && data.experience.length) ? data.experience.length : 0
        if (experienceCount >= 1) score += 15
        const skillsCount = (data.skills || '').split(',').map(s=>s.trim()).filter(Boolean).length
        if (skillsCount >= 5) score += 10
        if (data.github || data.linkedin) score += 10
        // phone
        if (data.phone) score += 5
        // action verbs check
        const text = (data.summary||'') + ' ' + (data.projects||[]).join(' ')
        const verbs = /(built|led|designed|improved|implemented|optimized|created)/i
        if (verbs.test(text)) score += 10
        return Math.min(100, score)
      }
      const withScore = { ...(form||{}), atsScore: computeAts(form||{}) }
      setResumeData(withScore || {})
    }, 500)
    return () => clearTimeout(t)
  }, [form, setResumeData])

  const copyPlainText = () => {
    const text = `${form.name||''}\n${form.email||''} ${form.phone||''}\n\n${form.summary||''}\n\nSkills:\n${form.skills||''}`
    navigator.clipboard.writeText(text)
  }

  const downloadTxt = () => {
    const content = `${form.name||''}\n${form.email||''} ${form.phone||''}\n\n${form.summary||''}\n\nSkills:\n${form.skills||''}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(form.name||'resume').replace(/\s+/g,'_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

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
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight:700 }}>ATS Readiness Score</div>
              <div style={{ fontSize: 28, marginTop:8 }}>{(form.atsScore||0)} / 100</div>
              <div style={{ marginTop:12, display:'flex', gap:8 }}>
                <Button onClick={copyPlainText} variant="secondary">Copy Resume as Text</Button>
                <Button onClick={downloadTxt}>Download as TXT</Button>
              </div>
            </div>
          </div>
        </Card>
      </aside>
    </div>
  )
}
