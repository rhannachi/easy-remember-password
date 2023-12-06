"use client"

import Button from "@/components/Button"
import clsx from "clsx"
import { useState } from "react"
import InputCustom from "@/components/InputCustom"
import Checkbox from "@/components/Checkbox"
import Range from "@/components/Range"
import Password from "@/components/Password"

export default function CardAdd() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button
        style="secondary"
        text="Ajouter un password"
        className="px-6 bg-white"
        name="add-password-button"
        onClick={() => setShowModal(true)}
      />
      <article
        className={clsx(
          showModal ? "block" : "hidden",
          "shadow fixed z-10 pt-10 md:pt-64 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.9)]",
        )}
      >
        <div className="flex flex-col w-72 sm:w-80 bg-blue-600 m-auto px-1 pb-1 rounded ">
          <header className="flex flex-row justify-between py-3 px-2 items-center text-white">
            <span>Ajouter un password</span>
            <button
              role="button"
              onClick={() => setShowModal(false)}
              className="float-right text-2xl font-bold"
            >
              &times;
            </button>
          </header>
          <form className="flex flex-col bg-white h-full p-2 ">
            <InputCustom
              suffixIcon="copy"
              placeholder="site url"
              name={"site-url-input-"}
              className="my-0.5"
            />

            <InputCustom
              suffixIcon="copy"
              placeholder="username"
              name={"username-input-"}
              className="my-0.5"
            />

            <Password label="TODO" className="my-0.5" />

            {/** * CHECKBOX ****/}
            <div className="flex flex-row h-10 mt-1 mr-2">
              <Checkbox
                name={"password-has-lowercase-checkbox-"}
                className="basis-1/4"
                defaultChecked={true}
                label="abc"
                disabled
              />
              <Checkbox
                name={"password-has-numeric-checkbox-"}
                className="basis-1/4 justify-center"
                defaultChecked={true}
                label="123"
                disabled
              />
              <Checkbox
                name={"password-has-uppercase-checkbox-"}
                className="basis-1/4 justify-center"
                defaultChecked={true}
                label="ABC"
              />
              <Checkbox
                name={"password-has-symbol-character-checkbox-"}
                className="basis-1/4 justify-end"
                defaultChecked={true}
                label="#$&"
              />
            </div>
            {/** * RANGE ****/}
            <Range
              className="h-10 px-1"
              name={"password-length-input-"}
              label={
                <div className="w-24">
                  Length (<span className="text-blue-600">15</span>):
                </div>
              }
            />
            <div className="flex flex-row justify-end mt-5 items-center">
              <Button
                style="primary"
                text="Valider"
                name="submit-form-button"
                type="submit"
                className="w-full ml-1"
              />
            </div>
          </form>
        </div>
      </article>
    </>
  )
}
