import { useState } from 'react'

const Output = ({ label }: { label: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const handleOnClick = () => {
    copyTextToClipboard(label)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 3500)
      })
      .catch((e) => {
        console.error(`${e}`)
      })
  }

  return (
    <>
      <div className='flex flex-row py-2 bg-gray-50 px-1 w-full justify-end h-10'>
        <div className='text-center font-semibold text-blue-600 w-full'>{label}</div>
        <div onClick={handleOnClick} className='absolute cursor-pointer '>
          📋
        </div>
      </div>
      <span className='text-sm text-green-600 '>{isCopied && 'Copied !'}</span>
    </>
  )
}

export default Output
