"use client"

import Input from "@/components/Input"
import Button from "@/components/Button"
import debounce from "lodash.debounce"
import React from "react"

type FormProps = {
  isLoading?: boolean
  error?: string
  handleSubmit: (passphrase: string, password: string) => void
}

const isFormValid = (state: StateType): boolean => {
  const { password, passphrase } = state
  return password.length >= 5 && passphrase.length >= 5
}

type StateType = { passphrase: string; password: string }

export default function Form({ isLoading, error, handleSubmit }: FormProps) {
  const [state, setState] = React.useState<StateType>({
    password: "",
    passphrase: "",
  })

  const debouncedPassphrase = React.useRef(
    debounce((value) => {
      setState((prevState) => ({
        ...prevState,
        passphrase: value.trim(),
      }))
    }, 500),
  ).current

  const debouncedPassword = React.useRef(
    debounce((value) => {
      setState((prevState) => ({
        ...prevState,
        password: value.trim(),
      }))
    }, 500),
  ).current

  const isFormValidMemo = React.useMemo(() => isFormValid(state), [state])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isFormValidMemo) {
      const { passphrase, password } = state
      handleSubmit(passphrase, password)
    }
  }

  React.useEffect(() => {
    return () => {
      debouncedPassphrase.cancel()
      debouncedPassword.cancel()
    }
  }, [debouncedPassphrase, debouncedPassword])

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <Input
        label="Passphrase:"
        minLength={5}
        maxLength={30}
        name="passphrase"
        type="password"
        placeholder="your passphrase..."
        onChange={(e) => debouncedPassphrase(e.target.value)}
      />
      <Input
        label="Password:"
        className="mt-3"
        minLength={5}
        maxLength={30}
        name="password"
        type="password"
        placeholder="your password..."
        onChange={(e) => debouncedPassword(e.target.value)}
      />

      <Button
        disabled={!isFormValidMemo}
        isLoading={isLoading}
        type="submit"
        className="w-full mt-5"
      >
        Accéder à mon Wallet
      </Button>
      {error && <div className="mt-5 text-center text-red-500 ">{error}</div>}
    </form>
  )
}
