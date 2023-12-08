import type { WalletType } from "@/type"

export class ErrorApi extends Error {
  status: number
  error: string
  constructor(error: string, status: number) {
    super()
    this.error = error
    this.status = status
  }
}

export const fetchWalletApi = async (publicExtendedKey: string): Promise<WalletType[]> => {
  try {
    const response = await fetch("/api/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicExtendedKey }),
    })
    if (response.ok) {
      return (await response.json()).wallet as WalletType[]
    }

    throw new ErrorApi((await response.json()).error, response.status)
  } catch (e) {
    if (e instanceof ErrorApi) {
      throw e
    }
    throw new ErrorApi("Error", 500)
  }
}

export const addWalletItemApi = async (walletItem: WalletType): Promise<WalletType> => {
  try {
    const response = await fetch("/api/wallet/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...walletItem,
      }),
    })
    if (response.ok) {
      return (await response.json()).walletItem as WalletType
    }

    throw new ErrorApi((await response.json()).error, response.status)
  } catch (e) {
    if (e instanceof ErrorApi) {
      throw e
    }
    throw new ErrorApi("Error", 500)
  }
}
