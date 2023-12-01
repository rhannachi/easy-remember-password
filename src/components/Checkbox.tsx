import clsx from "clsx"

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
    <label htmlFor={name} className={clsx("text-gray-600 text-md flex items-center", className)}>
      <input
        id={name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        type="checkbox"
        className="m-1 w-4 h-4"
      />
      {label}
    </label>
  )
}
