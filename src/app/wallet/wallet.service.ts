import type { WalletType } from "@/types"
import { WalletCreatePayloadType } from "@/pages/api/wallet/create"
import { WalletDeletePayloadType } from "@/pages/api/wallet/delete"

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

export const addWalletItemApi = async (
  publicExtendedKey: string,
  walletItem: WalletType,
): Promise<WalletType> => {
  try {
    const payload: WalletCreatePayloadType = {
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

export const deleteWalletItemApi = async (
  publicExtendedKey: string,
  path: string,
): Promise<string> => {
  try {
    const payload: WalletDeletePayloadType = {
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
