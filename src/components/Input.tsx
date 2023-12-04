import clsx from "clsx"
import { InputHTMLAttributes } from "react"

export default function Input({
  label,
  inputClassName,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  inputClassName?: string
}) {
  return (
    <div className={clsx("flex flex-col w-full text-md", className)}>
      <label hidden={!label} htmlFor={props.name} className={clsx("text-white")}>
        {label}
      </label>
      <input
        {...props}
        id={props.name}
        className={clsx(
          "text-gray-700 rounded border-2 border-white p-2 bg-gray-50 focus:outline-none focus:shadow-outline",
          inputClassName,
        )}
      />
    </div>
  )
}
