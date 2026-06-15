'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Wish } from '@/lib/wishes'
import {
  forgetOwnedWish,
  getDeleteToken,
  getOwnedWishes,
  rememberOwnedWish,
} from '@/lib/wishOwnership'

type CreateWishResponse = Wish & {
  deleteToken?: string
}

type WishesListProps = {
  wishes: Wish[]
  ownedIds: Set<string>
  deletingId: string | null
  onDelete: (id: string) => void
}

function WishesList({ wishes, ownedIds, deletingId, onDelete }: WishesListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string, canExpand: boolean) => {
    if (!canExpand) return
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <div className="wishes__viewport">
      <ul className="wishes__list">
        {wishes.map((w) => {
          const isLong = w.message.length > 85
          const isExpanded = expandedId === w.id

          return (
            <li
              key={w.id}
              className={`wishes__item${isLong ? ' wishes__item--expandable' : ''}${isExpanded ? ' wishes__item--expanded' : ''}`}
              onClick={() => toggleExpanded(w.id, isLong)}
              onKeyDown={(e) => {
                if (!isLong) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleExpanded(w.id, true)
                }
              }}
              tabIndex={isLong ? 0 : undefined}
              role={isLong ? 'button' : undefined}
              aria-expanded={isLong ? isExpanded : undefined}
            >
              <div className="wishes__item-head">
                <p className="wishes__item-name">{w.name}</p>
                {ownedIds.has(w.id) && (
                  <button
                    type="button"
                    className="wishes__delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(w.id)
                    }}
                    disabled={deletingId === w.id}
                    aria-label={`حذف تهنئة ${w.name}`}
                  >
                    {deletingId === w.id ? '...' : 'حذف'}
                  </button>
                )}
              </div>
              <p className="wishes__item-msg">{w.message}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [ownedIds, setOwnedIds] = useState<Set<string>>(() => new Set())
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const syncOwnedIds = useCallback(() => {
    setOwnedIds(new Set(getOwnedWishes().map((item) => item.id)))
  }, [])

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
    syncOwnedIds()
    void loadWishes()
  }, [loadWishes, syncOwnedIds])

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

      const data = (await res.json()) as CreateWishResponse & { error?: string }
      if (!res.ok) {
        setError(data.error ?? 'تعذّر إرسال التهنئة')
        return
      }

      const { deleteToken, ...wish } = data
      if (deleteToken) {
        rememberOwnedWish({ id: wish.id, deleteToken })
        syncOwnedIds()
      }

      setWishes((prev) => [wish, ...prev])
      setName('')
      setMessage('')
      setSuccess('وصلت تهنئتك — تظهر للجميع')
    } catch {
      setError('تعذّر إرسال التهنئة — تحقق من الاتصال')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const deleteToken = getDeleteToken(id)
    if (!deleteToken) {
      setError('يمكن حذف التهنئة من نفس الجهاز اللي أرسلت منه فقط')
      return
    }

    if (!window.confirm('متأكد إنك بدك تحذف تهنئتك؟')) return

    setDeletingId(id)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/wishes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, deleteToken }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'تعذّر حذف التهنئة')
        return
      }

      forgetOwnedWish(id)
      syncOwnedIds()
      setWishes((prev) => prev.filter((wish) => wish.id !== id))
      setSuccess('تم حذف تهنئتك')
    } catch {
      setError('تعذّر حذف التهنئة — تحقق من الاتصال')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="wishes invite-text-panel">
      <div className="section-head section-head--compact">
        <p className="kicker">تهانيكم</p>
        <h2 className="section-title section-title--sm">اكتب اسمك وتهنئتك للعريس والعروس</h2>
      </div>
      <p className="wishes__note">
        تظهر تهنئتك للجميع — يمكنك حذف رسالتك من نفس الجهاز
      </p>

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
            rows={2}
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
            <>
              <WishesList
                wishes={wishes}
                ownedIds={ownedIds}
                deletingId={deletingId}
                onDelete={handleDelete}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
