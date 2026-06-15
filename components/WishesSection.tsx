'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Wish } from '@/lib/wishes'

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadWishes = useCallback(async () => {
    try {
      const res = await fetch('/api/wishes')
      if (!res.ok) throw new Error()
      const data: Wish[] = await res.json()
      setWishes(data)
      setError('')
    } catch {
      setError('تعذّر تحميل التهاني — حاول تحديث الصفحة')
    } finally {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    void loadWishes()
  }, [loadWishes])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const trimmedName = name.trim()
    const trimmedMsg = message.trim()
    if (!trimmedName || !trimmedMsg) return

    setLoading(true)
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, message: trimmedMsg }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'تعذّر إرسال التهنئة')
        return
      }

      setWishes((prev) => [data as Wish, ...prev])
      setName('')
      setMessage('')
      setSuccess('وصلت تهنئتك — تظهر للجميع')
    } catch {
      setError('تعذّر إرسال التهنئة — تحقق من الاتصال')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wishes invite-text-panel">
      <div className="section-head section-head--compact">
        <p className="kicker">تهانيكم</p>
        <h2 className="section-title section-title--sm">اكتب اسمك وتهنئتك للعريس والعروس</h2>
      </div>
      <p className="wishes__note">تظهر تهنئتك للجميع — العريس والعروس والمعازيم</p>

      <form className="wishes__form" onSubmit={handleSubmit}>
        <label className="wishes__field">
          <span>اسمك</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتب اسمك الكريم"
            maxLength={60}
            required
            disabled={loading}
          />
        </label>
        <label className="wishes__field">
          <span>تهنئتك</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالة تهنئة للعريس والعروس..."
            rows={4}
            maxLength={500}
            required
            disabled={loading}
          />
        </label>
        {error && <p className="wishes__feedback wishes__feedback--error">{error}</p>}
        {success && <p className="wishes__feedback wishes__feedback--success">{success}</p>}
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? 'جاري الإرسال...' : 'إرسال التهنئة'}
        </button>
      </form>

      {ready && (
        <>
          <h3 className="wishes__list-title">تهاني المعازيم</h3>
          {wishes.length === 0 ? (
            <p className="wishes__empty">كن أول من يهنّئ العريس والعروس</p>
          ) : (
            <ul className="wishes__list">
              {wishes.map((w) => (
                <li key={w.id} className="wishes__item">
                  <p className="wishes__item-name">{w.name}</p>
                  <p className="wishes__item-msg">{w.message}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
