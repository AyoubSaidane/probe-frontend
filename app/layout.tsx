import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionNavBar } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Probe',
  description: 'A simple application built with Next.js and shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <SessionNavBar />
        {children}
      </body>
    </html>
  )
}
