import { Mongoose, Types } from "mongoose"

declare global {
  /* eslint no-var: off */
  var mongoose: {
    promise: Promise<Mongoose> | null
    conn: Mongoose | null
  }
}

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
  _id: Types.ObjectId
  publicExtendedKey: string
  wallet: WalletType[]
  createdAt?: Date
  updatedAt?: Date
}
