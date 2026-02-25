import React from 'react'
import Input from '../../../../packages/ui/src/components/Input'
import Button from '../../../../packages/ui/src/components/Button'
import Card from '../../../../packages/ui/src/components/Card'
import { useStore } from '../../../../packages/state/src/store'
import { v4 as uuidv4 } from 'uuid'

const SKILL_CATEGORIES = {
  coreCS: ['DSA','OOP','DBMS','OS','Networks'],
  languages: ['Java','Python','JavaScript','TypeScript','C','C++','C#','Go'],
  web: ['React','Next.js','Node.js','Express','REST','GraphQL'],
  data: ['SQL','MongoDB','PostgreSQL','MySQL','Redis'],
  cloud: ['AWS','Azure','GCP','Docker','Kubernetes','CI/CD','Linux'],
  testing: ['Selenium','Cypress','Playwright','JUnit','PyTest']
}

function extractSkills(text) {
  const found = {
    coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: []
  }
  const t = text || ''
  Object.keys(SKILL_CATEGORIES).forEach(cat => {
    SKILL_CATEGORIES[cat].forEach(tok => {
      const re = new RegExp('\\b' + tok.replace('.','\\.') + '\\b','i')
      if (re.test(t)) found[cat].push(tok)
    })
  })
  // dedupe
  Object.keys(found).forEach(k => { found[k] = Array.from(new Set(found[k])) })
  // if none found, populate other
  const total = Object.values(found).reduce((s,a)=>s+a.length,0)
  if (total === 0) found.other = ['Communication','Problem solving','Basic coding','Projects']
  return found
}

export default function AnalyzePage() {
  const addJdAnalysis = useStore(s => s.addJdAnalysis)
  const jdAnalyses = useStore(s => s.jdAnalyses || [])
  const [company, setCompany] = React.useState('')
  const [role, setRole] = React.useState('')
  const [jdText, setJdText] = React.useState('')
  const [warning, setWarning] = React.useState('')
  const [result, setResult] = React.useState(null)

  const validate = () => {
    if (jdText.trim().length < 1) {
      setWarning('Job description is required.')
      return false
    }
    if (jdText.trim().length < 200) {
      setWarning('This JD is too short to analyze deeply. Paste full JD for better output.')
      // still allow
    } else {
      setWarning('')
    }
    return true
  }

  function computeBaseScore(extracted) {
    let score = 35
    // +5 per detected category present (max 30)
    let categoriesPresent = 0
    Object.keys(extracted).forEach(k => { if ((extracted[k]||[]).length>0) categoriesPresent++ })
    score += Math.min(categoriesPresent * 5, 30)
    if (company.trim()) score += 10
    if (role.trim()) score += 10
    if (jdText.length > 800) score += 10
    return Math.min(score, 100)
  }

  const handleAnalyze = () => {
    if (!validate()) return
    const extracted = extractSkills(jdText)
    const baseScore = computeBaseScore(extracted)
    const now = new Date().toISOString()
    const entry = {
      id: uuidv4(),
      createdAt: now,
      company: company.trim(),
      role: role.trim(),
      jdText,
      extractedSkills: extracted,
      roundMapping: [],
      checklist: [],
      plan7Days: [],
      questions: [],
      baseScore,
      skillConfidenceMap: {},
      finalScore: baseScore,
      updatedAt: now
    }
    addJdAnalysis(entry)
    setResult(entry)
    // clear form? keep it
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily: 'serif', fontSize: 36 }}>Analyze JD</h1>
      <p style={{ color: '#6b6b6b' }}>Paste a job description to extract skills and get a readiness estimate.</p>

      <Card style={{ marginTop: 16 }}>
        <Input label="Company (optional)" value={company} onChange={e=>setCompany(e.target.value)} placeholder="e.g. Freshworks" />
        <Input label="Role (optional)" value={role} onChange={e=>setRole(e.target.value)} placeholder="e.g. React Developer" />
        <label style={{ display:'block', marginBottom:8 }}>Job Description</label>
        <textarea value={jdText} onChange={e=>setJdText(e.target.value)} style={{ width:'100%', minHeight:160, padding:12, borderRadius:8, border:'1px solid #e6e2dd' }} />
        {warning && <div style={{ marginTop: 8, color: '#8a5300' }}>{warning}</div>}
        <div style={{ marginTop: 12, display:'flex', gap:8 }}>
          <Button onClick={handleAnalyze}>Analyze</Button>
          <Button variant="secondary" onClick={() => { setCompany(''); setRole(''); setJdText(''); setWarning('') }}>Reset</Button>
        </div>
      </Card>

      {result && (
        <Card style={{ marginTop: 16 }}>
          <h2 style={{ fontFamily: 'serif' }}>Analysis Result</h2>
          <div style={{ marginTop: 8, color: '#6b6b6b' }}>Base Score: {result.baseScore}</div>
          <div style={{ marginTop: 8 }}>
            <strong>Extracted Skills</strong>
            <pre style={{ background:'#f7f7f7', padding:12, borderRadius:6 }}>{JSON.stringify(result.extractedSkills, null, 2)}</pre>
          </div>
        </Card>
      )}

      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontFamily: 'serif' }}>History</h3>
        {jdAnalyses.length === 0 ? <div style={{ color:'#6b6b6b' }}>No analyses yet.</div> : (
          <div style={{ display:'grid', gap:12, marginTop:12 }}>
            {jdAnalyses.map(a => (
              <Card key={a.id}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontWeight:700 }}>{a.role || 'Untitled'}</div>
                    <div style={{ color:'#6b6b6b' }}>{a.company || 'Unknown company'} • {new Date(a.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <Button onClick={() => setResult(a)} variant="secondary">View</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
