import { Model, model, models, Schema } from "mongoose"
import { UserType } from "@/types"

const USER_NAME = "User" as const
const USER_COLLECTION = "users" as const

const userSchema: Schema<UserType> = new Schema<UserType>(
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

export const UserModel: Model<UserType> =
  models[USER_NAME] || model(USER_NAME, userSchema, USER_COLLECTION)
