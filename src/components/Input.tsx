import { ChangeEvent } from 'react'

const Input = ({
  placeholder,
  name,
  value,
  maxLength = 20,
  onChange,
}: {
  placeholder: string
  name: string
  value: string
  maxLength?: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}) => {
  return (
    <label
      htmlFor={name}
      className='bg-gray-50 border-2 border-blue-600 text-md rounded w-full py-2 px-3 text-gray-700'
    >
      <input
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full text-center bg-gray-50 focus:outline-none focus:shadow-outline'
        type='text'
        maxLength={maxLength}
      />
    </label>
  )
}

export default Input
