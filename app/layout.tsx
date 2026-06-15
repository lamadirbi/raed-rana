import type { Metadata } from 'next'
import { Amiri, Reem_Kufi } from 'next/font/google'
import './globals.css'

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

const reemKufi = Reem_Kufi({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-reem',
})

export const metadata: Metadata = {
  title: 'أفراح آل ابو محسن و التيتي — دعوة زفاف',
  description: 'دعوة زفاف رائد يوسف ابو محسن والحكيمة رنا ناصر التيتي',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${amiri.variable} ${reemKufi.variable}`}>{children}</body>
    </html>
  )
}
