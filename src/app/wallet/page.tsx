"use client"

import dynamic from "next/dynamic"
import type { CardType } from "./Card"
import { useState } from "react"
import { generateHdKey } from "@/helpers"
import { ErrorApi, loginApi } from "@/services/wallet.service"
import { cardListTransformer } from "@/app/wallet/page.transformer"
import HdKey from "hdkey"

const Form = dynamic(() => import("./Form"), {
  loading: () => <p className="text-white">Loading...</p>,
  ssr: false,
})
const Card = dynamic(() => import("./Card"), {
  loading: () => <p className="text-white">Loading...</p>,
  ssr: false,
})

type StateTypes = {
  hdKey?: HdKey
  cardList?: CardType[]
  login: {
    status?: number
    isLoading?: boolean
    error?: string
  }
}

export default function Page() {
  const [state, setState] = useState<StateTypes>({
    hdKey: undefined,
    cardList: undefined,
    login: {
      error: undefined,
      status: undefined,
      isLoading: false,
    },
  })

  const handleSubmit = async (passphrase: string, password: string) => {
    try {
      setState({
        hdKey: undefined,
        cardList: undefined,
        login: {
          error: undefined,
          status: undefined,
          isLoading: true,
        },
      })

      const hdKey = await generateHdKey(passphrase, password)
      if (!hdKey) return
      const passwordList = await loginApi(hdKey.publicExtendedKey)
      const cardList = cardListTransformer(hdKey, passwordList)

      setState({
        hdKey,
        cardList,
        login: {
          error: undefined,
          status: 200,
          isLoading: false,
        },
      })
    } catch (e) {
      let error = "Un problème est survenu"
      let status = 500
      if (e instanceof ErrorApi) {
        status = e.status
        error = e.error
      }
      setState({
        hdKey: undefined,
        cardList: undefined,
        login: {
          error,
          status,
          isLoading: false,
        },
      })
    }
  }

  const isLoading = state && state?.login.isLoading
  const invalidCredential =
    !isLoading && state?.login.status === 403 ? state?.login.error : undefined
  const unknownError =
    !isLoading && state?.login.status !== 200 && state?.login.status !== 403
      ? state?.login.error
      : undefined

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
          <Form
            isLoading={isLoading}
            error={invalidCredential || unknownError}
            handleSubmit={handleSubmit}
          />
        </article>
      </section>
      {/* <section className="my-10">*/}
      {/*  <CardAdd />*/}
      {/* </section>*/}
      {/** * Cards ****/}
      <div className="my-10 text-white">
        {state && state.cardList && (
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
