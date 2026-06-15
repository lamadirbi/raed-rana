import { createClient, type VercelKV } from '@vercel/kv'

let client: VercelKV | null | undefined

export function getKv(): VercelKV | null {
  if (client !== undefined) return client

  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    client = null
    return null
  }

  client = createClient({ url, token })
  return client
}
