import clsx from 'clsx'
import { ChangeEvent } from 'react'

export default function Range({
  label,
  name,
  value,
  min = 6,
  max = 20,
  onChange,
  className,
}: {
  label: string | JSX.Element
  name: string
  value: number
  min?: number
  max?: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}) {
  return (
    <div className={clsx('flex flex-row items-center', className)}>
      <label htmlFor={name} className='text-md text-gray-600'>
        {label}
      </label>
      <input
        id={name}
        className='w-full h-2 rounded bg-gray-200 appearance-none'
        min={min}
        max={max}
        value={value}
        type='range'
        onChange={onChange}
      />
    </div>
  )
}
