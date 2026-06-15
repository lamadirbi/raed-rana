'use client'

import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import WaxSealGate from '@/components/WaxSealGate'
import Invitation from '@/components/Invitation'
import MusicPlayer from '@/components/MusicPlayer'
import PhotoBackdrop from '@/components/PhotoBackdrop'
export default function HomePage() {
  const [opened, setOpened] = useState(false)
  const playMusicRef = useRef<(() => Promise<void>) | null>(null)

  return (
    <>
      <div className={`geo-bg ${opened ? 'geo-bg--revealed' : 'geo-bg--gate'}`} aria-hidden />
      <PhotoBackdrop variant={opened ? 'invite' : 'gate'} />
      <MusicPlayer playRef={playMusicRef} />
      <AnimatePresence>
        {!opened && (
          <WaxSealGate
            key="gate"
            onOpen={() => setOpened(true)}
            onOpenStart={() => void playMusicRef.current?.()}
          />
        )}
      </AnimatePresence>
      {opened && <Invitation />}
    </>
  )
}
