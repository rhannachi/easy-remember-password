import { generateHdKey } from "@/helpers"
import {
  addWalletItemApi,
  deleteWalletItemApi,
  ErrorApi,
  fetchWalletApi,
} from "@/app/wallet/wallet.service"
import { cardMapper, cardsMapper } from "@/app/wallet/page.mapper"
import { Dispatch, SetStateAction } from "react"
import { WalletType } from "@/types"
import HdKey from "hdkey"

export type ResponseApiType = {
  status?: number
  isLoading: boolean
  error?: string
}

export type CardType = WalletType & {
  password: string
  addWalletItemApi?: ResponseApiType
  deleteWalletItemApi?: ResponseApiType
}

export type StateTypes = {
  hdKey?: HdKey
  cards?: CardType[]
  fetchWalletApi?: ResponseApiType
}

export const fetchWalletHandler =
  (setState: Dispatch<SetStateAction<StateTypes>>) =>
  async (passphrase: string, password: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        hdKey: undefined,
        cards: undefined,
        fetchWalletApi: {
          error: undefined,
          status: undefined,
          isLoading: true,
        },
      }))

      const hdKey = await generateHdKey(passphrase, password)
      if (!hdKey) return
      const wallet = await fetchWalletApi(hdKey.publicExtendedKey)
      const cards = cardsMapper(hdKey, wallet)

      setState((prevState) => ({
        ...prevState,
        hdKey,
        cards,
        fetchWalletApi: {
          error: undefined,
          status: 200,
          isLoading: false,
        },
      }))
    } catch (e) {
      let error = "Un problème est survenu"
      let status = 500
      if (e instanceof ErrorApi) {
        status = e.status
        error = e.error
      }
      setState((prevState) => ({
        ...prevState,
        hdKey: undefined,
        cards: undefined,
        fetchWalletApi: {
          error,
          status,
          isLoading: false,
        },
      }))
    }
  }

export const addCardSubmitHandler =
  (hdKey: HdKey, setState: Dispatch<SetStateAction<StateTypes>>) =>
  async (walletItem: WalletType) => {
    try {
      setState((prevState) => ({
        ...prevState,
        cards: prevState?.cards?.map((item) => {
          if (item.path === walletItem.path) {
            return {
              ...item,
              addWalletItemApi: {
                error: undefined,
                status: undefined,
                isLoading: true,
              },
            }
          }
          return item
        }),
      }))

      const newWalletItem = await addWalletItemApi(hdKey.publicExtendedKey, walletItem)

      setState((prevState) => ({
        ...prevState,
        cards: prevState?.cards?.map((item) => {
          if (item.path === newWalletItem.path) {
            return {
              ...cardMapper(hdKey)(walletItem),
              addWalletItemApi: {
                error: undefined,
                status: 200,
                isLoading: false,
              },
            }
          }
          return item
        }),
      }))
    } catch (e) {
      let error = "Un problème est survenu"
      let status = 500
      if (e instanceof ErrorApi) {
        status = e.status
        error = e.error
      }
      setState((prevState) => ({
        ...prevState,
        cards: prevState?.cards?.map((item) => {
          if (item.path === walletItem.path) {
            return {
              ...item,
              addWalletItemApi: {
                error,
                status,
                isLoading: false,
              },
            }
          }
          return item
        }),
      }))
    }
  }

export const deleteCardHandler =
  (hdKey: HdKey, setState: Dispatch<SetStateAction<StateTypes>>) => async (path: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        cards: prevState?.cards?.map((item) => {
          if (item.path === path) {
            return {
              ...item,
              deleteWalletItemApi: {
                error: undefined,
                status: undefined,
                isLoading: true,
              },
            }
          }
          return item
        }),
      }))

      const pathDeleted = await deleteWalletItemApi(hdKey.publicExtendedKey, path)

      setState((prevState) => ({
        ...prevState,
        cards: prevState?.cards?.filter((item) => item.path !== pathDeleted),
      }))
    } catch (e) {
      let error = "Un problème est survenu"
      let status = 500
      if (e instanceof ErrorApi) {
        status = e.status
        error = e.error
      }
      setState((prevState) => ({
        ...prevState,
        cards: prevState?.cards?.map((item) => {
          if (item.path === path) {
            return {
              ...item,
              deleteWalletItemApi: {
                error,
                status,
                isLoading: false,
              },
            }
          }
          return item
        }),
      }))
    }
  }
