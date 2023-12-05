import clsx from "clsx"
import { InputHTMLAttributes } from "react"
import ButtonIcon, { IconType } from "@/components/ButtonIcon"

export default function InputCustom({
  inputClassName,
  className,
  suffixIcon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  suffixIcon?: IconType
  inputClassName?: string
}) {
  return (
    <div
      className={clsx(
        "flex flex-col w-full text-md bg-gray-50 rounded border border-white ",
        className,
      )}
    >
      <div className="flex flex-row justify-between">
        <input
          {...props}
          id={props.name}
          className={clsx(
            "text-gray-700 w-full bg-gray-50 p-2 focus:outline-none focus:shadow-outline",
            inputClassName,
          )}
        />
        {suffixIcon && (
          <ButtonIcon
            name="copy-username-button"
            className="pr-2"
            icon={suffixIcon}
            size="w-5 h-5"
          />
        )}
      </div>
    </div>
  )
}
