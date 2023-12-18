import type { IWallet } from "@/types"
import { IWalletCreatePayload } from "@/pages/api/wallet/create"
import { IWalletDeletePayload } from "@/pages/api/wallet/delete"

export class ErrorApi extends Error {
  status: number
  error: string
  constructor(error: string, status: number) {
    super()
    this.error = error
    this.status = status
  }
}

export const fetchWalletApi = async (publicExtendedKey: string): Promise<IWallet[]> => {
  try {
    const response = await fetch("/api/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicExtendedKey }),
    })
    if (response.ok) {
      return (await response.json()).wallet as IWallet[]
    }

    throw new ErrorApi((await response.json()).error, response.status)
  } catch (e) {
    if (e instanceof ErrorApi) {
      throw e
    }
    throw new ErrorApi("Error", 500)
  }
}

export const addWalletItemApi = async (
  publicExtendedKey: string,
  walletItem: IWallet,
): Promise<IWallet> => {
  try {
    const payload: IWalletCreatePayload = {
      publicExtendedKey,
      ...walletItem,
    }
    const response = await fetch("/api/wallet/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (response.ok) {
      return (await response.json()).walletItem as IWallet
    }

    throw new ErrorApi((await response.json()).error, response.status)
  } catch (e) {
    if (e instanceof ErrorApi) {
      throw e
    }
    throw new ErrorApi("Error", 500)
  }
}

export const deleteWalletItemApi = async (
  publicExtendedKey: string,
  path: string,
): Promise<string> => {
  try {
    const payload: IWalletDeletePayload = {
      publicExtendedKey,
      path,
    }
    const response = await fetch("/api/wallet/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (response.ok) {
      return (await response.json()).path as string
    }

    throw new ErrorApi((await response.json()).error, response.status)
  } catch (e) {
    if (e instanceof ErrorApi) {
      throw e
    }
    throw new ErrorApi("Error", 500)
  }
}
