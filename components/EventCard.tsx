type EventCardProps = {
  type: 'wedding' | 'henna' | 'groom-party'
  title: string
  date: string
  day: string
  time: string
  venue: string
  location?: string
  artists?: string
  googleCalUrl: string
  onDownloadIcs: () => void
  highlight?: boolean
  wide?: boolean
}

const BADGE_LABELS: Record<EventCardProps['type'], string> = {
  wedding: 'الفرح',
  henna: 'الحنة',
  'groom-party': 'للعريس',
}

export default function EventCard({
  type,
  title,
  date,
  day,
  time,
  venue,
  location,
  artists,
  googleCalUrl,
  onDownloadIcs,
  highlight,
  wide,
}: EventCardProps) {
  const badge = BADGE_LABELS[type]

  return (
    <article
      className={`event-card event-card--${type}${highlight ? ' event-card--highlight' : ''}${wide ? ' event-card--wide' : ''}`}
    >
      <span className="event-card__glow" aria-hidden />
      <span className="event-card__corner event-card__corner--tl" aria-hidden />
      <span className="event-card__corner event-card__corner--br" aria-hidden />

      <header className="event-card__head">
        <span className="event-card__badge">{badge}</span>
        <h3 className="event-card__title">{title}</h3>
        <div className="event-card__rule" aria-hidden>
          <span />
          <span className="event-card__rule-gem" />
          <span />
        </div>
      </header>

      <div className="event-card__date-block">
        <p className="event-card__date">{date}</p>
        <p className="event-card__day">{day}</p>
      </div>

      <div className="event-card__meta">
        <div className="event-card__meta-item">
          <span className="event-card__meta-icon" aria-hidden>◷</span>
          <div className="event-card__meta-body">
            <span className="event-card__meta-label">الوقت</span>
            <span className="event-card__meta-value">{time}</span>
          </div>
        </div>
        <div className="event-card__meta-item event-card__meta-item--venue">
          <span className="event-card__meta-icon" aria-hidden>⌖</span>
          <div className="event-card__meta-body">
            <span className="event-card__meta-label">المكان</span>
            <span className="event-card__meta-value">
              {venue}
              {location ? ` — ${location}` : ''}
            </span>
          </div>
        </div>
        {artists && (
          <div className="event-card__meta-item">
            <span className="event-card__meta-icon" aria-hidden>♫</span>
            <div className="event-card__meta-body">
              <span className="event-card__meta-label">الفنانون</span>
              <span className="event-card__meta-value">{artists}</span>
            </div>
          </div>
        )}
      </div>

      <footer className="event-card__actions">
        <div className="event-card__actions-row event-card__actions-row--full">
          <a className="event-card__btn event-card__btn--ghost" href={googleCalUrl} target="_blank" rel="noreferrer">
            Google Calendar
          </a>
          <button type="button" className="event-card__btn event-card__btn--ghost" onClick={onDownloadIcs}>
            ملف التقويم
          </button>
        </div>
      </footer>
    </article>
  )
}
