import ButtonIcon from "@/components/ButtonIcon"
import clsx from "clsx"
import { useState } from "react"

export default function Password({
  label,
  isRegenerated,
  className,
}: {
  label: string
  isRegenerated?: boolean
  className?: string
}) {
  const [isCopied, setIsCopied] = useState(false)

  const copyTextToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand("copy", true, text)
    }
  }

  const handleOnClick = () => {
    if (!isCopied) {
      copyTextToClipboard(label)
        .then(() => {
          setIsCopied(true)
          setTimeout(() => {
            setIsCopied(false)
          }, 4500)
        })
        .catch((e) => {
          console.error(`${e}`)
        })
    }
  }
  return (
    <div className={clsx("flex flex-row p-2 bg-gray-50 w-full h-10 rounded  ", className)}>
      <span className="text-blue-600 text-ellipsis overflow-hidden grow">{label}</span>
      {isRegenerated && (
        <ButtonIcon
          name="regenerate-password-button"
          className="mx-1"
          icon="regenerate"
          size="w-5 h-5"
        />
      )}
      <ButtonIcon
        onClick={handleOnClick}
        name="copy-password-button"
        color={isCopied ? "fill-green-600" : "fill-blue-600"}
        className="ml-1"
        icon="copy"
        size="w-5 h-5"
      />
    </div>
  )
}
