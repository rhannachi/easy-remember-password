"use client"

import clsx from "clsx"
import React from "react"
import type { IWallet } from "@/types"
import InputCustom from "@/components/InputCustom"
import Checkbox from "@/components/Checkbox"
import Range from "@/components/Range"
import Button from "@/components/Button"
import Password from "@/components/Password"
import { CardType } from "@/app/wallet/page.state"

const isFormValid = (state: StateType) => state.link && state.username

const getFormElement = (fieldName: string, e: React.FormEvent<HTMLFormElement>) =>
  e.currentTarget.elements.namedItem(fieldName) as HTMLInputElement

const getSiteName = (link: string) => {
  try {
    const count = link.split(".").length - 1
    let siteName = link.split(".")[0]
    if (count >= 2) {
      siteName = link.split(".")[1]
    }
    return siteName.charAt(0).toUpperCase() + siteName.slice(1)
  } catch (e) {
    return link
  }
}

type StateType = Pick<CardType, "length" | "link" | "username">

export default function Card({
  uuid,
  username,
  hasNumeric,
  hasLowercase,
  hasSymbol,
  hasUppercase,
  link,
  length,
  password,
  handleSubmit,
  addWalletItemApi,
  className,
}: CardType & {
  handleSubmit: (walletItem: IWallet) => void
  className?: string
}) {
  const [state, setState] = React.useState<StateType>({
    length,
    link,
    username,
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const link = getFormElement(`site-url-${uuid}`, e).value
    const username = getFormElement(`username-${uuid}`, e).value
    const hasLowercase = getFormElement(`has-lowercase-${uuid}`, e).checked
    const hasNumeric = getFormElement(`has-numeric-${uuid}`, e).checked
    const hasUppercase = getFormElement(`has-uppercase-${uuid}`, e).checked
    const hasSymbol = getFormElement(`has-symbol-${uuid}`, e).checked
    const length = Number(getFormElement(`length-${uuid}`, e).value)

    if (!isFormValid(state)) {
      return
    }

    handleSubmit({
      path: uuid,
      username: username,
      link: link,
      hasLowercase: hasLowercase,
      hasNumeric: hasNumeric,
      hasUppercase: hasUppercase,
      hasSymbol: hasSymbol,
      length: length,
    })
  }

  const isFormValidMemo = React.useMemo(() => isFormValid(state), [state])

  return (
    <article className={clsx("w-72 shadow rounded bg-blue-600", className)}>
      {/** * Header ****/}
      <header
        className={clsx("flex flex-row items-center text-white h-14 px-3 py-2 justify-between")}
      >
        <div>
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
        <div className="px-1 basis-1/2 text-ellipsis overflow-hidden">
          {getSiteName(state.link)}
        </div>
        <div className="basis-1/2 text-ellipsis overflow-hidden">{state.username}</div>
      </header>
      {/** * FORM ****/}
      <form onSubmit={onSubmit} className="flex flex-col m-0.5 p-2 rounded-b bg-white">
        <InputCustom
          value={state.link}
          placeholder="🔗 url"
          name={`site-url-${uuid}`}
          className=" my-0.5"
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              link: e.target.value.trim(),
            }))
          }
        />
        <InputCustom
          value={state.username}
          suffixIcon="copy"
          placeholder="📧 username"
          name={`username-${uuid}`}
          className=" my-0.5"
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              username: e.target.value.trim(),
            }))
          }
        />
        <Password label={password} className="my-0.5" />

        {/** * CHECKBOX ****/}
        <div className="flex flex-row h-10 mt-1 mr-2">
          <Checkbox
            name={`has-lowercase-${uuid}`}
            className="basis-1/4"
            defaultChecked={hasLowercase}
            label="abc"
            disabled
          />
          <Checkbox
            name={`has-numeric-${uuid}`}
            className="basis-1/4 justify-center"
            defaultChecked={hasNumeric}
            label="123"
            disabled
          />
          <Checkbox
            name={`has-uppercase-${uuid}`}
            className="basis-1/4 justify-center"
            defaultChecked={hasUppercase}
            label="ABC"
          />
          <Checkbox
            name={`has-symbol-${uuid}`}
            className="basis-1/4 justify-end"
            defaultChecked={hasSymbol}
            label="#$&"
          />
        </div>
        {/** * RANGE ****/}
        <Range
          className="h-10 px-1"
          name={`length-${uuid}`}
          value={state.length}
          label={
            <div className="w-24">
              Length (<span className="text-blue-600">{state.length}</span>):
            </div>
          }
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              length: Number(e.target.value),
            }))
          }
        />
        <div className="flex flex-row justify-end mt-5 items-center">
          <Button
            disabled={!isFormValidMemo}
            style="warning"
            name="remove-form-button"
            type="button"
            className="w-full mr-1"
          >
            Supprimer
          </Button>
          <Button
            isLoading={addWalletItemApi?.isLoading}
            disabled={!isFormValidMemo}
            style="primary"
            name="submit-form-button"
            type="submit"
            className="w-full ml-1"
          >
            Valider
          </Button>
        </div>
      </form>
    </article>
  )
}
