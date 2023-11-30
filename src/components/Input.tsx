import clsx from 'clsx'
import { ChangeEvent } from 'react'

export default function Input({
  placeholder,
  name,
  value,
  maxLength = 20,
  onChange,
  className,
  inputClassName,
}: {
  placeholder: string
  name: string
  value: string
  maxLength?: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
  inputClassName?: string
}) {
  return (
    <label
      htmlFor={name}
      className={clsx(
        'bg-gray-50 border-2 border-white text-md rounded w-full py-2 px-2 text-gray-600',
        className,
      )}
    >
      <input
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          'w-full bg-gray-50 focus:outline-none focus:shadow-outline',
          inputClassName,
        )}
        type='text'
        maxLength={maxLength}
      />
    </label>
  )
}
