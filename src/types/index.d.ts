import { Mongoose, Types } from "mongoose"

declare global {
  /* eslint no-var: off */
  var mongoose: {
    promise: Promise<Mongoose> | null
    conn: Mongoose | null
  }
}

export interface IWallet {
  path: string
  link: string
  username: string
  hasNumeric: boolean
  hasLowercase: boolean
  hasUppercase: boolean
  hasSymbol: boolean
  length: number
}

export interface IUser {
  _id: Types.ObjectId
  publicExtendedKey: string
  wallet: IWallet[]
  createdAt?: Date
  updatedAt?: Date
}
