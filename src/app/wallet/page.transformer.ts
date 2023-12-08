import type { CardType } from "@/app/wallet/Card"
import type { WalletType } from "@/type"
import { generatePassword } from "@/helpers"
import HdKey from "hdkey"

export const cardsTransformer = (hdKey: HdKey, wallet: WalletType[]): CardType[] => {
  return wallet.map((walletItem: WalletType) => {
    return {
      ...walletItem,
      uuid: walletItem.path,
      password: generatePassword(hdKey, walletItem.path),
    }
  })
}
