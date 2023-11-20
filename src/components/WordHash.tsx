'use client'

import { ChangeEvent, useState } from 'react'
import { sha1 } from 'hash-wasm'
import { Checkbox, Settings, Output } from '@/components'
import { Input } from '@/components/Input'

export const WordHash = () => {
  const [word, setWord] = useState('')
  const [hashLength, setLengthHash] = useState(8)
  const [hash, setHash] = useState<string | undefined>(undefined)

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
    const emojiHash = await sha1(e.target.value)
    setHash(emojiHash)
  }

  return (
    <>
      <div className='flex flex-row justify-center '>
        <input
          value={word}
          onChange={handleInput}
          placeholder='Your seed ...'
          className='shadow-sm border-b-2 border-blue-600 text-md appearance-none rounded text-center w-full pb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='text'
          maxLength={20}
        />
      </div>
      <div className='flex flex-col items-center  '>
        <span className='font-semibold text-xl text-blue-600 my-1 rotate-90 '>➤</span>
        <Output label={word && hash ? hash.slice(0, hashLength) : '???'} />
      </div>

      <Settings>
        <Checkbox label={<div className='w-19'>Uppercase:</div>} />
        <Input
          value={hashLength}
          label={<div className='w-19'>Length ({hashLength}):</div>}
          className='mt-1'
          onChange={(e) => setLengthHash(Number(e.target.value))}
        />
      </Settings>
    </>
  )
}
