'use client'

import { ChangeEvent, useState } from 'react'
import { md5 } from 'hash-wasm'

export const WordHash = () => {
  const [word, setWord] = useState('')
  const [lengthHash, setLengthHash] = useState(8)
  const [hash, setHash] = useState<string | undefined>(undefined)

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
    const emojiHash = await md5(e.target.value)
    setHash(emojiHash)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-center '>
        <input
          value={word}
          onChange={handleInput}
          placeholder='Tapez votre phrase'
          className=' text-center rounded p-2 text-md text-blue-600 h-10 '
          type='text'
          maxLength={20}
        />
      </div>

      <div className='flex flex-col items-center '>
        <span className='font-semibold text-xl text-white py-1 rotate-90 '>➤</span>
        <div className='flex flex-row bg-white px-2 w-64 justify-end'>
          <div className='text-center font-semibold text-blue-800 w-full'>
            {word && hash ? hash.slice(0, lengthHash) : '???'}
          </div>
          {word && <div className='absolute cursor-pointer'>📋</div>}
        </div>
      </div>

      {/* ----------------*/}

      <div className='flex flex-col mt-10'>
        <div className='flex flex-row '>
          <label className='text-sm text-white mr-2'>Majuscule:</label>
          <input type='checkbox' />
        </div>
        <div className='flex flex-row '>
          <label className='text-sm text-white mr-2'>Characters ({lengthHash}):</label>
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
