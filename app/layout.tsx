import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PageTransition } from '@/components/providers/PageTransition'
import './globals.css'
import '@/styles/mdx.css'

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huseyinium.com'

export const metadata: Metadata = {
  title: {
    default: 'Huseyin Karatas — Co-Founder, Full-Stack Engineer',
    template: '%s | Huseyin Karatas',
  },
  description:
    'Co-Founder & CEO at ARCY AI. Full-stack engineer, serial founder, and content creator based in Istanbul. Building AI agents that close the product-market fit loop.',
  keywords: [
    'Huseyin Karatas',
    'ARCY AI',
    'full-stack engineer',
    'AI founder',
    'Next.js developer',
    'React developer',
    'Istanbul developer',
    'huseyinium',
    'freelance developer Turkey',
  ],
  authors: [{ name: 'Huseyin Karatas', url: siteUrl }],
  creator: 'Huseyin Karatas',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Huseyin Karatas',
    title: 'Huseyin Karatas — Co-Founder, Full-Stack Engineer',
    description: 'Building AI agents that close the product-market fit loop.',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huseyin Karatas — Co-Founder, Full-Stack Engineer',
    description: 'Building AI agents that close the product-market fit loop.',
    images: ['/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
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
        <Analytics />
      </body>
    </html>
  )
}
