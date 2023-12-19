import { WalletType } from "@/types"
import HdKey from "hdkey"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { devtools } from "zustand/middleware"

import { generateHdKey, generatePassword, generatePath } from "@/helpers"
import {
  addWalletItemApi,
  deleteWalletItemApi,
  ErrorApi,
  fetchWalletApi,
} from "@/app/wallet/wallet.service"

const LOADING_STATUS = "loading" as const
const SUCCEEDED_STATUS = "succeeded" as const
const FAILED_STATUS = "failed" as const

const getError = (e: unknown) => {
  let error = "Un problème est survenu"
  let status = 500
  if (e instanceof ErrorApi) {
    status = e.status
    error = e.error
  }
  return { status, error }
}

type ResponseApiType = {
  status?: number
  isLoading: boolean
  error?: string
}
export type CardType = WalletType & {
  password: string
  addWalletItemApi?: ResponseApiType
  deleteWalletItemApi?: ResponseApiType
}
type StoreType = {
  hdKey: HdKey | undefined
  cards: CardType[]
  fetchWalletApi?: ResponseApiType
}
type ActionType = {
  addCard: () => void
  fetchWallet: () => (passphrase: string, password: string) => void
  addWalletItem: () => (walletItem: WalletType) => void
  deleteWalletItem: () => (path: string) => void
}

export const useStore = create<StoreType & ActionType>()(
  devtools(
    immer((set, get) => ({
      hdKey: undefined,
      cards: [],
      // Add Card
      addCard: () => {
        try {
          const hdKey = get().hdKey
          if (!hdKey) throw new Error() // TODO ......

          const path = generatePath()
          const password = generatePassword(hdKey, path)

          set(
            (state) => {
              state.cards.unshift({
                path,
                password,
                link: "",
                username: "",
                length: 15,
                hasUppercase: true,
                hasLowercase: true,
                hasNumeric: true,
                hasSymbol: true,
              })
            },
            false,
            "addCard",
          )
        } catch (e) {
          const { status, error } = getError(e)
          // TODO remove this !!!! set()...
          console.error(status, error)
        }
      },
      // Fetch wallet
      fetchWallet: () => async (passphrase, password) => {
        try {
          const hdKey = await generateHdKey(passphrase, password)
          if (!hdKey) throw new Error() // TODO ......

          set(
            (state) => {
              state.fetchWalletApi = {
                error: undefined,
                status: undefined,
                isLoading: true,
              }
            },
            false,
            `fetchWallet/${LOADING_STATUS}`,
          )

          const wallet = await fetchWalletApi(hdKey.publicExtendedKey)

          set(
            (state) => {
              state.hdKey = hdKey
              state.cards = wallet.map((item) => ({
                ...item,
                password: generatePassword(hdKey, item.path),
              }))
              state.fetchWalletApi = {
                error: undefined,
                status: 200,
                isLoading: false,
              }
            },
            false,
            `fetchWallet/${SUCCEEDED_STATUS}`,
          )
        } catch (e) {
          const { status, error } = getError(e)
          set(
            (state) => {
              state.hdKey = undefined
              state.cards = []
              state.fetchWalletApi = {
                error,
                status,
                isLoading: false,
              }
            },
            false,
            `fetchWallet/${FAILED_STATUS}`,
          )
        }
      },
      // Add or Update wallet item
      addWalletItem: () => async (walletItem) => {
        try {
          const hdKey = get().hdKey
          if (!hdKey) throw new Error() // TODO ......

          set(
            (state) => {
              const index = state.cards.findIndex(({ path }) => path === walletItem.path)
              state.cards[index].addWalletItemApi = {
                error: undefined,
                status: undefined,
                isLoading: true,
              }
            },
            false,
            `addWalletItem/${LOADING_STATUS}`,
          )

          const newWalletItem = await addWalletItemApi(hdKey.publicExtendedKey, walletItem)

          set(
            (state) => {
              const index = state.cards.findIndex(({ path }) => path === newWalletItem.path)
              state.cards[index] = {
                ...newWalletItem,
                password: generatePassword(hdKey, walletItem.path),
                addWalletItemApi: {
                  error: undefined,
                  status: 200,
                  isLoading: false,
                },
              }
            },
            false,
            `addWalletItem/${SUCCEEDED_STATUS}`,
          )
        } catch (e) {
          const { status, error } = getError(e)
          set(
            (state) => {
              const index = state.cards.findIndex(({ path }) => path === walletItem.path)
              state.cards[index].addWalletItemApi = {
                error,
                status,
                isLoading: false,
              }
            },
            false,
            `addWalletItem/${FAILED_STATUS}`,
          )
        }
      },
      // Delete wallet item
      deleteWalletItem: () => async (path) => {
        try {
          const hdKey = get().hdKey
          if (!hdKey) throw new Error() // TODO ......

          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === path)
              state.cards[index].deleteWalletItemApi = {
                error: undefined,
                status: undefined,
                isLoading: true,
              }
            },
            false,
            `deleteWalletItem/${LOADING_STATUS}`,
          )

          const pathDeleted = await deleteWalletItemApi(hdKey.publicExtendedKey, path)

          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === pathDeleted)
              state.cards.splice(index, 1)
            },
            false,
            `deleteWalletItem/${SUCCEEDED_STATUS}`,
          )
        } catch (e) {
          const { status, error } = getError(e)
          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === path)
              state.cards[index].deleteWalletItemApi = {
                error,
                status,
                isLoading: false,
              }
            },
            false,
            `deleteWalletItem/${FAILED_STATUS}`,
          )
        }
      },
    })),
  ),
)
