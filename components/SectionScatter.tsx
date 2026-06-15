'use client'

import { motion } from 'framer-motion'

type SectionScatterVariant = 'top' | 'honor' | 'bridge' | 'countdown' | 'footer'

type SectionScatterProps = {
  photos: readonly [string, string]
  variant: SectionScatterVariant
}

export default function SectionScatter({ photos, variant }: SectionScatterProps) {
  return (
    <div className={`section-scatter section-scatter--${variant}`} aria-hidden>
      {photos.map((src, index) => (
        <motion.figure
          key={src}
          className={`section-scatter__item section-scatter__item--${index === 0 ? 'start' : 'end'}`}
          initial={{ opacity: 0, scale: 0.9, y: 14 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-24px' }}
          transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={src} alt="" loading="lazy" decoding="async" />
        </motion.figure>
      ))}
    </div>
  )
}
