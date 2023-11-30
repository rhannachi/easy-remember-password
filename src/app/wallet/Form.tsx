'use client'

import Input from '@/components/Input'

export default function Form() {
  return (
    <form className='flex flex-col'>
      <Input
        value=''
        maxLength={20}
        name='seed-user'
        placeholder='your passphrase...'
        onChange={() => {}}
      />
      <Input
        value=''
        className='mt-2'
        maxLength={20}
        name='passphrase-user'
        placeholder='your password...'
        onChange={() => {}}
      />
    </form>
  )
}
