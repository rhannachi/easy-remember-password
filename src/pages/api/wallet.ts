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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { publicExtendedKey } = req.body
  console.log({ publicExtendedKey })

  res.status(200).json({ passwordList })
}
