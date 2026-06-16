import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Project'
  const category = searchParams.get('category') ?? ''

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
        fontFamily: 'sans-serif',
      }}
    >
      {category && (
        <div
          style={{
            fontSize: 16,
            color: '#B8E04A',
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 4,
          }}
        >
          {category}
        </div>
      )}
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
      <div style={{ marginTop: 32, fontSize: 20, color: '#9ca3af' }}>huseyinium.com</div>
    </div>,
    { width: 1200, height: 630 }
  )
}
