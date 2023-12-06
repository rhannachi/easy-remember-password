"use client"

import dynamic from "next/dynamic"
import type { CardType } from "./Card"
import { useState } from "react"
import HDNode from "hdkey"
import { PasswordType } from "@/pages/api/wallet"
import { generateWallet } from "@/helpers"

const Form = dynamic(() => import("./Form"), {
  // TODO add loader ....
  loading: () => <p className="text-white">Loading...</p>,
  ssr: false,
})
const Card = dynamic(() => import("./Card"), {
  // TODO add loader ....
  loading: () => <p className="text-white">Loading...</p>,
  ssr: false,
})
// const CardAdd = dynamic(() => import("@/components/CardAdd"), {
//   // TODO add loader ....
//   loading: () => <p className="text-white">Loading...</p>,
//   ssr: true,
// })

export default function Page() {
  const [state, setState] = useState<{
    wallet?: HDNode
    passwordList?: PasswordType[]
    cardList?: CardType[]
  }>({})

  const fetchData = async (publicExtendedKey: string): Promise<PasswordType[]> => {
    try {
      const response = await fetch("/api/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicExtendedKey: publicExtendedKey }),
      }).then((response) => response.json())

      return response.passwordList
    } catch (e) {
      throw new Error(`${e}`)
    }
  }

  const handleSubmit = async (passphrase: string, password: string) => {
    try {
      const wallet = await generateWallet(passphrase, password)
      if (!wallet) return

      const passwordList = await fetchData(wallet.publicExtendedKey)

      if (passwordList.length) {
        const cardList: CardType[] = passwordList.map((password: PasswordType) => {
          return {
            ...password,
            password: wallet.derive(password.uuid).publicExtendedKey.split("").reverse().join(""),
          }
        })

        setState((prevState) => ({
          ...prevState,
          wallet,
          passwordList,
          cardList,
        }))
      }
    } catch (e) {
      console.error(`${e}`)
    }
  }

  return (
    <section className="flex flex-col items-center">
      {/** * Header ****/}
      <header>
        <h1 className="text-white font-semibold text-center text-4xl ">Password wallet manager</h1>
        <h2 className="text-white text-justify text-lg mt-4">
          <strong>Générez</strong> et <strong>stockez tous vos mots de passe</strong> dans un seul
          endroit pratique à partir d&apos;une passphrase et d&apos;un mot de passe
        </h2>
        {/* <p className="mt-10 text-justify text-white">*/}
        {/*  Pour maximiser la sécurité, aucune de ces informations passphrase et mot de passe*/}
        {/*  n&apos;est stockée sur le serveur.*/}
        {/* </p>*/}
        {/* <p className="text-justify text-white">*/}
        {/*  Assurez-vous de mémoriser votre seed et la passphrase avec laquelle les mots de passe*/}
        {/*  seront générés.*/}
        {/* </p>*/}
      </header>
      {/** * Form ****/}
      <section className="flex flex-col max-w-md w-full">
        <article className="mt-10">
          <Form handleSubmit={handleSubmit} />
        </article>
      </section>
      {/* <section className="my-10">*/}
      {/*  <CardAdd />*/}
      {/* </section>*/}
      {/** * Cards ****/}
      <div className="my-10">
        {!state.cardList ? (
          <p className="text-white text-justify">
            Votre wallet est vide, veuillez ajouter votre premier mot de passe
          </p>
        ) : (
          <section className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {state.cardList.map((card) => (
              <Card key={card.uuid} {...card} className="m-1" />
            ))}
          </section>
        )}
      </div>
    </section>
  )
}
