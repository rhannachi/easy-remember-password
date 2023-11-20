'use client'

import clsx from 'clsx'

export const Checkbox = ({
  label,
  className,
}: {
  label: string | JSX.Element
  className?: string
}) => {
  return (
    <div className={clsx('flex flex-row', className)}>
      <label className='text-xs font-medium text-gray-600'>{label}</label>
      <input type='checkbox' />
    </div>
  )
}
