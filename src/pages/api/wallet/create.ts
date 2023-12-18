import { NextApiRequest, NextApiResponse } from "next"
import connectDB from "@/pages/db"
import { findUser } from "@/pages/user.repo"
import { UserModel } from "@/pages/user.model"
import { WalletType } from "@/types"

export type WalletCreatePayloadType = WalletType & {
  publicExtendedKey: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { publicExtendedKey, ...walletItem } = req.body as WalletCreatePayloadType

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

    const exist = user.wallet.findIndex((item) => item.path === walletItem.path) >= 0

    let newWallet = [walletItem, ...user.wallet]

    if (exist) {
      newWallet = user.wallet.map((item) => {
        if (item.path === walletItem.path) {
          return walletItem
        }
        return item
      })
    }

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

    res.status(200).json({
      publicExtendedKey,
      walletItem,
    })
  } catch (e) {
    return res.status(500).json({ status: 500, error: "Un problème est survenu" })
  }
}
