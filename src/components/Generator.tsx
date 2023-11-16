'use client'

import { useState } from 'react'
import { md5 } from 'hash-wasm'
import { Button, Select } from '@/components'

export const Generator = () => {
  const [hash, setHash] = useState<string | undefined>(undefined)

  const handleSelectedEmoji = async (emoji: string) => {
    if (emoji) {
      const emojiHash = await md5(emoji)
      setHash(emojiHash)
    } else {
      setHash(undefined)
    }
  }

  return (
    <div className='flex flex-row mt-2'>
      <Select onSelected={handleSelectedEmoji} />
      <span className='font-semibold text-white px-1'>+</span>
      <Select onSelected={handleSelectedEmoji} />
      <span className='font-semibold text-white px-1'>+</span>
      <Select onSelected={handleSelectedEmoji} />
      <span className='font-semibold text-white px-1'>=</span>
      <span className='bg-white text-blue-600 px-2'>{hash ?? '?'}</span>
      {hash && <Button label='copy' className='ml-3 px-2' onClick={() => {}} />}
    </div>
  )
}
