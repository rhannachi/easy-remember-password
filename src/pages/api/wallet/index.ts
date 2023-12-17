import type { NextApiRequest, NextApiResponse } from "next"
import connectDB from "@/pages/db"
import { findUser } from "@/pages/user.repo"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { publicExtendedKey } = req.body

    // TODO move ?
    await connectDB()

    const user = await findUser(publicExtendedKey)

    if (!user) {
      return res.status(200).json({ wallet: [] })
    }

    res.status(200).json({ wallet: user.wallet })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ status: 500, error: "Un problème est survenu" })
  }
}
