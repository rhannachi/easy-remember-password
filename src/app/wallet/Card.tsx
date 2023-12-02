"use client"

import ButtonIcon from "@/components/ButtonIcon"
import Input from "@/components/Input"
import Checkbox from "@/components/Checkbox"
import Range from "@/components/Range"
import Button from "@/components/Button"
import { useState } from "react"
import clsx from "clsx"

export default function Card() {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="shadow">
      {/** * Header ****/}
      <header
        className={clsx(
          "flex flex-row items-center text-white h-14 p-3 bg-blue-600 justify-between h-10",
          expanded ? "rounded-t" : "rounded",
        )}
      >
        <div className="basis-1/3 text-lg">Facebook</div>
        <div className="basis-1/3 text-center ">ramzi.hanna***</div>
        <div className="flex justify-end basis-1/3 text-end">
          <ButtonIcon
            name="close-open-card-button"
            className={clsx(!expanded && "rotate-180")}
            svg="arrowUp"
            size="w-7 h-7"
            onClick={() => {
              setExpanded((prevState) => !prevState)
            }}
          />
        </div>
      </header>
      {/** * FORM ****/}
      {expanded && (
        <form className="flex flex-col p-3 rounded-b bg-white">
          <Input placeholder="site url" name="site-url-input" className="" />
          <div className="flex flex-row">
            <Input placeholder="username" name="username-input" className=" mt-1 mr-1" />
            <ButtonIcon name="copy-username-button" className="ml-1" svg="copy" />
          </div>
          <div className="flex flex-row">
            <Input placeholder="password" name="password-input" className="mt-1 mr-1" />
            <ButtonIcon name="regenerate-password-button" className="mx-1" svg="regenerate" />
            <ButtonIcon name="copy-password-button" className="ml-1" svg="copy" />
          </div>
          {/** * CHECKBOX ****/}
          <div className="flex flex-row h-10 mt-1 mr-2">
            <Checkbox
              name="password-contains-lowercase-checkbox"
              className="basis-1/4"
              checked={true}
              label="abc"
              disabled
            />
            <Checkbox
              name="password-contains-numeric-checkbox"
              className="basis-1/4 justify-center"
              checked={true}
              label="123"
              disabled
            />
            <Checkbox
              name="password-contains-uppercase-checkbox"
              className="basis-1/4 justify-center"
              checked={true}
              onChange={() => {}}
              label="ABC"
            />
            <Checkbox
              name="password-contains-special-character-checkbox"
              className="basis-1/4 justify-end"
              onChange={() => {}}
              checked={true}
              label="#$&"
            />
          </div>
          {/** * RANGE ****/}
          <Range
            className="h-10 px-1"
            name="password-length"
            label={
              <div className="w-24">
                Length (<span className="text-blue-600">{15}</span>):
              </div>
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
      )}
    </article>
  )
}
