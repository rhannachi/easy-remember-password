"use client"

import ButtonIcon from "@/components/ButtonIcon"
import Input from "@/components/Input"
import Checkbox from "@/components/Checkbox"
import Range from "@/components/Range"
import Button from "@/components/Button"
import clsx from "clsx"
import { SyntheticEvent, useState } from "react"

const INPUTS_NAME = [
  "site-url",
  "username-input",
  "password-input",
  "password-has-lowercase",
  "password-has-numeric",
  "password-has-uppercase",
  "password-has-symbol-character",
  "password-length-input",
] as const
type InputNameType = (typeof INPUTS_NAME)[number]

export type CardType = {
  uuid: string
  link: string
  username: string
  password: string
  hasNumeric: boolean
  hasLowercase: boolean
  hasUppercase: boolean
  hasSymbol: boolean
  length: number
}

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
  className,
}: CardType & { className?: string }) {
  const [state, setState] = useState<Pick<CardType, "length" | "link" | "username">>({
    length,
    link,
    username,
  })

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target &
      Record<`${InputNameType}-${string}`, { value: string; checked: boolean }>
    const data: Record<InputNameType, string | boolean | number> = {
      "site-url": target[`site-url-input-${uuid}`].value,
      "username-input": target[`username-input-${uuid}`].value,
      "password-input": target[`password-input-${uuid}`].value,
      "password-has-lowercase": target[`password-has-lowercase-checkbox-${uuid}`].checked,
      "password-has-numeric": target[`password-has-numeric-checkbox-${uuid}`].checked,
      "password-has-uppercase": target[`password-has-uppercase-checkbox-${uuid}`].checked,
      "password-has-symbol-character":
        target[`password-has-symbol-character-checkbox-${uuid}`].checked,
      "password-length-input": Number(target[`password-length-input-${uuid}`].value),
    }
    console.log("==>", data)
  }

  return (
    <article className={clsx("max-w-md shadow rounded bg-blue-600", className)}>
      {/** * Header ****/}
      <header className={clsx("flex flex-row items-center text-white h-14 p-2 justify-between")}>
        <div className="basis-1/3 text-lg">{state.link.split(".")[1]}</div>
        <div className="basis-1/3 text-sm ">{state.username}</div>
      </header>
      {/** * FORM ****/}
      <form
        id={uuid}
        onSubmit={handleSubmit}
        className="flex flex-col m-0.5 p-2 rounded-b bg-white"
      >
        <Input
          value={state.link}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              link: e.target.value,
            }))
          }
          placeholder="site url"
          name={`site-url-input-${uuid}`}
          className=""
        />
        <div className="flex flex-row">
          <Input
            value={state.username}
            placeholder="username"
            name={`username-input-${uuid}`}
            className=" mt-1 mr-2"
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
          <ButtonIcon name="copy-username-button" className="ml-1" svg="copy" size="w-5 h-5" />
        </div>
        <div className="flex flex-row">
          <Input
            defaultValue={password}
            type="password"
            placeholder="password"
            name={`password-input-${uuid}`}
            className="mt-1 mr-1"
            autoComplete="off"
            disabled
          />
          <ButtonIcon
            name="regenerate-password-button"
            className="mx-2"
            svg="regenerate"
            size="w-5 h-5"
          />
          <ButtonIcon name="copy-password-button" className="ml-1" svg="copy" size="w-5 h-5" />
        </div>
        {/** * CHECKBOX ****/}
        <div className="flex flex-row h-10 mt-1 mr-2">
          <Checkbox
            name={`password-has-lowercase-checkbox-${uuid}`}
            className="basis-1/4"
            defaultChecked={hasLowercase}
            label="abc"
            disabled
          />
          <Checkbox
            name={`password-has-numeric-checkbox-${uuid}`}
            className="basis-1/4 justify-center"
            defaultChecked={hasNumeric}
            label="123"
            disabled
          />
          <Checkbox
            name={`password-has-uppercase-checkbox-${uuid}`}
            className="basis-1/4 justify-center"
            defaultChecked={hasUppercase}
            label="ABC"
          />
          <Checkbox
            name={`password-has-symbol-character-checkbox-${uuid}`}
            className="basis-1/4 justify-end"
            defaultChecked={hasSymbol}
            label="#$&"
          />
        </div>
        {/** * RANGE ****/}
        <Range
          className="h-10 px-1"
          name={`password-length-input-${uuid}`}
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
            style="warning"
            text="Supprimer"
            name="remove-form-button"
            type="button"
            className="w-full mr-1"
          />
          <Button
            style="primary"
            text="Valider"
            name="submit-form-button"
            type="submit"
            className="w-full ml-1"
          />
        </div>
      </form>
    </article>
  )
}
