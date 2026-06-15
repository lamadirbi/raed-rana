'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAMILY_TITLE } from '@/lib/constants'
import { GATE_PHOTO } from '@/lib/photos'

type Phase = 'idle' | 'breaking' | 'opening' | 'exit'

export default function WaxSealGate({
  onOpen,
  onOpenStart,
}: {
  onOpen: () => void
  onOpenStart?: () => void
}) {
  const [phase, setPhase] = useState<Phase>('idle')

  const handleOpen = () => {
    if (phase !== 'idle') return
    onOpenStart?.()
    setPhase('breaking')
    setTimeout(() => setPhase('opening'), 600)
    setTimeout(() => setPhase('exit'), 2200)
    setTimeout(onOpen, 2800)
  }

  const sealBroken = phase !== 'idle'
  const flapOpen = phase === 'opening' || phase === 'exit'
  const cardVisible = phase === 'opening' || phase === 'exit'

  return (
    <motion.div
      className="seal-gate"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{ pointerEvents: phase === 'exit' ? 'none' : 'auto' }}
    >
      <div className="seal-gate__photo-bg" aria-hidden>
        <img src={GATE_PHOTO} alt="" />
      </div>
      <div className="seal-gate__ambient" aria-hidden />
      <div className="seal-gate__particles" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="seal-gate__spark" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className="envelope-scene">
        <motion.div
          className={`envelope${flapOpen ? ' envelope--opening' : ''}`}
          animate={{ y: flapOpen ? -8 : 0, scale: flapOpen ? 1.02 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ظهر الظرف */}
          <div className="envelope__back" />

          {/* جسم الظرف */}
          <div className="envelope__body">
            <div className="envelope__fold envelope__fold--left" />
            <div className="envelope__fold envelope__fold--right" />
            <div className="envelope__fold envelope__fold--bottom" />
          </div>

          {/* غطاء الظرف */}
          <motion.div
            className="envelope__flap"
            initial={false}
            animate={{ rotateX: flapOpen ? 175 : 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '50% 0%' }}
          />

          {/* بطاقة الدعوة — فوق الظرف عند الفتح */}
          <motion.div
            className={`envelope__card${cardVisible ? ' envelope__card--raised' : ' envelope__card--hidden'}`}
            initial={false}
            animate={
              cardVisible
                ? { y: '-195%', opacity: 1, rotate: 0, scale: 1.02, z: 80 }
                : { y: '8%', opacity: 0, rotate: 0, scale: 1, z: 0 }
            }
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: flapOpen ? 0.15 : 0 }}
          >
            <div className="envelope__card-inner">
              <AnimatePresence>
                {cardVisible && (
                  <motion.div
                    key="card-text"
                    className="envelope__card-content"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="envelope__card-kicker">بكل ود وتقدير</p>
                    <h1 className="envelope__card-title">{FAMILY_TITLE}</h1>
                    <p className="envelope__card-sub">دعوة زفاف — تشرّفونا بحضوركم</p>
                    <div className="envelope__card-ornament" aria-hidden>
                      <span />
                      <span className="envelope__card-gem" />
                      <span />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ختم الشمع */}
          {!sealBroken ? (
            <motion.button
              type="button"
              className="wax-seal"
              onClick={handleOpen}
              aria-label="اضغط على ختم الشمع لفتح الدعوة"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="wax-seal__surface" aria-hidden />
              <span className="wax-seal__ring" aria-hidden />
              <span className="wax-seal__monogram" aria-hidden>♥</span>
            </motion.button>
          ) : (
            <motion.div
              className="wax-shards"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.4 }}
              transition={{ duration: 0.55 }}
              aria-hidden
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="wax-shard" style={{ '--a': `${i * 45}deg` } as React.CSSProperties} />
              ))}
            </motion.div>
          )}
        </motion.div>

        <p className="seal-gate__hint">
          <span className="seal-gate__hint-line" aria-hidden />
          اضغط على ختم الشمع لفتح الدعوة
          <span className="seal-gate__hint-line" aria-hidden />
        </p>
      </div>
    </motion.div>
  )
}
