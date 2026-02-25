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
    computeReadiness: () => set(state => {
      // placeholder aggregation
      const score = Math.round(Math.random() * 100)
      const next = { ...state, readinessScore: score, lastActivity: new Date().toISOString() }
      persistToStorage(next)
      return next
    })
  }
}))

