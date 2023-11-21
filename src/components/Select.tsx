import { useEffect, useState } from 'react'
import { EMOJIS, EmojiType } from '@/helpers'

export const Select = ({
  initValue,
  onSelected,
  name,
}: {
  initValue: EmojiType
  name: string
  onSelected: (value: EmojiType) => void
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiType>(initValue)

  useEffect(() => {
    onSelected(selectedEmoji)
  }, [selectedEmoji])

  return (
    <label htmlFor={`id-${name}`}>
      <select
        className='rounded text-gray-600 text-1xl '
        value={selectedEmoji}
        onChange={(e) => {
          setSelectedEmoji(e.target.value as EmojiType)
        }}
        name={name}
        id={`id-${name}`}
      >
        {EMOJIS.map((emoji) => (
          <option key={emoji} value={emoji}>
            {emoji}
          </option>
        ))}
      </select>
    </label>
  )
}
