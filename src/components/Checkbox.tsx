import clsx from 'clsx'

export default function Checkbox({
  label,
  name,
  checked,
  disabled = false,
  onChange,
  className,
}: {
  label: string | JSX.Element
  name: string
  checked: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
  className?: string
}) {
  return (
    <div className={clsx('flex flex-row p-2', className)}>
      <input
        id={name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        type='checkbox'
        className='mr-0.5'
      />
      <label htmlFor={name} className='font-semibold text-gray-800 text-xs font-medium'>
        {label}
      </label>
    </div>
  )
}
