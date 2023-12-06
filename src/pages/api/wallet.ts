import type { NextApiRequest, NextApiResponse } from "next"

export type PasswordType = {
  uuid: string
  link: string
  username: string
  hasNumeric: boolean
  hasLowercase: boolean
  hasUppercase: boolean
  hasSymbol: boolean
  length: number
}

type WalletType = {
  publicExtendedKey: string
  passwordList: PasswordType[]
}

const passwordList: PasswordType[] = [
  {
    uuid: "m/0",
    link: "www.facebook.com",
    username: "rhannachi",
    hasNumeric: true,
    hasLowercase: true,
    hasUppercase: true,
    hasSymbol: true,
    length: 15,
  },
  {
    uuid: "m/1",
    link: "www.facebook.com",
    username: "rhannachi",
    hasNumeric: true,
    hasLowercase: true,
    hasUppercase: true,
    hasSymbol: true,
    length: 15,
  },
  {
    uuid: "m/2",
    link: "www.facebook.com",
    username: "rhannachi",
    hasNumeric: true,
    hasLowercase: true,
    hasUppercase: true,
    hasSymbol: true,
    length: 15,
  },
]

const wallet: WalletType[] = [
  {
    // ramzi . ramzi
    publicExtendedKey:
      "xpub661MyMwAqRbcG43HkAorZ21tGpUfsrchZhMMCXmiZ3hj9sdPhdPsoAwvJwo7XqZK8YynXnShmNbpCCaXPRFrndMZgXSLfHzmw24GN6eFdkV",
    passwordList,
  },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { publicExtendedKey } = req.body
  console.log({ publicExtendedKey })

  const walletItem = wallet.find((item) => item.publicExtendedKey === publicExtendedKey)

  if (!walletItem) {
    return res.status(200).json({ passwordList: [] })
  }

  res.status(200).json({ passwordList: walletItem.passwordList })
}
