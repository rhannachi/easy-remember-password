'use client'

import { useEffect, useState } from 'react'
import { EMOJIS, EmojiType } from '@/helpers'

export const Select = ({
  initValue,
  onSelected,
}: {
  initValue: EmojiType
  onSelected: (value: EmojiType) => void
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiType>(initValue)

  useEffect(() => {
    onSelected(selectedEmoji)
  }, [selectedEmoji])

  return (
    <label htmlFor='emoji-select'>
      <select
        className='rounded text-blue-600 w-11 '
        value={selectedEmoji}
        onChange={(e) => {
          setSelectedEmoji(e.target.value as EmojiType)
        }}
        name='emoji'
        id='emoji-select'
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
