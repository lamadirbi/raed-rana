'use client'

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'

const MUSIC_VOLUME = 0.28
const MUSIC_SRC = '/noha.mp4'

type MusicPlayerProps = {
  playRef: MutableRefObject<(() => Promise<void>) | null>
}

export default function MusicPlayer({ playRef }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(true)

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.src || !audio.src.endsWith(MUSIC_SRC)) {
      audio.src = MUSIC_SRC
      audio.volume = MUSIC_VOLUME
      audio.load()
    }

    try {
      await audio.play()
      setPlaying(true)
      setReady(true)
    } catch {
      setReady(false)
      setPlaying(false)
    }
  }, [])

  useEffect(() => {
    playRef.current = startPlayback
    return () => {
      playRef.current = null
    }
  }, [playRef, startPlayback])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    await startPlayback()
  }

  return (
    <>
      <audio ref={audioRef} loop playsInline preload="none" />
      <button
        type="button"
        className={`music-fab${playing ? ' is-playing' : ''}`}
        onClick={toggle}
        title={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
        aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
        style={{ opacity: ready ? 1 : 0.45 }}
      >
        {playing ? '♪' : '♫'}
      </button>
    </>
  )
}
