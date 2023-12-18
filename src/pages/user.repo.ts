import { UserType } from "@/types"
import { UserModel } from "@/pages/user.model"

export const findUser = async (publicExtendedKey: string): Promise<UserType | null> => {
  return UserModel.findOne({
    publicExtendedKey,
  })
}

// export const createUser = async (): Promise
