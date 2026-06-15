'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  SCATTER_LAYOUTS,
  SCATTER_LAYOUTS_MOBILE,
  SCATTER_PHOTOS,
} from '@/lib/photos'

export default function ScatterPhotos() {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const layouts = mobile ? SCATTER_LAYOUTS_MOBILE : SCATTER_LAYOUTS
  const photos = SCATTER_PHOTOS

  return (
    <div className={`scatter-photos${mobile ? ' scatter-photos--mobile' : ''}`} aria-hidden>
      {photos.map((src, i) => {
        const layout = layouts[i]
        if (!layout) return null
        return (
          <motion.figure
            key={`${mobile ? 'm' : 'd'}-${src}`}
            className="scatter-photos__item"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            {...(mobile
              ? { animate: { opacity: 1, scale: 1, y: 0 } }
              : {
                  whileInView: { opacity: 1, scale: 1, y: 0 },
                  viewport: { once: true, margin: '-10px' },
                })}
            transition={{ duration: 0.65, delay: layout.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              top: layout.top,
              left: layout.left,
              right: layout.right,
              width: layout.width,
              rotate: layout.rotate,
              zIndex: layout.zIndex,
            }}
          >
            <img
              src={src}
              alt=""
              loading={mobile ? 'eager' : 'lazy'}
              decoding="async"
            />
          </motion.figure>
        )
      })}
    </div>
  )
}
