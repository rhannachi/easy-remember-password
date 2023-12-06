import { bcrypt, blake2b } from "hash-wasm"

const PASSWORDS = [
  "Facebook 😎",
  "Linkedin 🎯",
  "Gmail 🖥️",
  "Tinder 🍑",
  "Victor 🤘",
  "Toto 💀",
  "💩💩💩",
  "Instagram ❤️",
  "Gmail 🕹️",
  "Gmail 👨‍👩‍👦",
  "tiktok 🎬",
  "Yasmine 🥰",
] as const

export const randomPassword = () => {
  const min = 0
  const max = PASSWORDS.length - 1
  const index = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
  return PASSWORDS[index]
}

// export const digestArgon2 = async (password: string, salt: string): Promise<string | void> => {
//   try {
//     const saltBuffer = await blake2b(salt, 32)
//     return argon2id({
//       parallelism: 1,
//       iterations: 256,
//       memorySize: 512, // use 512KB memory
//       hashLength: 32, // output size = 32 bytes
//       outputType: 'encoded',
//       password,
//       salt: saltBuffer,
//     })
//   } catch (e) {
//     console.error(`${e}`)
//   }
// }

export const hashCalculator = async (password: string): Promise<string> => {
  try {
    const salt = await blake2b(password, 64)
    return bcrypt({
      costFactor: 4,
      outputType: "encoded",
      password,
      salt,
    })
  } catch (e) {
    console.error(`${e}`)
  }
  return Promise.resolve("")
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
    let newHash = hash.split("").reverse().join("")
    if (!hasUppercase) {
      newHash = newHash.replace(/[A-Z]/g, "")
    }
    if (!hasSymbol) {
      newHash = newHash.replace(/[^a-zA-Z0-9]/g, "")
    }
    return newHash.slice(0, length)
  } catch (e) {
    console.error(`${e}`)
  }
  return hash
}

// export const isServer = () => typeof window === "undefined"

// ******************************************************** //

import * as bip39 from "bip39"
import HdKey from "hdkey"

export const generateWallet = async (
  passphrase: string,
  password: string,
): Promise<HdKey | void> => {
  try {
    const hash = await digestSha256(`${passphrase.trim()}${password.trim()}`)
    if (!hash) return
    const mnemonic = bip39.entropyToMnemonic(hash)
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    return HdKey.fromMasterSeed(seed)
  } catch (e) {
    console.error(`${e}`)
  }
}

const digestSha256 = async (input: string | object): Promise<Buffer | void> => {
  try {
    let text = JSON.stringify(input)
    if (typeof input === "string") {
      text = input
    }
    const data = new TextEncoder().encode(text)
    const hash = await crypto.subtle.digest("SHA-256", data)
    return Buffer.from(hash)
  } catch (e) {
    console.error(`${e}`)
  }
}

const sign = (wallet: HdKey, hash: Buffer): Buffer | void => {
  try {
    return wallet.sign(hash) // signature
  } catch (e) {
    console.error(`${e}`)
  }
}

const verify = async ({
  input,
  publicExtendedKey,
  hash,
  signature,
}: {
  publicExtendedKey: string
  input: string | object
  hash: Buffer
  signature: Buffer
}): Promise<boolean> => {
  try {
    const hashInput = await digestSha256(input)
    if (hashInput && Buffer.compare(hashInput, hash) === 0) {
      return HdKey.fromExtendedKey(publicExtendedKey).verify(hash, signature)
    }
  } catch (e) {
    console.error(`${e}`)
  }
  return false
}

export const main = async () => {
  const wallet = await generateWallet("ramzi hannachi 123 123", "123 123")
  if (!wallet) return

  const publicExtendedKey = wallet.publicExtendedKey
  const input = "Ramzi HANNAChi"
  const hash = await digestSha256(input)
  if (!hash) return

  const signature = sign(wallet, hash)
  if (!signature) return

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isGood = await verify({
    hash,
    input,
    signature,
    publicExtendedKey,
  })
}
