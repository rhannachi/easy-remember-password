import { Document, model, models, Schema } from "mongoose"

type WalletType = {
  path: string
  link: string
  username: string
  hasNumeric: boolean
  hasLowercase: boolean
  hasUppercase: boolean
  hasSymbol: boolean
  length: number
}

export interface IUser extends Document {
  publicExtendedKey: string
  wallet: WalletType[]
}

const userSchema = new Schema<IUser>(
  {
    publicExtendedKey: {
      type: String,
      required: true,
    },
    wallet: [
      {
        path: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        hasNumeric: {
          type: Boolean,
          required: true,
        },
        hasLowercase: {
          type: Boolean,
          required: true,
        },
        hasUppercase: {
          type: Boolean,
          required: true,
        },
        hasSymbol: {
          type: Boolean,
          required: true,
        },
        length: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
)

export default models.User || model("User", userSchema)
