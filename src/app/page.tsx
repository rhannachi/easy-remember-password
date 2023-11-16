'use client'

import { useState } from 'react'
import { Generator, Tabs } from '@/components'

export default function Page() {
  const [nb, setNb] = useState(1)

  return (
    <main className='flex min-h-screen flex-col py-32 px-20 lg:px-72 '>
      <div className='flex flex-col items-center text-white'>
        <h1 className='font-semibold text-center lg:text-4xl'>
          Vous en avez assez d`oublier vos mots de passe 😖
        </h1>
        <h1 className='font-semibold lg:text-3xl'> Retenez tous vos mots de passe 😃</h1>
        <h2 className='mt-10'>
          C`est extrêmement facile 😄, générez-les à partir d`une suite d`emojis de votre choix 😎
        </h2>
      </div>

      <div className='flex flex-col mt-20 bg-cyan-400 px-10 pt-0 pb-10 rounded-lg '>
        <Tabs />
        <div className='mt-10'>
          {Array.from({ length: nb }).map((_, index) => (
            <Generator key={index} />
          ))}
          <button
            className='rounded-md text-sm text-blue-600 font-semibold bg-white w-5 mt-5'
            onClick={() => setNb((item) => item + 1)}
          >
            +
          </button>
        </div>
      </div>
    </main>
  )
}
