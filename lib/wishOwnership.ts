const STORAGE_KEY = 'wedding:wish-tokens'

export type OwnedWish = {
  id: string
  deleteToken: string
}

export function getOwnedWishes(): OwnedWish[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item): item is OwnedWish =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as OwnedWish).id === 'string' &&
        typeof (item as OwnedWish).deleteToken === 'string',
    )
  } catch {
    return []
  }
}

export function rememberOwnedWish(wish: OwnedWish) {
  const next = getOwnedWishes().filter((item) => item.id !== wish.id)
  next.push(wish)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function forgetOwnedWish(id: string) {
  const next = getOwnedWishes().filter((item) => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function getDeleteToken(id: string): string | null {
  return getOwnedWishes().find((item) => item.id === id)?.deleteToken ?? null
}
