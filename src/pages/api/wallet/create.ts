import { NextApiRequest, NextApiResponse } from "next"
import connectDB from "@/pages/db"
import { findUser } from "@/pages/user.repo"
import { UserModel } from "@/pages/user.model"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { publicExtendedKey, ...walletItem } = req.body

    // TODO move ?
    await connectDB()

    const user = await findUser(publicExtendedKey)

    if (!user) {
      const newUser = await UserModel.create({
        publicExtendedKey: publicExtendedKey,
        wallet: [walletItem],
      })

      return res.status(200).json({
        publicExtendedKey: newUser.publicExtendedKey,
        walletItem,
      })
    }

    const newWallet = [walletItem, ...user.wallet]

    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: {
          wallet: newWallet,
        },
      },
      {},
    )
      .lean()
      .exec()

    // TODO ....
    res.status(200).json({
      publicExtendedKey,
      walletItem,
    })
  } catch (e) {
    return res.status(500).json({ status: 500, error: "Un problème est survenu" })
  }
}
