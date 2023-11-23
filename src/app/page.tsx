'use client'

import { WordHash } from '@/components'

export default function Page() {
  return (
    <main className='flex flex-col items-center py-10 md:pt-10 lg:pt-20 px-5 md:px-44 lg:px-64 xl:px-96 '>
      <div className='container'>
        <div className='flex flex-col items-center text-white'>
          <h1 className='font-semibold text-center text-3xl md:text-4xl lg:text-5xl lg:leading-snug'>
            Easy to remember and generate your password
          </h1>
          <span>*️⃣</span>
          <h2 className=' text-xl text-center mt-10'>
            Are you tired 😖 of <span className='line-through'>forgetting</span> your passwords ?
          </h2>
          <h3 className='text-justify mt-2 '>
            Generating your password with <span className='font-bold'>easy-to-remember</span> words
            ✍️ and emojis 😎
          </h3>
        </div>

        <WordHash />
      </div>
    </main>
  )
}
