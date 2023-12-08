"use client"

import clsx from "clsx"
import React from "react"
import type { WalletType } from "@/type"
import InputCustom from "@/components/InputCustom"
import Checkbox from "@/components/Checkbox"
import Range from "@/components/Range"
import Button from "@/components/Button"
import Password from "@/components/Password"
import type { CardType } from "./type"

const getFormElement = (fieldName: string, e: React.FormEvent<HTMLFormElement>) =>
  e.currentTarget.elements.namedItem(fieldName) as HTMLInputElement

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
  handleSubmit: (walletItem: WalletType) => void
  className?: string
}) {
  const [state, setState] = React.useState<Pick<CardType, "length" | "link" | "username">>({
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

    // todo add function validation
    if (!link || !username) return

    const walletItem: WalletType = {
      path: uuid,
      username: username,
      link: link,
      hasLowercase: hasLowercase,
      hasNumeric: hasNumeric,
      hasUppercase: hasUppercase,
      hasSymbol: hasSymbol,
      length: length,
    }

    handleSubmit(walletItem)
  }

  return (
    <article className={clsx("w-72 shadow rounded bg-blue-600", className)}>
      {/** * Header ****/}
      <header
        className={clsx("flex flex-row items-center text-white h-14 px-3 py-2 justify-between")}
      >
        <div className="basis-1/3 text-lg">{state.link.split(".")[1]}</div>
        <div className="basis-1/3 text-sm ">{state.username}</div>
      </header>
      {/** * FORM ****/}
      <form onSubmit={onSubmit} className="flex flex-col m-0.5 p-2 rounded-b bg-white">
        <InputCustom
          value={state.link}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              link: e.target.value,
            }))
          }
          placeholder="site url"
          name={`site-url-${uuid}`}
          className=" my-0.5"
        />
        <InputCustom
          value={state.username}
          suffixIcon="copy"
          placeholder="username"
          name={`username-${uuid}`}
          className=" my-0.5"
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              username: e.target.value,
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
          <Button style="warning" name="remove-form-button" type="button" className="w-full mr-1">
            Supprimer
          </Button>
          <Button
            isLoading={addWalletItemApi?.isLoading}
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
