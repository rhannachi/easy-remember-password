import type { NextApiRequest, NextApiResponse } from "next"
import { users } from "@/mock"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { publicExtendedKey } = req.body

    const user = users.find((user) => user.publicExtendedKey === publicExtendedKey)

    if (!user) {
      return res.status(403).json({ status: 403, error: "Passphrase ou password incorrect" })
    }

    res.status(200).json({ wallet: user.wallet })
  } catch (e) {
    return res.status(500).json({ status: 500, error: "Un problème est survenu" })
  }
}
