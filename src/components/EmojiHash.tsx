'use client'

import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Select } from '@/components'
import { calculateHash, EMOJIS, EmojiType, randomInt } from '@/helpers'

const HASH_LENGTH = 10 as const
const EMOJIS_LENGTH = 2 as const

type StateType = { emojis: EmojiType[]; hashLength: number; hash: string | undefined }

export const EmojiHash = () => {
  const [{ emojis, hashLength, hash }, setState] = useState<StateType>({
    emojis: Array.from({ length: EMOJIS_LENGTH }).map(() => EMOJIS[randomInt(0, EMOJIS.length)]),
    hashLength: HASH_LENGTH,
    hash: undefined,
  })

  // console.log('emojis:', [...emojis])
  // console.log('', hashLength)
  // console.log('', hash)
  // console.log('')

  useEffect(() => {
    calculateHash(emojis)
      .then((newHash: string) =>
        setState((prev) => ({
          ...prev,
          hash: newHash,
        })),
      )
      .catch((e) => console.error(e))
  }, [emojis])

  const handleSelect = (index: number) => (emoji: EmojiType) => {
    setState((prev) => ({
      ...prev,
      emojis: prev.emojis.map((item, i) => {
        if (index === i) return emoji
        return item
      }),
    }))
  }

  const handleChangeNbEmoji = (e: ChangeEvent<HTMLInputElement>) => {
    const newNbEmoji = Number(e.target.value) - emojis.length

    if (newNbEmoji > 0) {
      const emoji = Array.from({ length: newNbEmoji }).map(
        () => EMOJIS[randomInt(0, EMOJIS.length)],
      )
      setState((prev) => ({
        ...prev,
        emojis: prev.emojis.concat(emoji),
      }))
    }
    if (newNbEmoji < 0) {
      setState((prev) => ({
        ...prev,
        emojis: prev.emojis.slice(0, prev.emojis.length + newNbEmoji),
      }))
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-center '>
        {emojis.map((emoji, index) => (
          <Fragment key={index}>
            <Select initValue={emoji} onSelected={handleSelect(index)} />
            {index < emojis.length - 1 && <span className='font-semibold text-white px-1'>+</span>}
          </Fragment>
        ))}
      </div>

      <div className='flex flex-col items-center '>
        <span className='font-semibold text-xl text-white py-1 rotate-90 '>➤</span>
        <div className='flex flex-row bg-white px-2 w-64 justify-end'>
          {hash && (
            <>
              <div className='text-center font-semibold text-blue-800 w-full'>
                {hash.slice(0, hashLength)}
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
          <label className='text-sm text-white mr-2'>Longueur ({hashLength}):</label>
          <input
            min={6}
            max={20}
            value={hashLength}
            type='range'
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                hashLength: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className='flex flex-row'>
          <label className='text-sm text-white mr-2'>Emojis ({emojis.length}):</label>
          <input
            min={1}
            max={3}
            value={emojis.length}
            type='range'
            onChange={handleChangeNbEmoji}
          />
        </div>
      </div>
    </div>
  )
}
