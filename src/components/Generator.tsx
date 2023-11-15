'use client'

import { useState} from "react";
import { md5 } from 'hash-wasm';
import { Select } from "@/components";

export default function Generator() { // { onCreated }: { onCreated: (hash: string | undefined) => void}

    const [hash, setHash] = useState<string | undefined>(undefined)

    // useEffect(() => {
    //     onCreated(hash)
    // }, [hash])

    const handleSelectedEmoji = async (emoji: string) => {
        console.log('select:', emoji)
        if (emoji) {
            const emojiHash = await md5(emoji)
            setHash(emojiHash)
        } else {
            setHash(undefined)
        }
    }

    return (
            <div className="flex flex-row mt-2">
                <Select onSelected={handleSelectedEmoji}  />
                +
                <Select onSelected={handleSelectedEmoji}  />
                +
                <Select onSelected={handleSelectedEmoji}  />
                =
                <span className="bg-white px-2">{hash ?? '?'}</span>
                {hash && (<span className="bg-white ml-3 px-2">copy</span>)}
            </div>
    )
}
