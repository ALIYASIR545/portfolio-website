import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Ali Yasir — Full-Stack Software Engineer & AI Architect',
  description: 'Portfolio of Yasir Ali Shah featuring full-stack development, machine learning platforms, and custom software engineering.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-background text-primary antialiased selection:bg-accent selection:text-background">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}