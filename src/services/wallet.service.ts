import { PasswordType } from "@/pages/api/wallet"

export class ErrorApi extends Error {
  status: number
  error: string
  constructor(error: string, status: number) {
    super()
    this.error = error
    this.status = status
  }
}

export const loginApi = async (publicExtendedKey: string): Promise<PasswordType[]> => {
  try {
    const response = await fetch("/api/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicExtendedKey }),
    })
    if (response.ok) {
      return (await response.json()).passwordList as PasswordType[]
    }

    throw new ErrorApi((await response.json()).error, response.status)
  } catch (e) {
    if (e instanceof ErrorApi) {
      throw e
    }
    throw new ErrorApi("Error", 500)
  }
}
