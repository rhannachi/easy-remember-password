'use client'

import { EmojiHash, Tabs, WordHash } from '@/components'

export default function Page() {
  return (
    <main className='flex flex-col items-center pt-10 lg:pt-20 px-5 md:px-44 lg:px-64 xl:px-96 '>
      <div className='container'>
        <div className='flex flex-col items-center text-white'>
          <h1 className='font-semibold text-center text-3xl md:text-4xl lg:text-5xl lg:leading-snug '>
            Are you tired 😖 of <span className='line-through'>forgetting</span> your passwords *️⃣ ?
          </h1>
          <p className='mt-10 text-justify '>
            Generate your password using a <span className='font-bold'>simple word ✍️</span> and
            <span className='font-bold'> emojis 😃</span> of your choice 😎
          </p>
        </div>

        <Tabs>
          <EmojiHash />
          <WordHash />
        </Tabs>
      </div>
    </main>
  )
}
