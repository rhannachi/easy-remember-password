'use client'

import { Fragment, useState } from 'react'
import { md5 } from 'hash-wasm'
import { Select } from '@/components'

export const EmojiHash = () => {
  const [nbSelect, setNbSelect] = useState(2)
  const [lengthHash, setLengthHash] = useState(8)
  const [hash, setHash] = useState<string | undefined>(undefined)

  const handleSelect = async (emoji: string) => {
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
            <Select initValue='🙂' onSelected={handleSelect} />
            {index < nbSelect - 1 && <span className='font-semibold text-white px-1'>+</span>}
          </Fragment>
        ))}
      </div>

      <div className='flex flex-col items-center '>
        <span className='font-semibold text-xl text-white py-1 rotate-90 '>➤</span>
        <div className='flex flex-row bg-white px-2 w-64 justify-end'>
          {hash && (
            <>
              <div className='text-center font-semibold text-blue-800 w-full'>
                {hash.slice(0, lengthHash)}
              </div>
              <div className='absolute cursor-pointer'>📋</div>
            </>
          )}
        </div>
      </div>

      {/* ----------------*/}

      <div className='flex flex-col mt-10 '>
        <div className='flex flex-row'>
          <label className='text-sm text-white mr-2'>Majuscule:</label>
          <input type='checkbox' />
        </div>
        <div className='flex flex-row'>
          <label className='text-sm text-white mr-2'>Longueur ({lengthHash}):</label>
          <input
            min={6}
            max={20}
            value={lengthHash}
            type='range'
            onChange={(e) => setLengthHash(Number(e.target.value))}
          />
        </div>
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
      </div>
    </div>
  )
}
