import { ChangeEvent, useState } from 'react'
import { bcrypt, BcryptOptions } from 'hash-wasm'
import { Checkbox, Settings, Output, Input } from '@/components'

type WordHashType = {
  word: string
  hashOptions: Omit<BcryptOptions, 'password'>
  hash: string | undefined
  length: number
  hasUppercase: boolean
  hasSymbol: boolean
}

const BCRYPT_DEFAULT_OPTIONS: Readonly<Omit<BcryptOptions, 'password'>> = {
  salt: new Uint8Array([154, 224, 224, 142, 215, 205, 89, 168, 98, 54, 120, 67, 241, 27, 150, 154]),
  costFactor: 4,
  outputType: 'encoded',
}

const hashTransform = ({
  hash,
  length,
  hasSymbol,
  hasUppercase,
}: {
  length: number
  hash: string
  hasUppercase: boolean
  hasSymbol: boolean
}) => {
  try {
    let newHash = hash.split('').reverse().join('')
    if (!hasUppercase) {
      newHash = newHash.replace(/[A-Z]/g, '')
    }
    if (!hasSymbol) {
      newHash = newHash.replace(/[^a-zA-Z0-9]/g, '')
    }
    return newHash.slice(0, length)
  } catch (e) {
    console.error(`${e}`)
  }
  return hash
}

const WordHash = () => {
  const [{ word, hashOptions, hash, length, hasSymbol, hasUppercase }, setState] =
    useState<WordHashType>({
      word: '',
      hashOptions: BCRYPT_DEFAULT_OPTIONS,
      hash: undefined,
      length: 10,
      hasSymbol: true,
      hasUppercase: true,
    })

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newWord = e.target.value
      if (newWord.length) {
        const newHash = await bcrypt({
          password: newWord,
          ...hashOptions,
        })
        setState((prevState) => ({
          ...prevState,
          word: newWord,
          hash: newHash,
        }))
      } else {
        setState((prevState) => ({
          ...prevState,
          word: newWord,
        }))
      }
    } catch (e) {
      console.error(`${e}`)
    }
  }

  return (
    <>
      <div className='flex flex-row justify-center '>
        <input
          name='seed'
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
        <Output
          label={word && hash ? hashTransform({ hash, length, hasSymbol, hasUppercase }) : '???'}
        />
      </div>

      <Settings>
        <div className='flex flex-row '>
          <Checkbox name='abc-w' className='basis-1/4' checked={true} label='abc' disabled />
          <Checkbox
            name='123-w'
            className='basis-1/4 justify-center'
            checked={true}
            label='123'
            disabled
          />
          <Checkbox
            name='ABC-w'
            className='basis-1/4 justify-center'
            checked={hasUppercase}
            onChange={(value) =>
              setState((prevState) => ({
                ...prevState,
                hasUppercase: value,
              }))
            }
            label='ABC'
          />
          <Checkbox
            name='#$&-w'
            className='basis-1/4 justify-end'
            onChange={(value) =>
              setState((prevState) => ({
                ...prevState,
                hasSymbol: value,
              }))
            }
            checked={hasSymbol}
            label='#$&'
          />
        </div>
        <Input
          value={length}
          name='length-w'
          label={<div className='w-19'>Length ({length}):</div>}
          className='mt-1'
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              length: Number(e.target.value),
            }))
          }
        />
      </Settings>
    </>
  )
}

export default WordHash
