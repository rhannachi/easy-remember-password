import type { IWallet } from "@/types"
import { generatePassword } from "@/helpers"
import HdKey from "hdkey"
import { CardType } from "./page.state"

export const cardsMapper = (hdKey: HdKey, wallet: IWallet[]): CardType[] =>
  wallet.map(cardMapper(hdKey))

export const cardMapper =
  (hdKey: HdKey) =>
  ({
    link,
    path,
    hasNumeric,
    hasSymbol,
    hasUppercase,
    hasLowercase,
    username,
    length,
  }: IWallet): CardType => ({
    link,
    hasLowercase,
    hasNumeric,
    hasSymbol,
    hasUppercase,
    length,
    username,
    uuid: path,
    password: generatePassword(hdKey, path),
  })
