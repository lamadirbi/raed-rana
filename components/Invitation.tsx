'use client'

import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  FAMILY_TITLE,
  GROOM_FATHER,
  GROOM_NAME,
  BRIDE_FATHER,
  BRIDE_NAME,
  WEDDING_DATE,
  WEDDING,
  HENNA,
  GROOM_PARTY,
  GROOM_BANK_JOKE,
} from '@/lib/constants'
import Countdown from './Countdown'
import WishesSection from './WishesSection'
import EventCard from './EventCard'
import ScatterPhotos from './ScatterPhotos'
import FallingPetals from './FallingPetals'
import { buildIcs, downloadIcs, groomPartyGoogleCal, hennaGoogleCal, weddingGoogleCal } from '@/lib/calendar'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Invitation() {
  useEffect(() => {
    document.body.classList.add('invite-revealed')
    return () => document.body.classList.remove('invite-revealed')
  }, [])

  const weddingCal = useMemo(() => weddingGoogleCal(), [])
  const hennaCal = useMemo(() => hennaGoogleCal(), [])
  const groomPartyCal = useMemo(() => groomPartyGoogleCal(), [])

  const downloadWeddingIcs = () => {
    downloadIcs(
      'zafaf-raed-rana.ics',
      buildIcs(
        'wedding-raed-rana@local',
        `زفاف ${GROOM_NAME} و ${BRIDE_NAME}`,
        new Date(2026, 5, 26, 18, 0, 0),
        new Date(2026, 5, 26, 23, 0, 0),
        WEDDING.fullAddress,
        `دعوة زفاف ${GROOM_NAME} و ${BRIDE_NAME}`,
      ),
    )
  }

  const downloadHennaIcs = () => {
    downloadIcs(
      'henna-raed-rana.ics',
      buildIcs(
        'henna-raed-rana@local',
        `حنة ${GROOM_NAME} و ${BRIDE_NAME}`,
        new Date(2026, 5, 25, 17, 0, 0),
        new Date(2026, 5, 25, 21, 0, 0),
        HENNA.fullAddress,
        `حفل الحنة — ${HENNA.fullAddress}`,
      ),
    )
  }

  const downloadGroomPartyIcs = () => {
    downloadIcs(
      'groom-party-raed.ics',
      buildIcs(
        'groom-party-raed@local',
        `حفلة شباب ${GROOM_NAME}`,
        new Date(2026, 5, 25, 21, 0, 0),
        new Date(2026, 5, 26, 1, 0, 0),
        GROOM_PARTY.fullAddress,
        `حفلة الشباب — ${GROOM_PARTY.artists} — ${GROOM_PARTY.fullAddress}`,
      ),
    )
  }

  return (
    <motion.main
      className="invite invite--with-photos"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <FallingPetals />
      <ScatterPhotos />
      <span className="invite__corner invite__corner--tl" aria-hidden />
      <span className="invite__corner invite__corner--tr" aria-hidden />
      <span className="invite__corner invite__corner--bl" aria-hidden />
      <span className="invite__corner invite__corner--br" aria-hidden />

      <Reveal>
        <p className="bismillah invite-text-panel">بسم الله الرحمن الرحيم</p>
      </Reveal>

      <header className="crest invite-text-panel">
        <Reveal delay={0.05}>
          <div className="crest__title-wrap">
            <span className="crest__line" aria-hidden />
            <h1 className="crest__title">{FAMILY_TITLE}</h1>
            <span className="crest__line" aria-hidden />
          </div>
        </Reveal>
      </header>

      <Reveal delay={0.08}>
        <blockquote className="verse invite-text-panel">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
        </blockquote>
      </Reveal>

      <section className="section" aria-labelledby="invite-heading">
        <Reveal>
          <div className="section-head invite-text-panel">
            <p className="kicker">ببركة الوالدين</p>
            <h2 className="section-title" id="invite-heading">
              يتشرف كل من
            </h2>
          </div>
        </Reveal>

        <div className="parents-grid">
          <Reveal delay={0.05}>
            <article className="parent-card">
              <div className="parent-card__parent-block">
                <p className="parent-card__role">والد العريس</p>
                <p className="parent-card__name">{GROOM_FATHER}</p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="parent-card parent-card--accent">
              <div className="parent-card__parent-block">
                <p className="parent-card__role">والد العروس</p>
                <p className="parent-card__name">{BRIDE_FATHER}</p>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <p className="invite-bridge invite-text-panel">لحضور حفل زفاف</p>
        </Reveal>

        <div className="parents-grid parents-grid--couple">
          <Reveal delay={0.14}>
            <article className="parent-card parent-card--couple">
              <div className="parent-card__child-block">
                <p className="parent-card__child-title">نجله</p>
                <p className="parent-card__child-name">{GROOM_NAME}</p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article className="parent-card parent-card--couple parent-card--accent">
              <div className="parent-card__child-block">
                <p className="parent-card__child-title">اميرته</p>
                <p className="parent-card__child-name">{BRIDE_NAME}</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="section-head invite-text-panel">
            <p className="kicker">تفاصيل الاحتفال</p>
            <h2 className="section-title section-title--sm">مواعيد الفرح والحنة وحفلة الشباب</h2>
          </div>
        </Reveal>
        <div className="events-stack">
          <div className="events-grid">
            <Reveal delay={0.05}>
              <EventCard
                type="henna"
                title="حفل الحنة"
                date={HENNA.dateLabel}
                day={HENNA.day}
                time={HENNA.time}
                venue={HENNA.venue}
                googleCalUrl={hennaCal}
                onDownloadIcs={downloadHennaIcs}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <EventCard
                type="wedding"
                title="حفل الزفاف"
                date={WEDDING.dateLabel}
                day={WEDDING.day}
                time={WEDDING.time}
                venue={WEDDING.venue}
                location={WEDDING.location}
                googleCalUrl={weddingCal}
                onDownloadIcs={downloadWeddingIcs}
                highlight
              />
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="events-stack__full">
              <EventCard
                type="groom-party"
                title="حفلة الشباب"
                date={GROOM_PARTY.dateLabel}
                day={GROOM_PARTY.day}
                time={GROOM_PARTY.time}
                venue={GROOM_PARTY.venue}
                location={GROOM_PARTY.location}
                artists={GROOM_PARTY.artists}
                googleCalUrl={groomPartyCal}
                onDownloadIcs={downloadGroomPartyIcs}
                wide
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <Countdown target={WEDDING_DATE} />
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <WishesSection />
        </Reveal>
      </section>

      <footer className="invite-footer invite-text-panel">
        <p>رائد ورنا</p>
      </footer>

      <p className="invite-joke">
        <span className="invite-joke__dots" aria-hidden>· · ·</span>
        <span className="invite-joke__tag">دعابة فقط — مو إلزام 😄</span>
        لو حابّين تهنّوا العريس، حسابه في {GROOM_BANK_JOKE.bank}:
        <strong className="invite-joke__num">{GROOM_BANK_JOKE.account}</strong>
        <span className="invite-joke__fine">(الحضور أهم من التحويل، والله يباركلكم)</span>
      </p>
    </motion.main>
  )
}
