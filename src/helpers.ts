import { bcrypt, BcryptOptions, blake2b } from 'hash-wasm'

const BCRYPT_DEFAULT_OPTIONS: Readonly<Omit<BcryptOptions, 'password' | 'salt'>> = {
  costFactor: 4,
  outputType: 'encoded',
}

export const PASSWORDS = [
  'Facebook 😎',
  'Linkedin 🎯',
  'Gmail 🖥️',
  'Tinder 🍑',
  'Instagram ❤️',
  'Gmail 🕹️',
  'Gmail 👨‍👩‍👦',
  'tiktok 🎬',
] as const

export const randomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const hashCalculator = async (password: string): Promise<string> => {
  try {
    const salt = await blake2b(password, 64)
    return bcrypt({
      ...BCRYPT_DEFAULT_OPTIONS,
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
