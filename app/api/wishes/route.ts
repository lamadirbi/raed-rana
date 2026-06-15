import { NextResponse } from 'next/server'
import { getKv } from '@/lib/kv'
import {
  parseWish,
  serializeWish,
  toPublicWish,
  WISHES_KV_KEY,
  type StoredWish,
  type Wish,
} from '@/lib/wishes'

export const dynamic = 'force-dynamic'

async function getWishes(): Promise<Wish[]> {
  const kv = getKv()
  if (!kv) return []

  const raw = (await kv.lrange(WISHES_KV_KEY, 0, -1)) ?? []
  return raw
    .map(parseWish)
    .filter((w): w is StoredWish => w !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(toPublicWish)
}

async function findStoredWish(id: string): Promise<{ raw: string; wish: StoredWish } | null> {
  const kv = getKv()
  if (!kv) return null

  const raw = (await kv.lrange(WISHES_KV_KEY, 0, -1)) ?? []
  for (const entry of raw) {
    const wish = parseWish(entry)
    if (wish?.id === id) {
      return { raw: typeof entry === 'string' ? entry : serializeWish(wish), wish }
    }
  }

  return null
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

    const wish: StoredWish = {
      id: crypto.randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
      deleteToken: crypto.randomUUID(),
    }

    await kv.lpush(WISHES_KV_KEY, serializeWish(wish))
    return NextResponse.json(
      { ...toPublicWish(wish), deleteToken: wish.deleteToken },
      { status: 201 },
    )
  } catch {
    return NextResponse.json({ error: 'تعذّر إرسال التهنئة' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const kv = getKv()
    if (!kv) {
      return NextResponse.json({ error: 'التخزين غير مفعّل بعد' }, { status: 503 })
    }

    const body = await request.json()
    const id = String(body.id ?? '').trim()
    const deleteToken = String(body.deleteToken ?? '').trim()

    if (!id || !deleteToken) {
      return NextResponse.json({ error: 'بيانات الحذف غير مكتملة' }, { status: 400 })
    }

    const found = await findStoredWish(id)
    if (!found) {
      return NextResponse.json({ error: 'التّهنئة غير موجودة' }, { status: 404 })
    }

    if (!found.wish.deleteToken || found.wish.deleteToken !== deleteToken) {
      return NextResponse.json({ error: 'لا يمكن حذف هذه التهنئة' }, { status: 403 })
    }

    await kv.lrem(WISHES_KV_KEY, 1, found.raw)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'تعذّر حذف التهنئة' }, { status: 500 })
  }
}
