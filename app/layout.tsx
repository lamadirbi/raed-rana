import type { Metadata } from 'next'
import { Amiri } from 'next/font/google'
import './globals.css'

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  fallback: ['Traditional Arabic', 'Geeza Pro', 'serif'],
  variable: '--font-amiri',
})

export const metadata: Metadata = {
  title: 'أفراح آل ابو محسن و التيتي — دعوة زفاف',
  description: 'دعوة زفاف رائد يوسف ابو محسن والحكيمة رنا ناصر التيتي',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={amiri.variable}>
      <body className={amiri.className}>{children}</body>
    </html>
  )
}
