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

export function buildIcs(
  uid: string,
  title: string,
  start: Date,
  end: Date,
  location: string,
  description: string,
) {
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WeddingInvite//AR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    'DTSTAMP:20260101T000000Z',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
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
