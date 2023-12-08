"use client"

import dynamic from "next/dynamic"
import type { CardType } from "./Card"
import React from "react"
import { generateHdKey, generatePassword, generatePath } from "@/helpers"
import { addWalletItemApi, ErrorApi, fetchWalletApi } from "./wallet.service"
import { cardsMapper } from "@/app/wallet/page.transformer"
import HdKey from "hdkey"
import Button from "@/components/Button"
import type { WalletType } from "@/type"

const Form = dynamic(() => import("./Form"), {
  loading: () => <p className="text-white">Loading...</p>,
  ssr: false,
})
const Card = dynamic(() => import("./Card"), {
  loading: () => <p className="text-white">Loading...</p>,
  ssr: false,
})

export type ResponseApiType = {
  status?: number
  isLoading?: boolean
  error?: string
}

type StateTypes = {
  hdKey?: HdKey
  cards?: CardType[]
  fetchWalletApi: ResponseApiType
  addWalletItemApi: ResponseApiType
}

export default function Page() {
  const [state, setState] = React.useState<StateTypes>({
    hdKey: undefined,
    cards: undefined,
    addWalletItemApi: {
      status: undefined,
      error: undefined,
      isLoading: false,
    },
    fetchWalletApi: {
      status: undefined,
      error: undefined,
      isLoading: false,
    },
  })

  const fetchWalletHandler = async (passphrase: string, password: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        hdKey: undefined,
        cards: undefined,
        fetchWalletApi: {
          error: undefined,
          status: undefined,
          isLoading: true,
        },
      }))

      const hdKey = await generateHdKey(passphrase, password)
      if (!hdKey) return
      const wallet = await fetchWalletApi(hdKey.publicExtendedKey)
      const cards = cardsMapper(hdKey, wallet)

      setState((prevState) => ({
        ...prevState,
        hdKey,
        cards,
        fetchWalletApi: {
          error: undefined,
          status: 200,
          isLoading: false,
        },
      }))
    } catch (e) {
      let error = "Un problème est survenu"
      let status = 500
      if (e instanceof ErrorApi) {
        status = e.status
        error = e.error
      }
      setState((prevState) => ({
        ...prevState,
        hdKey: undefined,
        cards: undefined,
        fetchWalletApi: {
          error,
          status,
          isLoading: false,
        },
      }))
    }
  }

  const addCard = () => {
    setState((prevState) => {
      if (!prevState.hdKey) return prevState

      const defaultObject = {
        link: "",
        username: "",
        length: 15,
        hasUppercase: true,
        hasLowercase: true,
        hasNumeric: true,
        hasSymbol: true,
      }

      const path = generatePath()
      const password = generatePassword(prevState.hdKey, path)

      if (!prevState.cards?.length) {
        return {
          ...prevState,
          cards: [
            {
              uuid: path,
              password,
              ...defaultObject,
            },
          ],
        }
      }
      return {
        ...prevState,
        cards: [
          {
            uuid: path,
            password,
            ...defaultObject,
          },
          ...prevState.cards,
        ],
      }
    })
  }

  const addCardSubmitHandler = async (walletItem: WalletType) => {
    try {
      setState((prevState) => ({
        ...prevState,
        addWalletItemApi: {
          error: undefined,
          status: undefined,
          isLoading: true,
        },
      }))

      await addWalletItemApi(walletItem)

      setState((prevState) => ({
        ...prevState,
        addWalletItemApi: {
          error: undefined,
          status: 200,
          isLoading: false,
        },
      }))
    } catch (e) {
      let error = "Un problème est survenu"
      let status = 500
      if (e instanceof ErrorApi) {
        status = e.status
        error = e.error
      }
      setState((prevState) => ({
        ...prevState,
        hdKey: undefined,
        cards: undefined,
        addWalletItemApi: {
          error,
          status,
          isLoading: false,
        },
      }))
    }
  }

  const isLoading = state && state?.fetchWalletApi.isLoading
  const invalidCredential =
    !isLoading && state?.fetchWalletApi.status === 403 ? state?.fetchWalletApi.error : undefined
  const unknownError =
    !isLoading && state?.fetchWalletApi.status !== 200 && state?.fetchWalletApi.status !== 403
      ? state?.fetchWalletApi.error
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
      {!state.hdKey && (
        <section className="flex flex-col max-w-md w-full mt-10">
          <article>
            <Form
              isLoading={isLoading}
              error={invalidCredential || unknownError}
              handleSubmit={fetchWalletHandler}
            />
          </article>
        </section>
      )}
      <section className="flex h-10 mt-10 max-w-md">
        {state.hdKey && (
          <Button onClick={addCard} style="secondary" className="px-10 text-white border-white">
            <div className="flex flex-row items-center justify-between">
              <div className="mr-2">Ajouter un password</div>
              <svg
                className="h-6 w-6 fill-white"
                fill="none"
                viewBox="0 0 25 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m8.25864 21.2453c.64697-.647 1.01864-1.4729 1.115-2.3264.13077-1.1356-.24778-2.3126-1.115-3.1798-.5162-.5162-1.14941-.8603-1.81703-1.0186-1.2733-.3235-2.68425.0137-3.68913 1.0186-.69515.6952-1.0737 1.583-1.12188 2.4984-.03441.3923 0 .7984.10325 1.1907.1583.6677.50243 1.3009 1.01863 1.8171 1.52108 1.521 3.98508 1.521 5.50616 0zm-1.29395-3.4689c.3992 0 .72957.3304.72957.7296-.00688.406-.33037.7295-.73645.7364l-.72268-.0069.00688.6952c-.00688.4061-.33037.7295-.73645.7364-.40608-.0069-.72956-.3304-.73645-.7364l.00689-.6952-.72269.0069c-.40608-.0069-.72956-.3304-.73645-.7364.00689-.1996.08948-.3786.22025-.5094.13077-.1307.30972-.2133.50932-.2202h.72957v-.7571c0-.2065.08259-.3854.21336-.5162s.30972-.2134.5162-.2134c.3992 0 .72957.3304.72957.7296v.7571z" />
                  <path d="m15.0952 3.84548v3.69877h-1.46v-3.69877c0-.26281-.2336-.38935-.3894-.38935-.0486 0-.0973.00974-.146.0292l-7.71872 2.91035c-.51588.19467-.84682.68135-.84682 1.23617v.65215c-.88576.66189-1.46004 1.7228-1.46004 2.9201v-3.57225c0-1.1583.71055-2.19006 1.79098-2.59887l7.7285-2.92008c.2141-.07787.438-.11681.6521-.11681.9734 0 1.8494.78843 1.8494 1.84939z" />
                  <path d="m21.5691 14.1156v.9733c0 .2629-.2044.477-.477.4867h-1.4211c-.5159 0-.9831-.3796-1.022-.8857-.0292-.3018.0876-.584.2823-.7787.1752-.185.4185-.2823.6813-.2823h1.4698c.2823.0097.4867.2239.4867.4867z" />
                  <path d="m19.6019 12.6044h.9928c.5354 0 .9734-.438.9734-.9733v-.4283c0-2.01485-1.645-3.65983-3.6599-3.65983h-11.17415c-.82735 0-1.58657.27254-2.19979.73975-.88576.66189-1.46004 1.72288-1.46004 2.92008v1.7326c0 .3699.38934.6035.73975.4867.54508-.185 1.11937-.2823 1.69365-.2823 2.94928 0 5.35348 2.4042 5.35348 5.3535 0 .7008-.1849 1.4697-.4769 2.1511-.1558.3504.0876.769.4672.769h7.0568c2.0149 0 3.6599-1.645 3.6599-3.6599v-.1849c0-.5354-.438-.9734-.9734-.9734h-.8468c-.9344 0-1.8299-.5743-2.0733-1.4795-.1947-.7397.039-1.46.5256-1.9272.3602-.3699.8566-.5841 1.4017-.5841zm-5.334-.1946h-4.86684c-.39908 0-.73002-.331-.73002-.7301 0-.399.33094-.73.73002-.73h4.86684c.399 0 .73.331.73.73 0 .3991-.331.7301-.73.7301z" />
                </g>
              </svg>
            </div>
          </Button>
        )}
      </section>
      {/** * Cards ****/}
      <div className="my-10 text-white">
        {state.cards && (
          <section className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {state.cards.map((card) => (
              <Card
                {...card}
                key={card.uuid}
                addWalletItemApi={state.addWalletItemApi}
                handleSubmit={addCardSubmitHandler}
                className="m-1"
              />
            ))}
          </section>
        )}
      </div>
    </section>
  )
}
