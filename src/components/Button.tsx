import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export default function Button({
  name,
  text,
  color = 'blue',
  style = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string
  text: string
  color?: 'blue' | 'red'
  style?: 'primary' | 'secondary'
  className?: string
}) {
  const primaryClassName = `text-white border-0 bg-${color}-600`
  const secondaryClassName = `border-2 border-${color}-600 text-${color}-600`
  return (
    <button
      {...props}
      name={name}
      type='submit'
      role='button'
      className={clsx(
        'rounded h-9 m-1 p-1 text-md',
        className,
        style === 'secondary' ? secondaryClassName : primaryClassName,
      )}
    >
      {text}
    </button>
  )
}
