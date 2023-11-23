import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { bcrypt, BcryptOptions } from 'hash-wasm'
import { Checkbox, Input, Output, Range } from '@/components'
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
    <div className='flex flex-col mt-10 p-5 bg-white rounded-lg 2xl:mx-52'>
      <Input
        value={password}
        maxLength={20}
        name='password-input'
        placeholder='Your simple pass ...'
        onChange={handleOnChange}
      />

      <div className='flex flex-col items-center'>
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
    </div>
  )
}

export default WordHash
