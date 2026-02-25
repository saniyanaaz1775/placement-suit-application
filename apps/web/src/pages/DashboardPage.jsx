import React from 'react'
import { useStore } from '../../../../packages/state/src/store'
import Card from '../../../../packages/ui/src/components/Card'

export default function DashboardPage() {
  const readiness = useStore(s=>s.readinessScore)
  const compute = useStore(s=>s.computePlacementScore)
  return (
    <div>
      <h1 style={{ fontFamily: 'serif', fontSize: 36 }}>Dashboard</h1>
      <p style={{ color: '#6b6b6b' }}>Control center for your placement progress.</p>
      <div style={{ marginTop: 24, maxWidth:720 }}>
        <Card>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize: 28, fontWeight:700 }}>{readiness} / 100</div>
              <div style={{ color:'#6b6b6b' }}>Placement Score (aggregated)</div>
            </div>
            <div>
              <button onClick={compute} style={{ background:'#8B0000', color:'#fff', padding:'8px 12px', borderRadius:6, border:'none' }}>Recompute</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

