'use client'

import ButtonIcon from '@/components/ButtonIcon'
import Input from '@/components/Input'
import Checkbox from '@/components/Checkbox'
import Range from '@/components/Range'

export default function Card() {
  return (
    <article className='bg-white rounded p-2'>
      {/** * Header ****/}
      <header className='flex items-center flex-row justify-between h-10'>
        <div className='text-gray-600'>Facebook</div>
        <div className='text-gray-600'> qsdf qsdf </div>
        <ButtonIcon name='close-open-card-button' svg='arrowUp' />
      </header>
      {/** * FORM ****/}
      <form className='flex flex-col'>
        <Input placeholder='site url' name='site-url-input' value='' onChange={() => {}} />
        <div className='flex flex-row'>
          <Input placeholder='username' name='username-input' value='' onChange={() => {}} />
          <ButtonIcon name='copy-username-button' svg='copy' />
        </div>
        <div className='flex flex-row'>
          <Input placeholder='password' name='password-input' value='' onChange={() => {}} />
          <ButtonIcon className='' name='regenerate-password-button' svg='regenerate' />
          <ButtonIcon name='copy-password-button' svg='copy' />
        </div>
        {/** * CHECKBOX ****/}
        <div className='flex flex-row h-10 mr-2'>
          <Checkbox
            name='password-contains-lowercase-checkbox'
            className='basis-1/4'
            checked={true}
            label='abc'
            disabled
          />
          <Checkbox
            name='password-contains-numeric-checkbox'
            className='basis-1/4 justify-center'
            checked={true}
            label='123'
            disabled
          />
          <Checkbox
            name='password-contains-uppercase-checkbox'
            className='basis-1/4 justify-center'
            checked={true}
            onChange={() => {}}
            label='ABC'
          />
          <Checkbox
            name='password-contains-special-character-checkbox'
            className='basis-1/4 justify-end'
            onChange={() => {}}
            checked={true}
            label='#$&'
          />
        </div>
        {/** * RANGE ****/}
        <Range
          className='h-10 px-1'
          value={15}
          name='password-length'
          label={
            <div className='w-24'>
              Length (<span className='text-blue-600'>{15}</span>):
            </div>
          }
          onChange={() => {}}
        />
        <div className='flex flex-row justify-end mt-5 items-center h-11'>
          <button className='text-white font-semibold rounded-3xl border-0 bg-red-600 mx-1 p-2 text-sm w-28 h-9 '>
            Supprimer
          </button>
          <button className='text-white font-semibold bg-blue-600 rounded-3xl border-0 p-2 mx-1 text-sm w-28 h-9 '>
            Valider
          </button>
        </div>
      </form>
    </article>
  )
}
