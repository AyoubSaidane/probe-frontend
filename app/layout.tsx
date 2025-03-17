import './global.css'
import type { Metadata } from 'next'
import React from "react";

export const metadata: Metadata = {
  title: 'Probe',
  description: 'Knowledge management for consultants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        {children}
      </body>
    </html>
  )
}