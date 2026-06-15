/** صور العرسان — من public/images/ */
export const WEDDING_PHOTOS = [
  '/images/photo-01.jpeg',
  '/images/photo-02.jpeg',
  '/images/photo-03.jpeg',
  '/images/photo-04.jpeg',
  '/images/photo-05.jpeg',
  '/images/photo-06.jpeg',
  '/images/photo-07.jpeg',
  '/images/photo-08.jpeg',
] as const

/** صورة شاشة الظرف والختم */
export const GATE_PHOTO = WEDDING_PHOTOS[4]

/** خلفيات خفيفة للصفحة */
export const PAGE_BACKDROPS = [WEDDING_PHOTOS[0], WEDDING_PHOTOS[2], WEDDING_PHOTOS[6]]

export type ScatterLayout = {
  top: string
  left?: string
  right?: string
  width: number
  rotate: number
  zIndex: number
  delay: number
}

/** توزيع ثابت — شاشات عريضة */
export const SCATTER_LAYOUTS: ScatterLayout[] = [
  { top: '2%', left: '1%', width: 108, rotate: -11, zIndex: 1, delay: 0.05 },
  { top: '14%', right: '0%', width: 96, rotate: 9, zIndex: 1, delay: 0.12 },
  { top: '28%', left: '3%', width: 112, rotate: 7, zIndex: 2, delay: 0.18 },
  { top: '42%', right: '2%', width: 100, rotate: -8, zIndex: 2, delay: 0.22 },
  { top: '56%', left: '0%', width: 94, rotate: 12, zIndex: 1, delay: 0.28 },
  { top: '68%', right: '1%', width: 110, rotate: -6, zIndex: 2, delay: 0.34 },
  { top: '80%', left: '4%', width: 98, rotate: 5, zIndex: 1, delay: 0.4 },
]

/** توزيع للجوالات — على الجانبين داخل الشاشة */
export const SCATTER_LAYOUTS_MOBILE: ScatterLayout[] = [
  { top: '1%', left: '0%', width: 96, rotate: -9, zIndex: 1, delay: 0.05 },
  { top: '1%', right: '0%', width: 96, rotate: 9, zIndex: 1, delay: 0.08 },
  { top: '16%', left: '0%', width: 102, rotate: 8, zIndex: 2, delay: 0.12 },
  { top: '16%', right: '0%', width: 102, rotate: -8, zIndex: 2, delay: 0.15 },
  { top: '36%', left: '0%', width: 94, rotate: -7, zIndex: 1, delay: 0.2 },
  { top: '36%', right: '0%', width: 94, rotate: 7, zIndex: 1, delay: 0.23 },
  { top: '58%', left: '0%', width: 100, rotate: 10, zIndex: 2, delay: 0.28 },
  { top: '58%', right: '0%', width: 100, rotate: -10, zIndex: 2, delay: 0.31 },
]

export const SCATTER_PHOTOS = WEDDING_PHOTOS

export const SCATTER_PHOTOS_MOBILE = WEDDING_PHOTOS
