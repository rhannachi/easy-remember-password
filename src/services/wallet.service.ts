import { WalletType } from "@/pages/api/wallet"

export class ErrorApi extends Error {
  status: number
  error: string
  constructor(error: string, status: number) {
    super()
    this.error = error
    this.status = status
  }
}

export const fetchApi = async (publicExtendedKey: string): Promise<WalletType[]> => {
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

// type CreateApiType = (password: WalletType) => Promise<WalletType>
// export const createApi: CreateApiType = async (password) => {
//   try {
//     const response = await fetch("/api/wallet/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...password,
//       }),
//     })
//     if (response.ok) {
//       return (await response.json()).password as WalletType
//     }
//
//     throw new ErrorApi((await response.json()).error, response.status)
//   } catch (e) {
//     if (e instanceof ErrorApi) {
//       throw e
//     }
//     throw new ErrorApi("Error", 500)
//   }
// }
