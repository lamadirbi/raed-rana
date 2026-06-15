import { GROOM_NAME, BRIDE_NAME, WEDDING, HENNA, GROOM_PARTY } from './constants'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toGoogleDate(d: Date) {
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}00`
  )
}

export function googleCalendarUrl(
  title: string,
  start: Date,
  end: Date,
  location: string,
  details: string,
) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toGoogleDate(start)}/${toGoogleDate(end)}`,
    details,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function weddingGoogleCal() {
  const start = new Date(2026, 5, 26, 18, 0, 0)
  const end = new Date(2026, 5, 26, 23, 0, 0)
  return googleCalendarUrl(
    `زفاف ${GROOM_NAME} و ${BRIDE_NAME}`,
    start,
    end,
    WEDDING.fullAddress,
    `دعوة زفاف ${GROOM_NAME} و ${BRIDE_NAME} — ${WEDDING.fullAddress}`,
  )
}

export function hennaGoogleCal() {
  const start = new Date(2026, 5, 25, 17, 0, 0)
  const end = new Date(2026, 5, 25, 21, 0, 0)
  return googleCalendarUrl(
    `حنة ${GROOM_NAME} و ${BRIDE_NAME}`,
    start,
    end,
    HENNA.fullAddress,
    `حفل الحنة — ${HENNA.fullAddress}`,
  )
}

export function groomPartyGoogleCal() {
  const start = new Date(2026, 5, 25, 21, 0, 0)
  const end = new Date(2026, 5, 26, 1, 0, 0)
  return googleCalendarUrl(
    `حفلة شباب ${GROOM_NAME}`,
    start,
    end,
    GROOM_PARTY.fullAddress,
    `حفلة الشباب للعريس — ${GROOM_PARTY.artists} — ${GROOM_PARTY.fullAddress}`,
  )
}

type IcsEvent = {
  uid: string
  title: string
  start: Date
  end: Date
  location: string
  description: string
}

function fmtIcsDate(d: Date) {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
}

function buildIcsEvent(event: IcsEvent) {
  return [
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    'DTSTAMP:20260101T000000Z',
    `DTSTART:${fmtIcsDate(event.start)}`,
    `DTEND:${fmtIcsDate(event.end)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description}`,
    'END:VEVENT',
  ].join('\r\n')
}

export function buildIcs(
  uid: string,
  title: string,
  start: Date,
  end: Date,
  location: string,
  description: string,
) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WeddingInvite//AR',
    'CALSCALE:GREGORIAN',
    buildIcsEvent({ uid, title, start, end, location, description }),
    'END:VCALENDAR',
  ].join('\r\n')
}

export function buildAllEventsIcs() {
  const events: IcsEvent[] = [
    {
      uid: 'henna-raed-rana@local',
      title: `حنة ${GROOM_NAME} و ${BRIDE_NAME}`,
      start: new Date(2026, 5, 25, 17, 0, 0),
      end: new Date(2026, 5, 25, 21, 0, 0),
      location: HENNA.fullAddress,
      description: `حفل الحنة — ${HENNA.fullAddress}`,
    },
    {
      uid: 'groom-party-raed@local',
      title: `حفلة شباب ${GROOM_NAME}`,
      start: new Date(2026, 5, 25, 21, 0, 0),
      end: new Date(2026, 5, 26, 1, 0, 0),
      location: GROOM_PARTY.fullAddress,
      description: `حفلة الشباب — ${GROOM_PARTY.artists} — ${GROOM_PARTY.fullAddress}`,
    },
    {
      uid: 'wedding-raed-rana@local',
      title: `زفاف ${GROOM_NAME} و ${BRIDE_NAME}`,
      start: new Date(2026, 5, 26, 18, 0, 0),
      end: new Date(2026, 5, 26, 23, 0, 0),
      location: WEDDING.fullAddress,
      description: `دعوة زفاف ${GROOM_NAME} و ${BRIDE_NAME}`,
    },
  ]

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WeddingInvite//AR',
    'CALSCALE:GREGORIAN',
    ...events.map(buildIcsEvent),
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadAllEventsIcs() {
  downloadIcs('moaid-zafaf-raed-rana.ics', buildAllEventsIcs())
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function mapUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
