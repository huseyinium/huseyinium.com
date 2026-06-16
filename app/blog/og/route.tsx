import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Blog'
  const date = searchParams.get('date') ?? ''

  const calSans = await fetch(
    new URL('../../../public/fonts/CalSans-SemiBold.woff2', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        padding: '64px',
        background: '#0a0a0a',
        color: '#f5f5f5',
        fontFamily: 'Geist',
      }}
    >
      <div
        style={{
          fontSize: 14,
          color: '#B8E04A',
          letterSpacing: 4,
          textTransform: 'uppercase',
          marginBottom: 20,
          fontFamily: 'Geist',
        }}
      >
        huseyinium.com / blog
      </div>
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: 24,
          fontFamily: 'Cal Sans',
        }}
      >
        {title}
      </div>
      {date && <div style={{ fontSize: 18, color: '#9ca3af', fontFamily: 'Geist' }}>{date}</div>}
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Cal Sans', data: calSans, style: 'normal', weight: 600 }],
    }
  )
}
