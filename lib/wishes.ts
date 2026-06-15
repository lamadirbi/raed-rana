export type Wish = {
  id: string
  name: string
  message: string
  createdAt: string
}

export const WISHES_KV_KEY = 'wedding:wishes'

export function parseWish(raw: unknown): Wish | null {
  if (!raw) return null
  try {
    const w = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (
      typeof w === 'object' &&
      w !== null &&
      typeof (w as Wish).id === 'string' &&
      typeof (w as Wish).name === 'string' &&
      typeof (w as Wish).message === 'string'
    ) {
      return {
        id: (w as Wish).id,
        name: (w as Wish).name,
        message: (w as Wish).message,
        createdAt: (w as Wish).createdAt ?? new Date().toISOString(),
      }
    }
  } catch {
    /* ignore */
  }
  return null
}
