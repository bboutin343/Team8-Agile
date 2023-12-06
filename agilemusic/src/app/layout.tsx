import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {cookies} from 'next/headers'
import { CookiesProvider } from 'next-client-cookies/server'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web Music Player',
  description: 'An accessible web player',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CookiesProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </CookiesProvider>
  )
}
