'use client'

import {useEffect, useState} from "react";

export const Select = ({ onSelected }: { onSelected: (value: string) => void }) => {
    const [selectedEmoji, setSelectedEmoji] = useState("")

    useEffect(() => {
        onSelected(selectedEmoji)
    }, [selectedEmoji])

    return (
            <label htmlFor="emoji-select">
                <select value={selectedEmoji}
                        onChange={e => setSelectedEmoji(e.target.value)}
                        name="emoji"
                        id="emoji-select">
                    <option value="">?</option>
                    <option value="🤬">🤬</option>
                    <option value="😭">😭</option>
                    <option value="😎">😎</option>
                    <option value="🥵">🥵</option>
                    <option value="🥶">🥶</option>
                    <option value="🙂">🙂</option>
                    <option value="🙃">🙃</option>
                    <option value="😬">😬</option>
                    <option value="😶">😶</option>
                    <option value="😄">😄</option>
                </select>
            </label>

    )
}
