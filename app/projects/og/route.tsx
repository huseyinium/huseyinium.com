import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Project'
  const category = searchParams.get('category') ?? ''

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
      {category && (
        <div
          style={{
            fontSize: 16,
            color: '#F97316',
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 4,
            fontFamily: 'Geist',
          }}
        >
          {category}
        </div>
      )}
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, fontFamily: 'Cal Sans' }}>
        {title}
      </div>
      <div style={{ marginTop: 32, fontSize: 20, color: '#9ca3af', fontFamily: 'Geist' }}>
        huseyinium.com
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Cal Sans', data: calSans, style: 'normal', weight: 600 }],
    }
  )
}
