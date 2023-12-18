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
          (state) => {
            state.cards.unshift({
              path,
              password,
              ...defaultObject,
            })
          },
          false,
          "addCard",
        )
      },
      // Fetch wallet
      fetchWallet: () => async (passphrase, password) => {
        try {
          set(
            (state) => {
              state.fetchWalletApi = {
                error: undefined,
                status: undefined,
                isLoading: true,
              }
            },
            // ({
            //   ...state,
            //   fetchWalletApi: {
            //     error: undefined,
            //     status: undefined,
            //     isLoading: true,
            //   },
            // }),
            false,
            `fetchWallet/${LOADING_STATUS}`,
          )

          const hdKey = await generateHdKey(passphrase, password)
          if (!hdKey) return
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
            // ({
            //     ...state,
            //     hdKey,
            //     cards,
            //     fetchWalletApi: {
            //       error: undefined,
            //       status: 200,
            //       isLoading: false,
            //     },
            //   }),
            false,
            `fetchWallet/${SUCCEEDED_STATUS}`,
          )
        } catch (e) {
          let error = "Un problème est survenu"
          let status = 500
          if (e instanceof ErrorApi) {
            status = e.status
            error = e.error
          }
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
            // ({
            //     ...state,
            //     hdKey: undefined,
            //     cards: undefined,
            //     fetchWalletApi: {
            //       error,
            //       status,
            //       isLoading: false,
            //     },
            //   }),
            false,
            `fetchWallet/${FAILED_STATUS}`,
          )
        }
      },
      // Add or Update wallet item
      addWalletItem: () => async (walletItem) => {
        try {
          const hdKey = get().hdKey
          if (!hdKey) return

          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === walletItem.path)
              state.cards[index].addWalletItemApi = {
                error: undefined,
                status: undefined,
                isLoading: true,
              }
            },
            // ({
            //   ...state,
            //   cards: state.cards.map((item) => {
            //     if (item.path === walletItem.path) {
            //       return {
            //         ...item,
            //         addWalletItemApi: {
            //           error: undefined,
            //           status: undefined,
            //           isLoading: true,
            //         },
            //       }
            //     }
            //     return item
            //   }),
            // }),
            false,
            `addWalletItem/${LOADING_STATUS}`,
          )

          const newWalletItem = await addWalletItemApi(hdKey.publicExtendedKey, walletItem)

          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === newWalletItem.path)
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
            // ({
            //   ...state,
            //   cards: state.cards.map((item) => {
            //     if (item.path === newWalletItem.path) {
            //       return {
            //         ...cardMapper(hdKey)(walletItem),
            //         addWalletItemApi: {
            //           error: undefined,
            //           status: 200,
            //           isLoading: false,
            //         },
            //       }
            //     }
            //     return item
            //   }),
            // }),
            false,
            `addWalletItem/${SUCCEEDED_STATUS}`,
          )
        } catch (e) {
          let error = "Un problème est survenu"
          let status = 500
          if (e instanceof ErrorApi) {
            status = e.status
            error = e.error
          }
          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === walletItem.path)
              state.cards[index].addWalletItemApi = {
                error,
                status,
                isLoading: false,
              }
            },
            // ({
            //     ...state,
            //     cards: state.cards.map((item) => {
            //       if (item.path === walletItem.path) {
            //         return {
            //           ...item,
            //           addWalletItemApi: {
            //             error,
            //             status,
            //             isLoading: false,
            //           },
            //         }
            //       }
            //       return item
            //     }),
            //   }),
            false,
            `addWalletItem/${FAILED_STATUS}`,
          )
        }
      },
      // Delete wallet item
      deleteWalletItem: () => async (path) => {
        try {
          const hdKey = get().hdKey
          if (!hdKey) return

          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === path)
              state.cards[index].deleteWalletItemApi = {
                error: undefined,
                status: undefined,
                isLoading: true,
              }
            },
            // ({
            //     ...state,
            //     cards: state.cards.map((item) => {
            //       if (item.path === path) {
            //         return {
            //           ...item,
            //           deleteWalletItemApi: {
            //             error: undefined,
            //             status: undefined,
            //             isLoading: true,
            //           },
            //         }
            //       }
            //       return item
            //     }),
            //   }),
            false,
            `deleteWalletItem/${LOADING_STATUS}`,
          )

          const pathDeleted = await deleteWalletItemApi(hdKey.publicExtendedKey, path)

          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === pathDeleted)
              state.cards.splice(index, 1)
            },
            // ({
            //     ...state,
            //     cards: state.cards.filter((item) => item.path !== pathDeleted),
            //   })

            false,
            `deleteWalletItem/${SUCCEEDED_STATUS}`,
          )
        } catch (e) {
          let error = "Un problème est survenu"
          let status = 500
          if (e instanceof ErrorApi) {
            status = e.status
            error = e.error
          }
          set(
            (state) => {
              const index = state.cards.findIndex((item) => item.path === path)
              state.cards[index].deleteWalletItemApi = {
                error,
                status,
                isLoading: false,
              }
            },
            // ({
            //     ...state,
            //     cards: state.cards.map((item) => {
            //       if (item.path === path) {
            //         return {
            //           ...item,
            //           deleteWalletItemApi: {
            //             error,
            //             status,
            //             isLoading: false,
            //           },
            //         }
            //       }
            //       return item
            //     }),
            //   }),
            false,
            `deleteWalletItem/${FAILED_STATUS}`,
          )
        }
      },
    })),
  ),
)
