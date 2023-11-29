import { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
      <body className='bg-[#0A2D4D]'>
        <Header />
        <main className='flex justify-center py-10 md:pt-10 lg:pt-20 px-5 md:px-44 lg:px-64 xl:px-96 '>
          <div className='container'>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
