'use client'

import { EmojiHash, Tabs, WordHash } from '@/components'
import React, { Fragment } from 'react'

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col py-32 px-20 lg:px-72 '>
      <div className='flex flex-col items-center text-white'>
        <h1 className='font-semibold text-center lg:text-4xl'>
          Vous en avez assez d`oublier vos mots de passe 😖
        </h1>
        <h1 className='font-semibold mt-2 lg:text-3xl'> Retenez tous vos mots de passe 😃</h1>
        <h2 className='mt-10'>
          C`est extrêmement facile 😄, générez-les à partir d`une suite d`emojis de votre choix 😎
        </h2>
      </div>

      <div className='flex flex-col mt-10 bg-cyan-400 px-10 pt-0 pb-10 rounded-lg '>
        <Tabs>
          <EmojiHash />
          <WordHash />
        </Tabs>
      </div>
    </main>
  )
}
