import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { bcrypt, BcryptOptions } from 'hash-wasm'
import { Checkbox, Output, Range } from '@/components'
import { BCRYPT_DEFAULT_OPTIONS, hashTransform, PASSWORDS, randomInt } from '@/helpers'

type WordHashType = {
  password: string
  hashOptions: Omit<BcryptOptions, 'password'>
  hash: string
  length: number
  hasUppercase: boolean
  hasSymbol: boolean
}

const WordHash = () => {
  const [{ password, hashOptions, hash, length, hasSymbol, hasUppercase }, setState] =
    useState<WordHashType>({
      password: '',
      hashOptions: BCRYPT_DEFAULT_OPTIONS,
      hash: '',
      length: 15,
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
      let newHash = ''
      if (newPassword.length) {
        newHash = await bcrypt({
          password: newPassword,
          ...hashOptions,
        })
      }
      setState((prevState) => ({
        ...prevState,
        password: newPassword,
        hash: newHash,
      }))
    } catch (e) {
      console.error(`${e}`)
    }
  }

  const hashTransformMemo = useMemo(
    () => hashTransform({ hash, length, hasSymbol, hasUppercase }),
    [hash, length, hasSymbol, hasUppercase],
  )

  return (
    <>
      <div className='flex flex-row justify-center'>
        <label
          htmlFor='password-input'
          className='bg-gray-50 border-2 border-blue-600 text-md rounded w-full py-2 px-3 text-gray-700'
        >
          <input
            id='password-input'
            value={password}
            onChange={handleOnChange}
            placeholder='Your simple pass ...'
            className='w-full text-center bg-gray-50 focus:outline-none focus:shadow-outline'
            type='text'
            maxLength={20}
          />
        </label>
      </div>
      <div className='flex flex-col items-center  '>
        <span className='font-semibold text-xl text-blue-600 my-1 rotate-90 '>➤</span>
        <Output label={hashTransformMemo} />
      </div>

      <div className='flex flex-col mt-4'>
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
        <Range
          value={length}
          name='length-w'
          label={
            <div className='w-19'>
              Length (<span className='text-blue-600'>{length}</span>):
            </div>
          }
          className='mt-2'
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              length: Number(e.target.value),
            }))
          }
        />
      </div>
    </>
  )
}

export default WordHash
