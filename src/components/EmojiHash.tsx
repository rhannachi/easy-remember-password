'use client'

import { Fragment, useState } from 'react'
import { md5 } from 'hash-wasm'
import { Select } from '@/components'

export const EmojiHash = () => {
  const [nbSelect, setNbSelect] = useState(1)
  const [lengthHash, setLengthHash] = useState(8)
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
    <div className='flex flex-col'>
      <div className='flex flex-row justify-center '>
        {Array.from({ length: nbSelect }).map((_, index) => (
          <Fragment key={index}>
            <Select initValue='🙂' onSelected={handleSelectedEmoji} />
            {index < nbSelect - 1 && <span className='font-semibold text-white px-1'>+</span>}
          </Fragment>
        ))}
      </div>

      <div className='flex flex-col items-center '>
        <span className='font-semibold text-xl text-white px-1'>=</span>

        <div className='flex flex-row'>
          <span className='bg-white text-blue-600 px-2 w-52 text-center rounded '>
            {hash ? hash.slice(0, lengthHash) : ''}
          </span>
          {hash && <span className='ml-2 cursor-pointer'>📋</span>}
        </div>
      </div>

      <div className='flex flex-row mt-10 justify-center'>
        <div className='flex flex-row'>
          <label className='text-sm text-white mr-2'>Emojis ({nbSelect}):</label>
          <input
            min={1}
            max={3}
            value={nbSelect}
            type='range'
            onChange={(e) => setNbSelect(Number(e.target.value))}
          />
        </div>
        <div className='flex flex-row ml-2'>
          <label className='text-sm text-white mr-2'>Longueur ({lengthHash}):</label>
          <input
            min={6}
            max={20}
            value={lengthHash}
            type='range'
            onChange={(e) => setLengthHash(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
