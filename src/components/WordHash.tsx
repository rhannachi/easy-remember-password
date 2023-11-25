'use client'

import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { hashCalculator, hashTransform, randomPassword } from '@/helpers'
import Input from '@/components/Input'
import Output from '@/components/Output'
import Range from '@/components/Range'
import Checkbox from '@/components/Checkbox'

type WordHashType = {
  password: string
  hash: string
  length: number
  hasUppercase: boolean
  hasSymbol: boolean
}

export default function WordHash() {
  const [{ password, hash, length, hasSymbol, hasUppercase }, setState] = useState<WordHashType>({
    password: '',
    hash: '',
    length: 15,
    hasSymbol: true,
    hasUppercase: true,
  })

  useEffect(() => {
    ;(async function () {
      const newPassword = randomPassword()
      const newHash = await hashCalculator(newPassword)
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
        newHash = await hashCalculator(newPassword)
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
    <form className='flex flex-col mt-10 p-5 bg-white rounded-lg 2xl:mx-52'>
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

      <div className='flex flex-col mt-2'>
        <div className='flex flex-row '>
          <Checkbox
            name='password-contains-lowercase'
            className='basis-1/4'
            checked={true}
            label='abc'
            disabled
          />
          <Checkbox
            name='password-contains-numeric'
            className='basis-1/4 justify-center'
            checked={true}
            label='123'
            disabled
          />
          <Checkbox
            name='password-contains-uppercase'
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
            name='password-contains-special-character'
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
          name='password-length'
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
    </form>
  )
}
