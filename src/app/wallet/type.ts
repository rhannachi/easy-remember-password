import { WalletType } from "@/type"
import HdKey from "hdkey"

export type ResponseApiType = {
  status?: number
  isLoading: boolean
  error?: string
}

export type CardType = Omit<WalletType, "path"> & {
  uuid: string
  password: string
  addWalletItemApi?: ResponseApiType
}

export type StateTypes = {
  hdKey?: HdKey
  cards?: CardType[]
  fetchWalletApi?: ResponseApiType
}
