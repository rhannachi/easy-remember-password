"use client"

import ButtonIcon from "@/components/ButtonIcon"
import Input from "@/components/Input"
import Checkbox from "@/components/Checkbox"
import Range from "@/components/Range"
import Button from "@/components/Button"

export default function Card() {
  return (
    <article className="bg-white rounded p-2">
      {/** * Header ****/}
      <header className="flex items-center flex-row justify-between h-10">
        <div className="text-gray-600">Facebook</div>
        <div className="text-gray-600"> qsdf qsdf </div>
        <ButtonIcon name="close-open-card-button" svg="arrowUp" size="w-7 h-7" />
      </header>
      {/** * FORM ****/}
      <form className="flex flex-col">
        <Input placeholder="site url" name="site-url-input" className="" />
        <div className="flex flex-row">
          <Input placeholder="username" name="username-input" className=" mt-1 mr-1" />
          <ButtonIcon name="copy-username-button" svg="copy" />
        </div>
        <div className="flex flex-row">
          <Input placeholder="password" name="password-input" className="mt-1 mr-1" />
          <ButtonIcon name="regenerate-password-button" svg="regenerate" />
          <ButtonIcon name="copy-password-button" svg="copy" />
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
        <div className="flex flex-row justify-between mt-5 items-center h-11">
          <Button
            style="warning"
            text="Supprimer"
            name="remove-form-button"
            type="button"
            className="w-full"
          />
          <Button
            style="primary"
            text="Valider"
            name="submit-form-button"
            type="submit"
            className="w-full"
          />
        </div>
      </form>
    </article>
  )
}
