'use client'

import { useEffect, useMemo, useState } from 'react'

export default function Countdown({ target }: { target: Date }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const remaining = useMemo(() => {
    const diff = target.getTime() - now
    if (diff <= 0) return null
    const s = Math.floor(diff / 1000)
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    }
  }, [now, target])

  return (
    <div className="countdown invite-text-panel">
      <p className="kicker">ننتظر اللقاء</p>
      {remaining ? (
        <>
          <h2 className="section-title section-title--sm">العد التنازلي للفرح</h2>
          <div className="countdown__grid">
            {[
              { n: remaining.days, label: 'يوم' },
              { n: remaining.hours, label: 'ساعة' },
              { n: remaining.minutes, label: 'دقيقة' },
              { n: remaining.seconds, label: 'ثانية' },
            ].map((u) => (
              <div key={u.label} className="countdown__unit">
                <span className="countdown__num">{u.n}</span>
                <span className="countdown__label">{u.label}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="countdown__done">بارك الله لهما وبارك عليهما — وجمع بينهما في خير</p>
      )}
    </div>
  )
}
