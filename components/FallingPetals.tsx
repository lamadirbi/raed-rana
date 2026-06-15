'use client'

import { useMemo } from 'react'

function hash01(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453
  return s - Math.floor(s)
}

export default function FallingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${hash01(i * 3.17) * 100}%`,
        delay: `${hash01(i * 5.91) * 5}s`,
        duration: `${3.5 + hash01(i * 11.13) * 3.5}s`,
        size: 16 + hash01(i * 17.3) * 20,
        drift: -30 + hash01(i * 23.7) * 60,
        rotate: -40 + hash01(i * 29.3) * 80,
        opacity: 0.88 + hash01(i * 31.1) * 0.12,
        hue: hash01(i * 37.9) > 0.5 ? 'rose' : 'deep',
      })),
    [],
  )

  return (
    <div className="falling-petals" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className={`falling-petals__petal falling-petals__petal--${p.hue}`}
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.15,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
              '--petal-opacity': p.opacity,
              '--petal-drift': `${p.drift}px`,
              '--petal-rotate': `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
