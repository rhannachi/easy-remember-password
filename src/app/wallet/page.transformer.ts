import type { CardType } from "@/app/wallet/Card"
import type { WalletType } from "@/type"
import { generatePassword } from "@/helpers"
import HdKey from "hdkey"

export const cardsMapper = (hdKey: HdKey, wallet: WalletType[]): CardType[] =>
  wallet.map(cardMapper(hdKey))

const cardMapper =
  (hdKey: HdKey) =>
  (walletItem: WalletType): CardType => ({
    ...walletItem,
    uuid: walletItem.path,
    password: generatePassword(hdKey, walletItem.path),
  })
