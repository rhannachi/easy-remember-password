import type { UserType } from "@/type"

export const users: UserType[] = [
  {
    // password: ramzi
    // pasphrase: ramzi
    publicExtendedKey:
      "xpub661MyMwAqRbcG43HkAorZ21tGpUfsrchZhMMCXmiZ3hj9sdPhdPsoAwvJwo7XqZK8YynXnShmNbpCCaXPRFrndMZgXSLfHzmw24GN6eFdkV",
    wallet: [
      {
        path: "m/0",
        link: "https://www.facebook.com",
        username: "rhannachi@gmail.com",
        hasNumeric: true,
        hasLowercase: true,
        hasUppercase: false,
        hasSymbol: true,
        length: 10,
      },
      {
        path: "m/1",
        link: "https://www.instagram.com",
        username: "ramzi@gmail.com",
        hasNumeric: true,
        hasLowercase: true,
        hasUppercase: true,
        hasSymbol: false,
        length: 15,
      },
    ],
  },
]
