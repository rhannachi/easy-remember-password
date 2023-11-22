import { ChangeEvent, useEffect, useState } from 'react'
import { bcrypt, BcryptOptions } from 'hash-wasm'
import { Checkbox, Settings, Output, Input } from '@/components'
import { hashTransform, PASSWORDS, randomInt } from '@/helpers'

type WordHashType = {
  password: string
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

export const WordHash = () => {
  const [{ password, hashOptions, hash, length, hasSymbol, hasUppercase }, setState] =
    useState<WordHashType>({
      password: '',
      hashOptions: BCRYPT_DEFAULT_OPTIONS,
      hash: undefined,
      length: 10,
      hasSymbol: true,
      hasUppercase: true,
    })

  useEffect(() => {
    ;(async function () {
      const newPassword = PASSWORDS[randomInt(0, PASSWORDS.length - 1)]
      const newHash = await bcrypt({
        password: newPassword,
        ...hashOptions,
      })
      setState((prevState) => ({
        ...prevState,
        password: newPassword,
        hash: newHash,
      }))
    })()
  }, [])

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newPassword = e.target.value
      if (newPassword.length) {
        const newHash = await bcrypt({
          password: newPassword,
          ...hashOptions,
        })
        setState((prevState) => ({
          ...prevState,
          password: newPassword,
          hash: newHash,
        }))
      } else {
        setState((prevState) => ({
          ...prevState,
          password: newPassword,
        }))
      }
    } catch (e) {
      console.error(`${e}`)
    }
  }

  return (
    <>
      <div className='flex flex-row justify-center '>
        <label
          htmlFor='password-input'
          className='shadow-sm border-2 border-blue-600 text-md appearance-none rounded w-full py-2 px-3 text-gray-700'
        >
          <input
            id='password-input'
            value={password}
            onChange={handleOnChange}
            placeholder='Your seed ...'
            className='w-full text-center focus:outline-none focus:shadow-outline'
            type='text'
            maxLength={20}
          />
        </label>
      </div>
      <div className='flex flex-col items-center  '>
        <span className='font-semibold text-xl text-blue-600 my-1 rotate-90 '>➤</span>
        <Output
          label={
            password && hash ? hashTransform({ hash, length, hasSymbol, hasUppercase }) : '???'
          }
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
