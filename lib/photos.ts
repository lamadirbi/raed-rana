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
export const GATE_PHOTO = '/images/gate-bg.jpeg'

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

/** توزيع ثابت — أعلى وأسفل الصفحة، بعيداً عن بطاقات الفعاليات */
export const SCATTER_LAYOUTS: ScatterLayout[] = [
  { top: '2%', left: '-1%', width: 100, rotate: -11, zIndex: 3, delay: 0.05 },
  { top: '2%', right: '-1%', width: 96, rotate: 9, zIndex: 3, delay: 0.12 },
  { top: '11%', left: '0%', width: 104, rotate: 7, zIndex: 4, delay: 0.18 },
  { top: '11%', right: '0%', width: 98, rotate: -8, zIndex: 4, delay: 0.22 },
  { top: '21%', left: '-1%', width: 94, rotate: 12, zIndex: 3, delay: 0.28 },
  { top: '21%', right: '-1%', width: 90, rotate: -6, zIndex: 3, delay: 0.34 },
  { top: '73%', left: '0%', width: 100, rotate: -9, zIndex: 4, delay: 0.4 },
  { top: '73%', right: '0%', width: 96, rotate: 8, zIndex: 4, delay: 0.45 },
]

/** جوال — على حواف الشاشة فوق البطاقات، بعيداً عن نص الفعاليات */
export const SCATTER_LAYOUTS_MOBILE: ScatterLayout[] = [
  { top: '1%', left: '-6%', width: 62, rotate: -11, zIndex: 4, delay: 0.05 },
  { top: '1%', right: '-6%', width: 62, rotate: 11, zIndex: 4, delay: 0.08 },
  { top: '9%', left: '-5%', width: 66, rotate: 8, zIndex: 5, delay: 0.12 },
  { top: '9%', right: '-5%', width: 66, rotate: -8, zIndex: 5, delay: 0.15 },
  { top: '17%', left: '-6%', width: 64, rotate: -9, zIndex: 4, delay: 0.2 },
  { top: '17%', right: '-6%', width: 64, rotate: 9, zIndex: 4, delay: 0.23 },
  { top: '78%', left: '-5%', width: 62, rotate: -10, zIndex: 5, delay: 0.28 },
  { top: '78%', right: '-5%', width: 62, rotate: 10, zIndex: 5, delay: 0.31 },
]

export const SCATTER_PHOTOS = WEDDING_PHOTOS

export const SCATTER_PHOTOS_MOBILE = WEDDING_PHOTOS
