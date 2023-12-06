"use client"

import Input from "@/components/Input"
import Button from "@/components/Button"
import { FormEvent } from "react"

const INPUTS_NAME = ["passphrase", "password"] as const
type InputNameType = (typeof INPUTS_NAME)[number]

type FormProps = {
  handleSubmit: (passphrase: string, password: string) => void
}

export default function Form({ handleSubmit }: FormProps) {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as typeof e.target &
      Record<InputNameType, { value: string; checked: boolean }>
    const data: Record<InputNameType, string> = {
      passphrase: target["passphrase"].value.trim(),
      password: target["password"].value.trim(),
    }

    if (data.passphrase && data.password) {
      handleSubmit(data.passphrase, data.password)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <Input
        label="Passphrase:"
        // minLength={6}
        maxLength={20}
        name="passphrase"
        type="password"
        placeholder="your passphrase..."
      />
      <Input
        label="Password:"
        className="mt-3"
        // minLength={6}
        maxLength={20}
        name="password"
        type="password"
        placeholder="your password..."
      />
      <div className="flex flex-col sm:flex-row mt-5">
        <Button type="submit" text="Ajouter un password" className="w-full mb-2 sm:mb-0 sm:mr-2" />
        <Button type="submit" text="Afficher le wallet" className="w-full  " />
      </div>
    </form>
  )
}
