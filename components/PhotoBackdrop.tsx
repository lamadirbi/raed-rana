import { PAGE_BACKDROPS } from '@/lib/photos'

export default function PhotoBackdrop({ variant }: { variant: 'gate' | 'invite' }) {
  const photos = variant === 'gate' ? [PAGE_BACKDROPS[0]] : PAGE_BACKDROPS

  return (
    <div className={`photo-backdrop photo-backdrop--${variant}`} aria-hidden>
      {photos.map((src, i) => (
        <div
          key={src}
          className="photo-backdrop__layer"
          style={{ backgroundImage: `url("${src}")`, ['--layer-i' as string]: i }}
        />
      ))}
    </div>
  )
}
