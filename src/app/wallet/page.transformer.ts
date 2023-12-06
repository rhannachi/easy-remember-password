import { CardType } from "@/app/wallet/Card"
import { PasswordType } from "@/pages/api/wallet"
import { generatePassword } from "@/helpers"
import HdKey from "hdkey"

export const cardListTransformer = (hdKey: HdKey, passwordList: PasswordType[]): CardType[] => {
  return passwordList.map((password: PasswordType) => {
    return {
      ...password,
      password: generatePassword(hdKey, password.uuid),
    }
  })
}
