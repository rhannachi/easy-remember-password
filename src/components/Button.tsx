import clsx from 'clsx'

export const Button = ({
  label,
  className,
  onClick,
}: {
  label: string
  className?: string
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx('rounded-md text-sm text-blue-600 bg-white', className)}
    >
      {label}
    </button>
  )
}
