import clsx from "clsx"
import { InputHTMLAttributes } from "react"

export default function Range({
  label,
  min = 6,
  max = 20,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string | JSX.Element
}) {
  return (
    <div className={clsx("flex flex-row items-center", className)}>
      <label htmlFor={props.name} className="text-md text-gray-700">
        {label}
      </label>
      <input
        {...props}
        id={props.name}
        className="w-full h-2 rounded bg-gray-200 appearance-none"
        min={min}
        max={max}
        value={props.value}
        type="range"
        onChange={props.onChange}
      />
    </div>
  )
}
