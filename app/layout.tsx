import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PageTransition } from '@/components/providers/PageTransition'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const calSans = localFont({
  src: '../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Huseyin Karatas — Co-Founder & Full-Stack Engineer',
  description:
    'Portfolio of Huseyin Karatas — Co-Founder & CEO at ARCY AI, full-stack engineer, serial founder, and content creator.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huseyinium.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${calSans.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CustomCursor />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
