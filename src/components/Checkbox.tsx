import clsx from "clsx"
import { InputHTMLAttributes } from "react"

export default function Checkbox({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string | JSX.Element
}) {
  return (
    <label
      htmlFor={props.name}
      className={clsx("text-gray-700 text-md flex items-center", className)}
    >
      <input
        {...props}
        id={props.name}
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
        type="checkbox"
        className="m-1 w-4 h-4"
      />
      {label}
    </label>
  )
}
