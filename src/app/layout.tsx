import type { Metadata } from 'next'
import localFont from 'next/font/local'
import {
  NextUIProviderCSR,
  QueryClientProvider,
  ToasterProvider,
} from '@/features/shared/providers'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Neversitup Assignment TODO App',
  description: 'by Worapol Buraphan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <QueryClientProvider>
          <NextUIProviderCSR>{children}</NextUIProviderCSR>
        </QueryClientProvider>
        <ToasterProvider />
      </body>
    </html>
  )
}
