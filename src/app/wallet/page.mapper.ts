import type { WalletType } from "@/types"
import { generatePassword } from "@/helpers"
import HdKey from "hdkey"
import { CardType } from "./store"

export const cardsMapper = (hdKey: HdKey, wallet: WalletType[]): CardType[] =>
  wallet.map(cardMapper(hdKey))

export const cardMapper =
  (hdKey: HdKey) =>
  (walletItem: WalletType): CardType => ({
    ...walletItem,
    password: generatePassword(hdKey, walletItem.path),
  })
