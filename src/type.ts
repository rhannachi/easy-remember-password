export type WalletType = {
  path: string
  link: string
  username: string
  hasNumeric: boolean
  hasLowercase: boolean
  hasUppercase: boolean
  hasSymbol: boolean
  length: number
}

export type UserType = {
  publicExtendedKey: string
  wallet: WalletType[]
}
