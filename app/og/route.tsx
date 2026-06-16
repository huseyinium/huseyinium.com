import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET() {
  const calSans = await fetch(
    new URL('../../public/fonts/CalSans-SemiBold.woff2', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        padding: '80px',
        background: '#0a0a0a',
        color: '#f5f5f5',
        fontFamily: 'Cal Sans',
      }}
    >
      <div
        style={{
          width: 48,
          height: 4,
          background: '#B8E04A',
          marginBottom: 32,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 24,
          fontFamily: 'Cal Sans',
        }}
      >
        Huseyin Karatas
      </div>
      <div style={{ fontSize: 24, color: '#9ca3af', lineHeight: 1.5, fontFamily: 'Geist' }}>
        Co-Founder & Full-Stack Engineer
      </div>
      <div
        style={{
          marginTop: 48,
          fontSize: 16,
          color: '#B8E04A',
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontFamily: 'Geist',
        }}
      >
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
