import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

export default function Button({
  name,
  text,
  style = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string
  text: string
  style?: "primary" | "secondary" | "warning"
}) {
  const primaryClassName = "text-white border-0 bg-blue-600"
  const secondaryClassName = "border-2 border-blue-600 text-blue-600"
  const warningClassName = "border-2 border-red-600 text-red-600"

  return (
    <button
      {...props}
      name={name}
      role="button"
      className={clsx(
        "rounded h-9 p-1 text-md",
        className,
        style === "secondary"
          ? secondaryClassName
          : style === "warning"
            ? warningClassName
            : primaryClassName,
      )}
    >
      {text}
    </button>
  )
}
