import type { NextApiRequest, NextApiResponse } from "next"

export type WalletType = {
  path: string
  link: string
  username: string
  hasNumeric: boolean
  hasLowercase: boolean
  hasUppercase: boolean
  hasSymbol: boolean
  length: number
}

type UserType = {
  publicExtendedKey: string
  wallet: WalletType[]
}

const users: UserType[] = [
  {
    // ramzi . ramzi
    publicExtendedKey:
      "xpub661MyMwAqRbcG43HkAorZ21tGpUfsrchZhMMCXmiZ3hj9sdPhdPsoAwvJwo7XqZK8YynXnShmNbpCCaXPRFrndMZgXSLfHzmw24GN6eFdkV",
    wallet: [
      {
        path: "m/0",
        link: "www.facebook.com",
        username: "rhannachi",
        hasNumeric: true,
        hasLowercase: true,
        hasUppercase: true,
        hasSymbol: true,
        length: 15,
      },
      {
        path: "m/1",
        link: "www.facebook.com",
        username: "rhannachi",
        hasNumeric: true,
        hasLowercase: true,
        hasUppercase: true,
        hasSymbol: true,
        length: 15,
      },
      {
        path: "m/2",
        link: "www.facebook.com",
        username: "rhannachi",
        hasNumeric: true,
        hasLowercase: true,
        hasUppercase: true,
        hasSymbol: true,
        length: 15,
      },
    ],
  },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { publicExtendedKey } = req.body
    console.log({ publicExtendedKey })

    const user = users.find((user) => user.publicExtendedKey === publicExtendedKey)

    if (!user) {
      return res.status(403).json({ status: 403, error: "Passphrase ou password incorrect" })
    }

    res.status(200).json({ wallet: user.wallet })
  } catch (e) {
    return res.status(500).json({ status: 500, error: "Un problème est survenu" })
  }
}
