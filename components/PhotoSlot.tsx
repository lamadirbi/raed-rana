'use client'

import { useState } from 'react'

type PhotoSlotProps = {
  src: string
  alt: string
  label?: string
  mono?: string
  wide?: boolean
  compact?: boolean
}

export default function PhotoSlot({ src, alt, label, mono = '♥', wide, compact }: PhotoSlotProps) {
  const [error, setError] = useState(false)

  return (
    <figure className={`photo-slot${wide ? ' photo-slot--wide' : ''}${compact ? ' photo-slot--compact' : ''}`}>
      <div className="photo-slot__frame">
        {!error ? (
          <img
            src={src}
            alt={alt}
            className="photo-slot__img"
            onError={() => setError(true)}
          />
        ) : (
          <div className="photo-slot__placeholder">
            <span className="photo-slot__mono">{mono}</span>
            <span className="photo-slot__hint">أضف الصورة في public{src}</span>
          </div>
        )}
      </div>
      {label && <figcaption className="photo-slot__label">{label}</figcaption>}
    </figure>
  )
}
