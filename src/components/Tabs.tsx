import { useState } from 'react'
import clsx from 'clsx'

const Tab = ({
  isSelected,
  title,
  onClick,
}: {
  isSelected: boolean
  title: string
  onClick: () => void
}) => {
  return (
    <li className='me-2 cursor-pointer'>
      <span
        onClick={onClick}
        className={clsx(
          'inline-block p-4 rounded-t-lg',
          isSelected ? 'text-gray-700 font-semibold border-b-2 border-white' : 'text-gray-400',
        )}
      >
        {title}
      </span>
    </li>
  )
}

export const Tabs = ({ children }: { children: JSX.Element[] }) => {
  const [tab, setTab] = useState<'EMOJI' | 'WORD'>('EMOJI')

  return (
    <div className='flex flex-col mt-10 bg-white rounded-lg '>
      <div className='bg-gray-100 text-center rounded-lg'>
        <ul className='flex flex-wrap -mb-px justify-center'>
          <Tab
            key='emoji'
            title='Emojis 😃'
            isSelected={tab === 'EMOJI'}
            onClick={() => setTab('EMOJI')}
          />
          <Tab
            key='word'
            title='Word ✍️'
            isSelected={tab === 'WORD'}
            onClick={() => setTab('WORD')}
          />
        </ul>
      </div>

      <div className='flex flex-col mt-5 px-5 pb-5'>
        <div hidden={tab === 'WORD'}>{children[0]}</div>
        <div hidden={tab === 'EMOJI'}>{children[1]}</div>
      </div>
    </div>
  )
}
