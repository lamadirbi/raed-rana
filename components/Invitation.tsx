'use client'

import { useEffect } from 'react'
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
import SectionScatter from './SectionScatter'
import FallingPetals from './FallingPetals'
import { WEDDING_PHOTOS } from '@/lib/photos'
import { downloadAllEventsIcs } from '@/lib/calendar'

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

  return (
    <motion.main
      className="invite invite--with-photos"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <FallingPetals />
      <span className="invite__corner invite__corner--tl" aria-hidden />
      <span className="invite__corner invite__corner--tr" aria-hidden />
      <span className="invite__corner invite__corner--bl" aria-hidden />
      <span className="invite__corner invite__corner--br" aria-hidden />

      <div className="invite-block invite-block--intro">
        <div className="intro-photos-stage">
          <SectionScatter photos={[WEDDING_PHOTOS[0], WEDDING_PHOTOS[1]]} variant="top" />
          <Reveal>
            <p className="bismillah intro-photos-stage__bismillah">بسم الله الرحمن الرحيم</p>
          </Reveal>
        </div>
        <header className="crest invite-text-panel crest--after-photos">
          <Reveal delay={0.05}>
            <div className="crest__title-wrap">
              <span className="crest__line" aria-hidden />
              <h1 className="crest__title">{FAMILY_TITLE}</h1>
              <span className="crest__line" aria-hidden />
            </div>
          </Reveal>
        </header>
      </div>

      <Reveal delay={0.08}>
        <blockquote className="verse invite-text-panel">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
        </blockquote>
      </Reveal>

      <section className="section section--parents" aria-labelledby="invite-heading">
        <div className="invite-block invite-block--honor">
          <Reveal delay={0.12}>
            <h2 className="section-title honor-title invite-text-panel" id="invite-heading">
              يتشرف كل من
            </h2>
          </Reveal>
        </div>

        <div className="parents-grid parents-grid--parents">
          <Reveal delay={0.12}>
            <article className="parent-card">
              <div className="parent-card__parent-block">
                <p className="parent-card__role">والد العريس</p>
                <p className="parent-card__name">{GROOM_FATHER}</p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.14}>
            <article className="parent-card parent-card--accent">
              <div className="parent-card__parent-block">
                <p className="parent-card__role">والد العروس</p>
                <p className="parent-card__name">{BRIDE_FATHER}</p>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="invite-block invite-block--bridge">
          <SectionScatter photos={[WEDDING_PHOTOS[4], WEDDING_PHOTOS[5]]} variant="bridge" />
          <Reveal delay={0.16}>
            <p className="invite-bridge invite-text-panel">لحضور حفل زفاف</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--couple-hero" aria-label="العريس والعروس">
        <div className="parents-grid parents-grid--couple parents-grid--couple-hero">
          <Reveal delay={0.18}>
            <article className="parent-card parent-card--couple">
              <div className="parent-card__child-block">
                <p className="parent-card__child-title">نجله</p>
                <p className="parent-card__child-name">{GROOM_NAME}</p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.2}>
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
                location={HENNA.location}
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
                wide
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="events-calendar-all">
              <button type="button" className="btn btn--primary events-calendar-all__btn" onClick={downloadAllEventsIcs}>
                أضف كل المواعيد للتقويم
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="invite-block invite-block--countdown">
        <SectionScatter photos={[WEDDING_PHOTOS[6], WEDDING_PHOTOS[7]]} variant="countdown" />
        <section className="section section--countdown">
          <Reveal>
            <Countdown target={WEDDING_DATE} />
          </Reveal>
        </section>
      </div>

      <section className="section">
        <Reveal>
          <WishesSection />
        </Reveal>
      </section>

      <div className="invite-block invite-block--footer">
        <div className="footer-photos-stage">
          <SectionScatter photos={[WEDDING_PHOTOS[2], WEDDING_PHOTOS[3]]} variant="footer" />
          <footer className="invite-footer footer-photos-stage__label">
            <p>رائد ورنا</p>
          </footer>
        </div>
      </div>

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
