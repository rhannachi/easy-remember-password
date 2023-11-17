'use client'

import { useEffect, useState } from 'react'

export const Select = ({
  initValue = '',
  onSelected,
}: {
  initValue?: string
  onSelected: (value: string) => void
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(initValue)

  useEffect(() => {
    onSelected(selectedEmoji)
  }, [selectedEmoji])

  return (
    <label htmlFor='emoji-select'>
      <select
        className='rounded text-blue-600 w-11 '
        value={selectedEmoji}
        onChange={(e) => setSelectedEmoji(e.target.value)}
        name='emoji'
        id='emoji-select'
      >
        <option value=''></option>
        <option value='🤬'>🤬</option>
        <option value='😭'>😭</option>
        <option value='😎'>😎</option>
        <option value='🥵'>🥵</option>
        <option value='🥶'>🥶</option>
        <option value='🙂'>🙂</option>
        <option value='🙃'>🙃</option>
        <option value='😬'>😬</option>
        <option value='😶'>😶</option>
        <option value='😄'>😄</option>
      </select>
    </label>
  )
}
