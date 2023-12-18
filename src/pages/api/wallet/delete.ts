import { NextApiRequest, NextApiResponse } from "next"
import connectDB from "@/pages/db"
import { UserModel } from "@/pages/user.model"
import { findUser } from "@/pages/user.repo"

export interface IWalletDeletePayload {
  path: string
  publicExtendedKey: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { publicExtendedKey, path } = req.body as IWalletDeletePayload

    // TODO move ?
    await connectDB()

    const user = await findUser(publicExtendedKey)

    if (!user) {
      return res.status(404).json({
        status: 404,
        error: "user not found",
      })
    }

    const exist = user.wallet.findIndex((item) => item.path === path) >= 0

    if (!exist) {
      return res.status(404).json({
        status: 404,
        error: "wallet item not found",
      })
    }

    const newWallet = user.wallet.filter((item) => item.path !== path)

    await UserModel.updateOne(
      { publicExtendedKey: user.publicExtendedKey },
      {
        $set: {
          wallet: newWallet,
        },
      },
      {},
    )
      .lean()
      .exec()

    res.status(200).json({ path })
  } catch (e) {
    return res.status(500).json({ status: 500, error: "Un problème est survenu" })
  }
}
