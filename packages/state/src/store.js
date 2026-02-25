import create from 'zustand'
import { devtools } from 'zustand/middleware'

const STORAGE_KEY = 'placementSuiteState'

const defaultState = {
  preferences: {},
  resumeData: {},
  jobMatches: [],
  applications: {},
  jdAnalyses: [],
  readinessScore: 0,
  lastActivity: null
}

const persistToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to persist state', e)
  }
}

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to load persisted state', e)
    return defaultState
  }
}

export const useStore = create(devtools(set => {
  const initial = loadFromStorage()
  return {
    ...initial,
    setPreferences: (prefs) => set(state => {
      const next = { ...state, preferences: prefs, lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    }),
    setResumeData: (data) => set(state => {
      const next = { ...state, resumeData: data, lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    }),
    getResumeData: () => {
      const s = loadFromStorage()
      return s.resumeData || {}
    },
    setJobMatches: (jobs) => set(state => {
      const next = { ...state, jobMatches: jobs, lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    }),
    addJdAnalysis: (analysis) => set(state => {
      const next = { ...state, jdAnalyses: [analysis, ...(state.jdAnalyses || [])], lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    }),
    updateApplications: (applications) => set(state => {
      const next = { ...state, applications, lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    }),
    setJobStatus: (jobId, status) => set(state => {
      const apps = { ...(state.applications || {}) }
      apps[jobId] = { status, updatedAt: new Date().toISOString() }
      const next = { ...state, applications: apps, lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    }),
    getJobStatus: (jobId) => {
      try {
        const s = loadFromStorage()
        return (s.applications && s.applications[jobId]) ? s.applications[jobId].status : 'Not Applied'
      } catch { return 'Not Applied' }
    },
    computePlacementScore: () => set(state => {
      // Aggregation:
      // Job Match Quality (30%) - approximate from jobMatches presence
      const jobMatchQuality = (state.jobMatches && state.jobMatches.length > 0) ? 60 : 20
      // JD alignment (25%) - average baseScore of analyses
      const jdScores = (state.jdAnalyses || []).map(a=>a.baseScore||0)
      const jdAlignment = jdScores.length ? Math.round(jdScores.reduce((s,v)=>s+v,0)/jdScores.length) : 30
      // Resume ATS score (25%)
      const resumeScore = (state.resumeData && state.resumeData.atsScore) ? state.resumeData.atsScore : 40
      // Application progress (10%) - percent of saved jobs moved to applied/selected/offer
      const apps = state.applications || {}
      const statuses = Object.values(apps)
      const progressed = statuses.filter(s=>['Applied','Interview Scheduled','Interview Completed','Offer','Selected'].includes(s.status)).length
      const totalApps = Object.keys(apps).length || 1
      const applicationProgress = Math.round((progressed/totalApps)*100)
      // Practice completion (10%) - placeholder 0
      const practiceCompletion = 0

      const score = Math.round(
        jobMatchQuality * 0.3 +
        jdAlignment * 0.25 +
        resumeScore * 0.25 +
        applicationProgress * 0.1 +
        practiceCompletion * 0.1
      )
      const next = { ...state, readinessScore: Math.min(100, score), lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    }),
    computeReadiness: () => set(state => {
      // placeholder aggregation
      const score = Math.round(Math.random() * 100)
      const next = { ...state, readinessScore: score, lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    })
  }
}))

