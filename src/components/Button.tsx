import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

export default function Button({
  isLoading,
  style = "primary",
  children,
  className,
  ...props
}: React.PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean
    style?: "primary" | "secondary" | "warning"
  }
>) {
  const primaryClassName = "text-white border-[#2872EC] bg-[#2872EC]" //  bg-blue-600
  const secondaryClassName = "border-blue-600 text-blue-600"
  const warningClassName = "border-red-600 text-red-600"
  const disabledClassName = "border-gray-400 text-white bg-gray-400"

  return (
    <button
      type="button"
      {...props}
      disabled={isLoading}
      role="button"
      className={clsx(
        className,
        "rounded border-2 py-1 text-md",
        !props.disabled && style === "primary" && primaryClassName,
        !props.disabled && style === "secondary" && secondaryClassName,
        !props.disabled && style === "warning" && warningClassName,
        props.disabled && disabledClassName,
      )}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <svg
            className="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="currentColor"
            />
            <path
              d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
