import clsx from 'clsx'

export const Checkbox = ({
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
}) => {
  return (
    <div className={clsx('flex flex-row', className)}>
      <input
        id={name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        type='checkbox'
        className='mr-0.5'
      />
      <label
        htmlFor={name}
        className={clsx('text-xs font-medium', disabled ? 'text-gray-300' : 'text-gray-600')}
      >
        {label}
      </label>
    </div>
  )
}
