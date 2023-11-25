import { bcrypt, blake2b } from 'hash-wasm'

const PASSWORDS = [
  'Facebook 😎',
  'Linkedin 🎯',
  'Gmail 🖥️',
  'Tinder 🍑',
  'Victor 🤘',
  'Toto 💀',
  '💩💩💩',
  'Instagram ❤️',
  'Gmail 🕹️',
  'Gmail 👨‍👩‍👦',
  'tiktok 🎬',
  'Yasmine 🥰',
] as const

export const randomPassword = () => {
  const min = 0
  const max = PASSWORDS.length - 1
  const index = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
  return PASSWORDS[index]
}

export const hashCalculator = async (password: string): Promise<string> => {
  try {
    const salt = await blake2b(password, 64)
    return bcrypt({
      costFactor: 4,
      outputType: 'encoded',
      password,
      salt,
    })
  } catch (e) {
    console.error(`${e}`)
  }
  return Promise.resolve('')
}

export const hashTransform = ({
  hash,
  length,
  hasSymbol,
  hasUppercase,
}: {
  length: number
  hash: string
  hasUppercase: boolean
  hasSymbol: boolean
}) => {
  try {
    let newHash = hash.split('').reverse().join('')
    if (!hasUppercase) {
      newHash = newHash.replace(/[A-Z]/g, '')
    }
    if (!hasSymbol) {
      newHash = newHash.replace(/[^a-zA-Z0-9]/g, '')
    }
    return newHash.slice(0, length)
  } catch (e) {
    console.error(`${e}`)
  }
  return hash
}
