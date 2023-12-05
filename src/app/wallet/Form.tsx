"use client"

import Input from "@/components/Input"
import Button from "@/components/Button"

export default function Form() {
  const handleSubmit = () => {}
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Input label="Passphrase:" maxLength={20} name="seed-user" placeholder="your passphrase..." />
      <Input
        label="Password:"
        className="mt-3"
        maxLength={20}
        name="passphrase-user"
        placeholder="your password..."
      />
      <Button type="submit" text="Afficher le wallet" className="px-6 mt-5" />
    </form>
  )
}
