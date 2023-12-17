import { IUser } from "@/types"
import { UserModel } from "@/pages/user.model"

export const findUser = async (publicExtendedKey: string): Promise<IUser | null> => {
  return UserModel.findOne({
    publicExtendedKey,
  })
}
