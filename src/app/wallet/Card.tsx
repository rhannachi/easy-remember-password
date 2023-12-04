"use client"

import ButtonIcon from "@/components/ButtonIcon"
import Input from "@/components/Input"
import Checkbox from "@/components/Checkbox"
import Range from "@/components/Range"
import Button from "@/components/Button"
import clsx from "clsx"

export default function Card({ className }: { className?: string }) {
  return (
    <article className={clsx("max-w-md shadow rounded bg-blue-600", className)}>
      {/** * Header ****/}
      <header className={clsx("flex flex-row items-center text-white h-14 p-2 justify-between")}>
        <div className="basis-1/3 text-lg">Facebook</div>
        <div className="basis-1/3 text-sm ">ramzi.hanna***</div>
        {/* <div className="flex justify-end basis-1/3 text-end">*/}
        {/*  <ButtonIcon*/}
        {/*    name="close-open-card-button"*/}
        {/*    className={clsx(!expanded && "rotate-180")}*/}
        {/*    svg="arrowUp"*/}
        {/*    size="w-7 h-7"*/}
        {/*  />*/}
        {/* </div>*/}
      </header>
      {/** * FORM ****/}
      <form className="flex flex-col m-0.5 p-2 rounded-b bg-white">
        <Input placeholder="site url" name="site-url-input" className="" />
        <div className="flex flex-row">
          <Input placeholder="username" name="username-input" className=" mt-1 mr-2" />
          <ButtonIcon name="copy-username-button" className="ml-1" svg="copy" size="w-5 h-5" />
        </div>
        <div className="flex flex-row">
          <Input placeholder="password" name="password-input" className="mt-1 mr-1" />
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
    </article>
  )
}
