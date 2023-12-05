import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

export type IconType = "trash" | "arrowUp" | "copy" | "regenerate"
export type ColorType = "fill-green-600" | "fill-blue-600" | "fill-red-600" | "fill-white"

const SVG: Readonly<Record<IconType, (className: string) => JSX.Element>> = {
  regenerate: (className: string) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </svg>
  ),
  copy: (className: string) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  ),
  trash: (className: string) => (
    <svg
      className={className}
      enableBackground="new 0 0 92 92"
      viewBox="0 0 92 92"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8h-50.6c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2s4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zm10.6-13.4c0 2.2-1.8 4-4 4h-78c-2.2 0-4-1.8-4-4s1.8-4 4-4h22v-9c0-1.9 1.3-3 3.2-3h27.6c1.9 0 3.2 1.1 3.2 3v9h22c2.2 0 4 1.8 4 4zm-53-4h20v-5h-20zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" />
    </svg>
  ),
  arrowUp: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m16.19 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.37c0 3.65 2.17 5.82 5.81 5.82h8.37c3.64 0 5.81-2.17 5.81-5.81v-8.38c.01-3.64-2.16-5.81-5.8-5.81zm-.13 12c-.15.15-.34.22-.53.22s-.38-.08-.53-.22l-3-3-3 3c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l3.53-3.53c.29-.29.77-.29 1.06 0l3.53 3.53c.29.29.29.76 0 1.06z" />
    </svg>
  ),
} as const

export default function ButtonIcon({
  icon,
  size = "w-6 h-6",
  color = "fill-blue-600",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType
  color?: ColorType
  size?: "w-5 h-5" | "w-6 h-6" | "w-7 h-7"
}) {
  return (
    <button type="button" {...props} className={className}>
      {SVG[icon](clsx(size, color))}
    </button>
  )
}
