import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easy to remember and generate your password',
  description: 'Generating your password with easy-to-remember words ✍️ and emojis 😎',
  keywords: ['password generator', 'create password', 'random password', 'remember password'],
  authors: {
    name: 'Ramzi HANNACHI',
    url: 'https://github.com/rhannachi',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
