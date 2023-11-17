import { md5, sha1, sha224, sha256, sha3 } from 'hash-wasm'

export const EMOJIS = ['🤬', '😭', '😎', '🥵', '🥶'] as const
export type EmojiType = (typeof EMOJIS)[number]

const EMOJIS_HASH_FN: Readonly<Record<EmojiType, (data: string) => Promise<string>>> =
  Object.freeze({
    '🤬': md5,
    '😭': sha1,
    '😎': sha3,
    '🥵': sha224,
    '🥶': sha256,
  })

export const randomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const calculateHash = async (emojis: EmojiType[]): Promise<string> => {
  try {
    const newHash = await emojis.reduce(async (accum: Promise<string>, emoji: EmojiType) => {
      const newAccum = await accum
      const hashFn = EMOJIS_HASH_FN[emoji]
      if (typeof hashFn === 'function') {
        if (newAccum === '') {
          return await hashFn(emoji)
        }
        return await hashFn(newAccum)
      }
      return newAccum
    }, Promise.resolve(''))
    return Promise.resolve(newHash)
  } catch (e) {
    throw Error(`${e}`)
  }
}
