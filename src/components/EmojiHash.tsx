import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Input, Checkbox, Output, Select, Settings } from '@/components'
import { calculateHash, EMOJIS, EmojiType, randomInt } from '@/helpers'

const HASH_LENGTH = 10 as const
const EMOJIS_LENGTH = 2 as const

type StateType = { emojis: EmojiType[]; hashLength: number; hash: string | undefined }

const EmojiHash = () => {
  const [{ emojis, hashLength, hash }, setState] = useState<StateType>({
    emojis: Array.from({ length: EMOJIS_LENGTH }).map(
      () => EMOJIS[randomInt(0, EMOJIS_LENGTH - 1)],
    ),
    hashLength: HASH_LENGTH,
    hash: undefined,
  })

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
    <>
      <div className='flex flex-row justify-center '>
        {emojis.map((emoji, index) => (
          <Fragment key={index}>
            <Select name={`${emoji}-${index}`} initValue={emoji} onSelected={handleSelect(index)} />
            {index < emojis.length - 1 && (
              <span className='font-semibold text-xl text-blue-600 px-1'>+</span>
            )}
          </Fragment>
        ))}
      </div>

      <div className='flex flex-col items-center '>
        <span className='font-semibold text-xl text-blue-600 my-1 rotate-90 '>➤</span>
        <Output label={hash ? hash.slice(0, hashLength) : '???'} />
      </div>

      <Settings>
        <Checkbox name='uppercase' checked={false} label={<div className='w-19'>Uppercase:</div>} />
        <Input
          name='length-e'
          value={hashLength}
          label={<div className='w-19'>Length ({hashLength}):</div>}
          className='my-1'
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              hashLength: Number(e.target.value),
            }))
          }
        />
        <Input
          name='emojis-e'
          value={emojis.length}
          label={<div className='w-19'>Emojis ({emojis.length}):</div>}
          min={1}
          max={3}
          onChange={handleChangeNbEmoji}
        />
      </Settings>
    </>
  )
}

export default EmojiHash
