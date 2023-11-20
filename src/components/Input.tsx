'use client'

import clsx from 'clsx'
import { ChangeEvent } from 'react'

export const Input = ({
  label,
  value,
  min = 6,
  max = 20,
  onChange,
  className,
}: {
  label: string | JSX.Element
  value: number
  min?: number
  max?: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}) => {
  return (
    <div className={clsx('flex flex-row items-center', className)}>
      <label className='text-xs font-medium text-gray-600'>{label}</label>
      <input
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
