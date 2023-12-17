import { generateHdKey } from "@/helpers"
import { addWalletItemApi, ErrorApi, fetchWalletApi } from "@/app/wallet/wallet.service"
import { cardsMapper } from "@/app/wallet/page.mapper"
import { Dispatch, SetStateAction } from "react"
import { IWallet } from "@/types"
import HdKey from "hdkey"

export type ResponseApiType = {
  status?: number
  isLoading: boolean
  error?: string
}

export type CardType = Omit<IWallet, "path"> & {
  uuid: string
  password: string
  addWalletItemApi?: ResponseApiType
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
  (publicExtendedKey: string, setState: Dispatch<SetStateAction<StateTypes>>) =>
  async (walletItem: IWallet) => {
    try {
      setState((prevState) => ({
        ...prevState,
        cards: prevState?.cards?.map((item) => {
          if (item.uuid === walletItem.path) {
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

      const newWalletItem = await addWalletItemApi(publicExtendedKey, walletItem)

      setState((prevState) => ({
        ...prevState,
        cards: prevState?.cards?.map((item) => {
          if (item.uuid === newWalletItem.path) {
            return {
              ...item,
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
          if (item.uuid === walletItem.path) {
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
