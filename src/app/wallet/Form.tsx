"use client"

import Input from "@/components/Input"

export default function Form() {
  return (
    <form className="flex flex-col">
      <Input label="Passphrase:" maxLength={20} name="seed-user" placeholder="your passphrase..." />
      <Input
        label="Password:"
        className="mt-2"
        maxLength={20}
        name="passphrase-user"
        placeholder="your password..."
      />
    </form>
  )
}
