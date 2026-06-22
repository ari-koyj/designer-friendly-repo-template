import type { Metadata } from 'next'
import { Noto_Sans_JP, Inter } from 'next/font/google'
import '@/shared/styles/globals.css'
import { QueryProvider } from '@/features/todos/hooks/QueryProvider'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp'
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Matter Management | design-work template',
  description: 'design-as-code 案件管理システム'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable}`}>
      <body className="bg-surface-muted font-sans text-foreground antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
