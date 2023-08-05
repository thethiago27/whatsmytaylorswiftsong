import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { ReactNode } from 'react'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Whats My Taylor Swift Song',
  description:
    'Find out what your Taylor Swift song is based how you are feeling right now.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-indigo-950 antialiased`}>
        <h1 className="text-zinc-100 text-center py-4 font-bold text-2xl">
          Whats my Taylor Swift Song?
        </h1>
        {children}
      </body>
    </html>
  )
}
