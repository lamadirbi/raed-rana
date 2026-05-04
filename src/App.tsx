import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'

const WEDDING_START = new Date(2026, 4, 7, 18, 0, 0)
const MAP_SEARCH =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('صالة رواء فش فريس')

const BASE = import.meta.env.BASE_URL

/** مسار صورة داخل `public/Image/` (يدعم مسافات وأسماء عربية) */
function pubImg(filename: string): string {
  return `${BASE}Image/${encodeURIComponent(filename)}`
}

/** صور المعرض — نفس ترتيب `MemoryGallery` */
const MEMORY_GALLERY_FILES = [
  'ت.jpeg',
  'WhatsApp Image 2026-05-04 at 1.00.36 AM.jpeg',
  'WhatsApp Image 2026-05-04 at 1.00.37 AM.jpeg',
  'WhatsApp Image 2026-05-04 at 1.00.36 AMت.jpeg',
] as const

/** صورة ورقة الصندوق = نفس صورة المعرض الأخيرة */
const GIFT_PARCHMENT_PHOTO = pubImg(MEMORY_GALLERY_FILES[3])

const COUPLE_PHOTO_GROOM = pubImg('WhatsApp Image 2026-05-04 at 1.00.36 AM.jpeg')
const COUPLE_PHOTO_BRIDE = pubImg('WhatsApp Image 2026-05-04 at 1.00.37 AM.jpeg')
const COUPLE_PHOTO_TOGETHER = pubImg('ت.jpeg')

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return useMemo(() => {
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
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionRule() {
  return (
    <div className="section-rule" aria-hidden>
      <span className="section-rule__line" />
      <span className="section-rule__gem" />
      <span className="section-rule__line" />
    </div>
  )
}

function hash01(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453
  return s - Math.floor(s)
}

/** فراشة SVG — أجنحة متحركة وتدرج لوني يشبه الفراشة الحقيقية */
function ButterflySvg({ uid, hue }: { uid: string; hue: number }) {
  const h2 = (hue + 38) % 360
  const h3 = (hue + 12) % 360
  return (
    <svg className="butterfly-svg" viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-w1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hue}, 72%, 52%)`} />
          <stop offset="55%" stopColor={`hsl(${h2}, 68%, 36%)`} />
          <stop offset="100%" stopColor={`hsl(${h3}, 62%, 24%)`} />
        </linearGradient>
        <linearGradient id={`${uid}-w2`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hue}, 58%, 68%)`} />
          <stop offset="100%" stopColor={`hsl(${h2}, 55%, 42%)`} />
        </linearGradient>
        <radialGradient id={`${uid}-spot`} cx="35%" cy="35%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="35%" stopColor="rgba(255,220,160,0.35)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <g className="butterfly-svg__root">
        <g className="butterfly-svg__wing butterfly-svg__wing--left">
          <path
            fill={`url(#${uid}-w1)`}
            d="M52 48 C52 14 28 6 10 32 C6 42 14 52 48 54 C50 52 52 50 52 48Z"
          />
          <path
            fill={`url(#${uid}-w2)`}
            opacity={0.92}
            d="M48 56 C22 58 8 72 12 86 C18 94 36 88 50 72 C52 66 50 58 48 56Z"
          />
          <ellipse cx="28" cy="30" rx="10" ry="8" fill={`url(#${uid}-spot)`} opacity={0.85} transform="rotate(-18 28 30)" />
        </g>
        <g transform="translate(100 0) scale(-1 1)">
          <g className="butterfly-svg__wing butterfly-svg__wing--right">
            <path
              fill={`url(#${uid}-w1)`}
              d="M52 48 C52 14 28 6 10 32 C6 42 14 52 48 54 C50 52 52 50 52 48Z"
            />
            <path
              fill={`url(#${uid}-w2)`}
              opacity={0.92}
              d="M48 56 C22 58 8 72 12 86 C18 94 36 88 50 72 C52 66 50 58 48 56Z"
            />
            <ellipse cx="28" cy="30" rx="10" ry="8" fill={`url(#${uid}-spot)`} opacity={0.85} transform="rotate(-18 28 30)" />
          </g>
        </g>
        <ellipse className="butterfly-svg__body" cx="50" cy="52" rx="5" ry="15" />
        <path
          className="butterfly-svg__ant"
          d="M50 40 Q44 24 40 14 M50 40 Q56 24 60 14"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

function useButterflyField() {
  return useMemo(() => {
    const count = 36
    return Array.from({ length: count }, (_, i) => {
      const col = i % 9
      const row = Math.floor(i / 9)
      const jitterX = hash01(i * 3.17) * 11 - 2
      const jitterY = hash01(i * 5.91) * 12 - 2
      const left = Math.min(94, Math.max(2, 1.5 + (col / 8) * 92 + jitterX))
      const top = Math.min(91, Math.max(1, 2 + (row / 3) * 82 + jitterY))
      const size = 26 + hash01(i * 11.13) * 34
      const delay = `${hash01(i * 13.7) * 7}s`
      const dur = `${5 + hash01(i * 17.3) * 5.5}s`
      const durWing = `${0.22 + hash01(i * 19.1) * 0.14}s`
      const hue = 258 + hash01(i * 23.7) * 52
      const flip = hash01(i * 29.3) > 0.45 ? -1 : 1
      const opacity = 0.5 + hash01(i * 31.1) * 0.45
      const blur = hash01(i * 37.9) > 0.88 ? 0.4 : 0
      const z = Math.round(hash01(i * 41.2) * 4)
      const dx1 = 16 + hash01(i * 43.5) * 36
      const dy1 = -18 - hash01(i * 47.1) * 32
      const dx2 = -12 - hash01(i * 53.7) * 28
      const dy2 = 10 + hash01(i * 59.2) * 22
      return {
        id: i,
        left: `${left}%`,
        top: `${top}%`,
        size,
        delay,
        dur,
        durWing,
        hue,
        flip,
        opacity,
        blur,
        z,
        dx1,
        dy1,
        dx2,
        dy2,
        rot: -14 + hash01(i * 61.4) * 28,
      }
    })
  }, [])
}

function Butterflies() {
  const field = useButterflyField()
  return (
    <div className="butterflies-layer" aria-hidden>
      {field.map((b) => (
        <div
          key={b.id}
          className="butterfly"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size * 0.92,
            animationDelay: b.delay,
            animationDuration: b.dur,
            ...({
              '--bf-dx1': `${b.dx1}px`,
              '--bf-dy1': `${b.dy1}px`,
              '--bf-dx2': `${b.dx2}px`,
              '--bf-dy2': `${b.dy2}px`,
              '--bf-rot': `${b.rot}deg`,
              '--bf-wing-dur': b.durWing,
            } as CSSProperties),
            opacity: b.opacity,
            filter: b.blur ? `blur(${b.blur}px)` : undefined,
            zIndex: b.z,
          }}
        >
          <div className="butterfly__flip" style={{ transform: `scaleX(${b.flip})` }}>
            <ButterflySvg uid={`bf-${b.id}`} hue={b.hue} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SparkleField() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 13) % 100}%`,
        top: `${(i * 23 + 7) % 100}%`,
        delay: `${(i % 12) * 0.22}s`,
        scale: 0.5 + (i % 4) * 0.35,
      })),
    [],
  )
  return (
    <div className="sparkle-field" aria-hidden>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            transform: `scale(${s.scale})`,
          }}
        />
      ))}
    </div>
  )
}

function Petals({ variant = 'mauve' }: { variant?: 'mauve' | 'gold' }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${(i * 5.1) % 100}%`,
        delay: `${i * 0.55}s`,
        duration: `${12 + (i % 8)}s`,
      })),
    [],
  )
  return (
    <div className={`petals-layer petals-layer--${variant}`} aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}

function GoldCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [large, setLarge] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest('button, a, [data-cursor-large]')) setLarge(true)
      else setLarge(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return <div ref={ref} className={`theme-cursor${large ? ' is-large' : ''}`} aria-hidden />
}

type GiftPhase = 'idle' | 'lift' | 'scroll' | 'exit'

function LuxuryGiftGate({
  onDone,
  onOpenStart,
}: {
  onDone: () => void
  /** يُستدعى مع ضغط الختم (نفس إيماءة المستخدم) لبدء صوتٍ هادئ إن أمكن */
  onOpenStart?: () => void
}) {
  const [phase, setPhase] = useState<GiftPhase>('idle')

  const open = () => {
    if (phase !== 'idle') return
    onOpenStart?.()
    setPhase('lift')
    /** بعد رفع الغطاء: ظهور البطاقة ~١ث، ثم ثوانٍ قليلة للقراءة قبل الخروج */
    const liftToScrollMs = 480
    const parchmentMotionMs = 1100
    const readingHoldMs = 1400
    const exitFadeMs = 700
    window.setTimeout(() => setPhase('scroll'), liftToScrollMs)
    window.setTimeout(
      () => setPhase('exit'),
      liftToScrollMs + parchmentMotionMs + readingHoldMs,
    )
    window.setTimeout(onDone, liftToScrollMs + parchmentMotionMs + readingHoldMs + exitFadeMs)
  }

  const showParchment = phase === 'scroll' || phase === 'exit'
  const lidOpen = phase !== 'idle'
  const opening = phase !== 'idle'

  return (
    <motion.div
      className={`gift-screen${opening ? ' gift-screen--opening' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: phase === 'exit' ? 'none' : 'auto' }}
    >
      <div className="gift-screen__vignette" aria-hidden />
      <div className="gift-screen__bokeh" aria-hidden />
      <motion.div
        className="gift-ambient"
        animate={{
          opacity: showParchment ? 0.95 : 0.35,
          scale: showParchment ? 1.15 : 1,
        }}
        transition={{ duration: 0.9 }}
        aria-hidden
      />
      <Butterflies />

      <div className="gift-unit">
        <motion.div
          className="gift-box-wrap"
          animate={{
            scale: phase === 'lift' ? 1.04 : phase === 'scroll' ? 1.02 : 1,
            y: phase === 'lift' ? -6 : 0,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`gift-box${showParchment ? ' gift-box--parchment-up' : ''}`}>
            <span className="gift-ribbon gift-ribbon--vertical" aria-hidden />
            <span className="gift-ribbon gift-ribbon--horizontal" aria-hidden />
            <span className="gift-bow" aria-hidden>
              <span className="gift-bow__knot" />
            </span>

            <motion.div
              className="gift-lid"
              initial={false}
              animate={{ rotateX: lidOpen ? -118 : 0 }}
              transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <div className="gift-body">
              <div className="gift-body__texture" aria-hidden />
              <div className="gift-body__shine" aria-hidden />
            </div>

            <motion.div
              className="gift-parchment"
              initial={false}
              animate={
                showParchment
                  ? { y: '-108%', opacity: 1, filter: 'blur(0px)' }
                  : { y: '12%', opacity: 0, filter: 'blur(4px)' }
              }
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="gift-parchment__edge gift-parchment__edge--tl" aria-hidden />
              <span className="gift-parchment__edge gift-parchment__edge--tr" aria-hidden />
              <span className="gift-parchment__edge gift-parchment__edge--bl" aria-hidden />
              <span className="gift-parchment__edge gift-parchment__edge--br" aria-hidden />
              <span className="gift-parchment__glow" aria-hidden />
              <div className="gift-parchment__photo-wrap">
                <img
                  className="gift-parchment__photo"
                  src={GIFT_PARCHMENT_PHOTO}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              </div>
              <p className="gift-parchment__kicker">بكلِّ ودٍّ وتقدير</p>
              <p className="gift-parchment__title">أفراح آل القططي</p>
              <p className="gift-parchment__sub">
                <span className="gift-parchment__sub-line">دعوةُ زفافٍ</span>
                <span className="gift-parchment__sub-line">تشرّفونا بحضوركم</span>
              </p>
            </motion.div>

            <motion.button
              type="button"
              className="gift-seal"
              data-cursor-large
              onClick={open}
              aria-label="افتح الصندوق واستلم الدعوة"
              disabled={phase !== 'idle'}
              animate={
                lidOpen
                  ? { scale: 0.12, opacity: 0, y: 36, rotate: -18, filter: 'blur(2px)' }
                  : { scale: 1, opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={phase === 'idle' ? { scale: 1.06 } : {}}
              whileTap={phase === 'idle' ? { scale: 0.94 } : {}}
            >
              <span className="gift-seal__wax" aria-hidden />
              <span className="gift-seal__ring" aria-hidden />
              <span className="gift-seal__ring gift-seal__ring--inner" aria-hidden />
              <span className="gift-seal__label">م · ن</span>
            </motion.button>
          </div>
        </motion.div>
        <p className="gift-hint">
          <span className="gift-hint__ornament" aria-hidden />
          اضغط على ختم الشمع لفتح الدعوة
          <span className="gift-hint__ornament gift-hint__ornament--end" aria-hidden />
        </p>
      </div>
    </motion.div>
  )
}

/** صوت خفيف (المتصفحات لا تسمح بتشغيل تلقائي بصوت قبل تفاعل المستخدم) */
const MUSIC_VOLUME = 0.22

/** عنوان يظهر على زر الموسيقى */
const MUSIC_TRACK_LABEL = 'موسيقى الدعوة'

/**
 * ترتيب التشغيل: أول ملف يُحمَّل بنجاح يُستخدم.
 * ملفك: `public/Image/noha.mp4` (أو noha.mp3)، ثم بدائل في جذر public.
 */
const MUSIC_LOCAL_SOURCES = [
  pubImg('noha.mp4'),
  pubImg('noha.mp3'),
  `${BASE}wa-akheran.mp3`,
  `${BASE}music.mp3`,
] as const

/** احتياطي فقط إذا تعذّر كل الملفات المحلية */
const MUSIC_FALLBACKS = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
] as const

function MusicFab({ gesturePlayRef }: { gesturePlayRef: MutableRefObject<(() => Promise<void>) | null> }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const sourceIndex = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(true)

  const allSources = useMemo(() => [...MUSIC_LOCAL_SOURCES, ...MUSIC_FALLBACKS], [])

  const startPlayback = useCallback(async () => {
    const a = audioRef.current
    if (!a) return
    a.volume = MUSIC_VOLUME
    for (let i = sourceIndex.current; i < allSources.length; i++) {
      sourceIndex.current = i
      a.src = allSources[i]
      a.load()
      try {
        await a.play()
        setPlaying(true)
        setReady(true)
        return
      } catch {
        /* جرّب المصدر التالي */
      }
    }
    setReady(false)
    setPlaying(false)
  }, [allSources])

  useEffect(() => {
    gesturePlayRef.current = startPlayback
    return () => {
      gesturePlayRef.current = null
    }
  }, [gesturePlayRef, startPlayback])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const loadAt = (i: number) => {
      if (i >= allSources.length) {
        setReady(false)
        return
      }
      sourceIndex.current = i
      el.src = allSources[i]
      el.volume = MUSIC_VOLUME
      el.load()
    }

    const onError = () => {
      const next = sourceIndex.current + 1
      if (next < allSources.length) {
        loadAt(next)
      } else {
        setReady(false)
      }
    }

    const onCanPlay = () => {
      setReady(true)
    }

    el.addEventListener('error', onError)
    el.addEventListener('canplay', onCanPlay)
    loadAt(0)

    return () => {
      el.removeEventListener('error', onError)
      el.removeEventListener('canplay', onCanPlay)
    }
  }, [allSources])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
      return
    }
    await startPlayback()
  }

  const titleHint = !ready
    ? `تعذّر التحميل — ضع الملف في public/Image/noha.mp4 أو noha.mp3 (أو wa-akheran.mp3 / music.mp3 في public)`
    : playing
      ? `إيقاف: ${MUSIC_TRACK_LABEL}`
      : `تشغيل: ${MUSIC_TRACK_LABEL}`

  return (
    <>
      <audio ref={audioRef} loop playsInline preload="auto" />
      <button
        type="button"
        className={`music-fab${playing ? ' is-playing' : ''}`}
        onClick={toggle}
        data-cursor-large
        title={titleHint}
        aria-label={playing ? `إيقاف ${MUSIC_TRACK_LABEL}` : `تشغيل ${MUSIC_TRACK_LABEL}`}
        disabled={!ready}
        style={{ opacity: ready ? 1 : 0.45 }}
      >
        {playing ? '♪' : '♫'}
      </button>
    </>
  )
}

function Polaroid({
  src,
  alt,
  caption,
  mono,
  tilt,
}: {
  src: string
  alt: string
  caption: string
  mono: string
  tilt: number
}) {
  const [ok, setOk] = useState(true)
  return (
    <motion.figure
      className="polaroid"
      style={{ rotate: tilt }}
      whileHover={{ y: -10, rotate: tilt * 0.6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
    >
      <div className="polaroid__img">
        {ok ? (
          <img src={src} alt={alt} onError={() => setOk(false)} />
        ) : null}
        {!ok ? <span className="polaroid__mono">{mono}</span> : null}
      </div>
      <figcaption className="polaroid__cap">{caption}</figcaption>
    </motion.figure>
  )
}

function LoveTimeline() {
  const steps = [
    { step: '١', title: '١٨ ديسمبر ٢٠٢٥', desc: 'التعارف — وبدايةُ قصّتنا' },
    { step: '٢', title: '٢٥ ديسمبر ٢٠٢٥', desc: 'عقدُ القران — ببركة الله وتوفيقه' },
    { step: '٣', title: '٧ مايو ٢٠٢٦', desc: 'ليلةُ العمر' },
  ]
  return (
    <section className="timeline-pro" aria-labelledby="timeline-heading">
      <header className="timeline-pro__head">
        <p className="timeline-pro__eyebrow">ذكرياتُنا</p>
        <h3 className="timeline-pro__title" id="timeline-heading">
          مسارُنا نحوَ ليلةِ الفرح
        </h3>
        <p className="timeline-pro__lede">ثلاثُ محطاتٍ تروي قصةً تكتملُ بحضورِكم</p>
      </header>

      <ol className="timeline-pro__list">
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            className="timeline-pro__item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="timeline-pro__card">
              <span className="timeline-pro__badge" aria-hidden>
                {s.step}
              </span>
              <h4 className="timeline-pro__card-title">{s.title}</h4>
              <p className="timeline-pro__card-desc">{s.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

function HeroParallax() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const xMohamed = useTransform(mx, [0, 1], [18, -18])
  const yMohamed = useTransform(my, [0, 1], [12, -12])
  const xNoha = useTransform(mx, [0, 1], [-16, 16])
  const yNoha = useTransform(my, [0, 1], [-10, 10])

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.section
      className="hero-luxury hero-luxury--with-photo"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.85, delay: 0.12 }}
      style={
        {
          ['--hero-photo' as string]: `url("${COUPLE_PHOTO_TOGETHER}")`,
        } as CSSProperties
      }
    >
      <div className="hero-luxury__photo-bg" aria-hidden />
      <div className="hero-luxury__glow" aria-hidden />
      <div className="polaroid-row">
        <Polaroid
          src={COUPLE_PHOTO_GROOM}
          alt="صورة العريس"
          caption="المحاسب محمد"
          mono="م"
          tilt={-3.5}
        />
        <Polaroid
          src={COUPLE_PHOTO_BRIDE}
          alt="صورة العروس"
          caption="المهندسة نها"
          mono="ن"
          tilt={3.5}
        />
      </div>
      <h1 className="hero-title-block hero-title-block--tight">
        <motion.span className="hero-line hero-line--gold" style={{ x: xMohamed, y: yMohamed }}>
          المحاسب محمد
        </motion.span>
        <span className="hero-ampersand hero-ampersand--gold" aria-hidden>
          و
        </span>
        <motion.span className="hero-line hero-line--gold" style={{ x: xNoha, y: yNoha }}>
          المهندسة نها
        </motion.span>
      </h1>
    </motion.section>
  )
}

function MemoryGallery() {
  return (
    <div className="memory-gallery" aria-label="لقطات من رحلتنا">
      {MEMORY_GALLERY_FILES.map((name, i) => (
        <Reveal key={name} delay={0.06 + i * 0.05}>
          <div className="memory-gallery__frame">
            <img src={pubImg(name)} alt={`ذكرى ${i + 1}`} loading="lazy" decoding="async" />
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function buildIcs(): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Invite//AR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:wedding-mn-20260507@local',
    'DTSTAMP:20260101T000000Z',
    'DTSTART:20260507T180000',
    'DTEND:20260507T230000',
    'SUMMARY:حفل زفاف المحاسب محمد والمهندسة نها',
    'LOCATION:صالة رواء - فش فريس',
    'DESCRIPTION:نتشرف بحضوركم. زفاف المحاسب محمد والمهندسة نها.',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

function downloadCalendar() {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'zafaf-mohamed-noha.ics'
  a.click()
  URL.revokeObjectURL(url)
}

function App() {
  const [started, setStarted] = useState(false)
  const countdown = useCountdown(WEDDING_START)
  const startQuietMusicRef = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    if (started) document.body.classList.add('invite-revealed')
    else document.body.classList.remove('invite-revealed')
    return () => document.body.classList.remove('invite-revealed')
  }, [started])

  const googleCalUrl = useMemo(() => {
    const title = encodeURIComponent('زفاف المحاسب محمد والمهندسة نها')
    const details = encodeURIComponent('صالة رواء - فش فريس')
    const dates = '20260507T150000Z/20260507T190000Z'
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${encodeURIComponent('صالة رواء - فش فريس')}`
  }, [])

  return (
    <>
      <div className={`geo-bg ${started ? 'geo-bg--luxury' : 'geo-bg--gate'}`} aria-hidden />
      {started ? (
        <>
          <SparkleField />
          <Petals variant="gold" />
        </>
      ) : null}
      <GoldCursor />
      <MusicFab gesturePlayRef={startQuietMusicRef} />

      <AnimatePresence>
        {!started ? (
          <LuxuryGiftGate
            key="gift"
            onDone={() => setStarted(true)}
            onOpenStart={() => void startQuietMusicRef.current?.()}
          />
        ) : null}
      </AnimatePresence>

      {started ? (
        <motion.main
          className="invite-main invite-main--folio"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="invite-main__corner invite-main__corner--tl" aria-hidden />
          <span className="invite-main__corner invite-main__corner--tr" aria-hidden />
          <span className="invite-main__corner invite-main__corner--bl" aria-hidden />
          <span className="invite-main__corner invite-main__corner--br" aria-hidden />

          <section className="invite-section bismillah-first" aria-label="بسم الله الرحمن الرحيم">
            <Reveal>
              <p className="bismillah bismillah--lead bismillah--first">بسم الله الرحمن الرحيم</p>
            </Reveal>
          </section>

          <header className="family-crest">
            <Reveal>
              <div className="family-crest__monogram" aria-hidden>
                م<span className="family-crest__monogram-dot">·</span>ن
              </div>
              <div className="family-crest__inner">
                <span className="family-crest__line" aria-hidden />
                <p className="family-crest__title">أفراح آل القططي</p>
                <span className="family-crest__line" aria-hidden />
              </div>
            </Reveal>
          </header>

          <section className="invite-section verse-lead-section" aria-label="آية">
            <Reveal>
              <div className="verse-lead">
                <div className="verse-lead__inner">
                  <div className="verse-lead__rule" aria-hidden />
                  <p className="verse verse--lead">
                    وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا
                    إِلَيْهَا
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="invite-section family-block family-block--lead" aria-labelledby="parents-heading">
            <Reveal>
              <header className="invite-section__head">
                <p className="section-kicker">ببركة الوالدين</p>
                <h2 className="section-title section-title--sm" id="parents-heading">
                  يتشرف كل من بدعوتكم المباركة لحضور حفل الزفاف
                </h2>
              </header>
            </Reveal>
            <div className="family-grid">
              <Reveal delay={0.04}>
                <article className="family-card family-card--glass">
                  <p className="family-card__role">والد العريس</p>
                  <p className="family-card__name">المقدم خالد علي القططي</p>
                  <p className="family-card__hint">يُكرّمكم بحفل ابنه</p>
                </article>
              </Reveal>
              <Reveal delay={0.08}>
                <article className="family-card family-card--glass family-card--accent">
                  <p className="family-card__role">والد العروس</p>
                  <p className="family-card__name">الحاج كفاح عارف الشاعر</p>
                  <p className="family-card__hint">يُكرّمكم بحفل ابنته</p>
                </article>
              </Reveal>
            </div>
          </section>

          <section className="invite-section">
            <Reveal delay={0.06}>
              <header className="invite-section__head">
                <p className="section-kicker">بمناسبة زفافنا</p>
                <h2 className="section-title">نتشرّف بدعوتكم</h2>
                <p className="subtitle">
                  لحضور حفل زفافنا — تكتمل أفراحنا بلطف حضوركم ودعواتكم الصادقة
                </p>
              </header>
            </Reveal>
            <SectionRule />
            <Reveal delay={0.08}>
              <HeroParallax />
            </Reveal>
            <Reveal delay={0.09}>
              <MemoryGallery />
            </Reveal>
            <Reveal delay={0.1}>
              <LoveTimeline />
            </Reveal>
          </section>

          <section className="invite-section details-block" aria-labelledby="details-heading">
            <Reveal>
              <header className="invite-section__head">
                <p className="section-kicker">التفاصيل</p>
                <h2 className="section-title section-title--sm" id="details-heading">
                  أين ومتى نلتقي
                </h2>
              </header>
            </Reveal>
            <div className="cards-grid cards-grid--three">
              <Reveal>
                <TiltCard
                  label="التاريخ"
                  value="٧ مايو ٢٠٢٦"
                  sub="يوم الخميس — نتمنى أن يكون يومكم جميلاً كجمال هذه اللحظة"
                />
              </Reveal>
              <Reveal delay={0.05}>
                <TiltCard label="الوقت" value="الساعة السادسة مساءً" sub="نستقبلكم بكل حب وامتنان" />
              </Reveal>
              <Reveal delay={0.08}>
                <TiltCard
                  label="المكان"
                  value="صالة رواء — فش فريس"
                  sub="نتشرف بكم في أجواء دافئة تليق بكم"
                />
              </Reveal>
            </div>
          </section>

          <section className="invite-section">
            <Reveal>
              <div className="countdown-panel countdown-panel--glass">
                <p className="section-kicker">ننتظر اللقاء</p>
                {countdown ? (
                  <>
                    <h2 className="section-title section-title--sm">العد التنازلي للحفل</h2>
                    <div className="countdown-grid">
                      <div className="countdown-unit">
                        <div className="countdown-num">{countdown.days}</div>
                        <div className="countdown-label">يوم</div>
                      </div>
                      <div className="countdown-unit">
                        <div className="countdown-num">{countdown.hours}</div>
                        <div className="countdown-label">ساعة</div>
                      </div>
                      <div className="countdown-unit">
                        <div className="countdown-num">{countdown.minutes}</div>
                        <div className="countdown-label">دقيقة</div>
                      </div>
                      <div className="countdown-unit">
                        <div className="countdown-num">{countdown.seconds}</div>
                        <div className="countdown-label">ثانية</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="countdown-done">
                    بارك الله لكما وبارك عليكما — وجمع بينكما في خير
                  </p>
                )}
              </div>
            </Reveal>
          </section>

          <section className="invite-section">
            <Reveal>
              <div className="children-frame children-frame--glass">
                <span className="children-label">ملاحظة بخصوص الحضور</span>
                <p className="children-text">
                  نعتذر عن استقبال الأطفال، لنشارككم اللحظة بكل هدوءٍ وجمال.
                </p>
              </div>
            </Reveal>
          </section>

          <section className="invite-section invite-section--cta-foot">
            <Reveal>
              <div className="cta-panel cta-panel--glass cta-panel--compact">
                <p className="cta-panel__title cta-panel__title--compact">الموقع والتقويم</p>
                <div className="actions-row actions-row--compact">
                  <a
                    className="btn-primary btn-primary--sm"
                    href={MAP_SEARCH}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-large
                  >
                    الخريطة
                  </a>
                  <button
                    type="button"
                    className="btn-primary btn-ghost btn-primary--sm"
                    data-cursor-large
                    onClick={downloadCalendar}
                  >
                    ملف التقويم
                  </button>
                  <a
                    className="btn-primary btn-ghost btn-primary--sm"
                    href={googleCalUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-large
                  >
                    تقويم Google
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          <p className="footer-note">مع خالص المحبة والتقدير — محمد ونها</p>
        </motion.main>
      ) : null}
    </>
  )
}

function TiltCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub: string
}) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      className="info-card info-card--glass"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 960,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <p className="info-card-label">{label}</p>
      <p className="info-card-value">{value}</p>
      <p className="info-card-note">{sub}</p>
    </motion.div>
  )
}

export default App
