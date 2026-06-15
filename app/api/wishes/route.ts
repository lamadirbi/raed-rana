import { NextResponse } from 'next/server'
import { getKv } from '@/lib/kv'
import { parseWish, WISHES_KV_KEY, type Wish } from '@/lib/wishes'

export const dynamic = 'force-dynamic'

async function getWishes(): Promise<Wish[]> {
  const kv = getKv()
  if (!kv) return []

  const raw = (await kv.lrange(WISHES_KV_KEY, 0, -1)) ?? []
  return raw
    .map(parseWish)
    .filter((w): w is Wish => w !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function GET() {
  try {
    const wishes = await getWishes()
    return NextResponse.json(wishes)
  } catch {
    return NextResponse.json({ error: 'تعذّر جلب التهاني' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const kv = getKv()
    if (!kv) {
      return NextResponse.json(
        { error: 'التخزين غير مفعّل بعد — أضف Vercel KV عند النشر' },
        { status: 503 },
      )
    }

    const body = await request.json()
    const name = String(body.name ?? '').trim().slice(0, 60)
    const message = String(body.message ?? '').trim().slice(0, 500)

    if (!name || !message) {
      return NextResponse.json({ error: 'الاسم والرسالة مطلوبان' }, { status: 400 })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const rateKey = `wishes:rate:${ip}`
    const count = await kv.incr(rateKey)
    if (count === 1) await kv.expire(rateKey, 3600)
    if (count > 5) {
      return NextResponse.json({ error: 'أرسلت عدة تهاني — حاول بعد ساعة' }, { status: 429 })
    }

    const wish: Wish = {
      id: crypto.randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
    }

    await kv.lpush(WISHES_KV_KEY, JSON.stringify(wish))
    return NextResponse.json(wish, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'تعذّر إرسال التهنئة' }, { status: 500 })
  }
}
