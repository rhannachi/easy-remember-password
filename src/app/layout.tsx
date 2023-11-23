import { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Easy to remember and generate your password',
  description: 'Generating your password with easy-to-remember words ✍️ and emojis 😎',
  keywords: ['password generator', 'create password', 'random password', 'remember password'],
  authors: {
    name: 'Ramzi HANNACHI',
    url: 'https://github.com/rhannachi',
  },
  verification: {
    google: 'OrNATZOfBihihC6heKex1V59W6pB-6onIt5anbcZc4M',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
