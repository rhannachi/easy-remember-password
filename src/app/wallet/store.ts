import { WalletType } from "@/types"
import HdKey from "hdkey"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { generateHdKey, generatePassword, generatePath } from "@/helpers"
import {
  addWalletItemApi,
  deleteWalletItemApi,
  ErrorApi,
  fetchWalletApi,
} from "@/app/wallet/wallet.service"
import { cardMapper, cardsMapper } from "@/app/wallet/page.mapper"

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
export type StoreType = {
  hdKey: HdKey | undefined
  cards: CardType[]
  fetchWalletApi?: ResponseApiType
  addCard: () => void
  fetchWallet: () => (passphrase: string, password: string) => void
  addWalletItem: () => (walletItem: WalletType) => void
  deleteWalletItem: () => (path: string) => void
}

export const useStore = create<StoreType>()(
  devtools((set, get) => ({
    hdKey: undefined,
    cards: [],
    // Add Card
    addCard: () => {
      const hdKey = get().hdKey
      if (!hdKey) return

      const defaultObject = {
        link: "",
        username: "",
        length: 15,
        hasUppercase: true,
        hasLowercase: true,
        hasNumeric: true,
        hasSymbol: true,
      }

      const path = generatePath()
      const password = generatePassword(hdKey, path)

      set(
        (state) => ({
          ...state,
          cards: [
            {
              path,
              password,
              ...defaultObject,
            },
            ...state.cards,
          ],
        }),
        false,
        "addCard",
      )
    },
    // Fetch wallet
    fetchWallet: () => async (passphrase, password) => {
      try {
        set((state) => ({
          ...state,
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

        set((state) => ({
          ...state,
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
        set((state) => ({
          ...state,
          hdKey: undefined,
          cards: undefined,
          fetchWalletApi: {
            error,
            status,
            isLoading: false,
          },
        }))
      }
    },
    // Add or Update wallet item
    addWalletItem: () => async (walletItem) => {
      try {
        const hdKey = get().hdKey
        if (!hdKey) return

        set((state) => ({
          ...state,
          cards: state.cards.map((item) => {
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

        set((state) => ({
          ...state,
          cards: state.cards.map((item) => {
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
        set((state) => ({
          ...state,
          cards: state.cards.map((item) => {
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
    },
    // Delete wallet item
    deleteWalletItem: () => async (path) => {
      try {
        const hdKey = get().hdKey
        if (!hdKey) return

        set((state) => ({
          ...state,
          cards: state.cards.map((item) => {
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

        set((state) => ({
          ...state,
          cards: state.cards.filter((item) => item.path !== pathDeleted),
        }))
      } catch (e) {
        let error = "Un problème est survenu"
        let status = 500
        if (e instanceof ErrorApi) {
          status = e.status
          error = e.error
        }
        set((state) => ({
          ...state,
          cards: state.cards.map((item) => {
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
    },
  })),
)
