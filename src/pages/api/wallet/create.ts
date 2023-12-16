import { NextApiRequest, NextApiResponse } from "next"
// import UserModel from "@/pages/user.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body
    console.log("data", data)

    // const newUser = await UserModel.create({
    //   publicExtendedKey: publicExtendedKey,
    //   wallet: [
    //     {
    //       path: "m/0",
    //       link: "https://www.facebook.com",
    //       username: "rhannachi@gmail.com",
    //       hasNumeric: true,
    //       hasLowercase: true,
    //       hasUppercase: false,
    //       hasSymbol: true,
    //       length: 10,
    //     },
    //     {
    //       path: "m/1",
    //       link: "https://www.instagram.com",
    //       username: "ramzi@gmail.com",
    //       hasNumeric: true,
    //       hasLowercase: true,
    //       hasUppercase: true,
    //       hasSymbol: false,
    //       length: 15,
    //     },
    //   ],
    // })

    res.status(200).json({
      walletItem: {
        ...data,
      },
    })
  } catch (e) {
    return res.status(500).json({ status: 500, error: "Un problème est survenu" })
  }
}
