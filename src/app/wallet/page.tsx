import dynamic from "next/dynamic"
import { CardType } from "./Card"

const Form = dynamic(() => import("./Form"), {
  // TODO add loader ....
  loading: () => <p className="text-white">Loading...</p>,
  ssr: false,
})
const Card = dynamic(() => import("./Card"), {
  // TODO add loader ....
  loading: () => <p className="text-white">Loading...</p>,
  ssr: false,
})
const CardAdd = dynamic(() => import("@/components/CardAdd"), {
  // TODO add loader ....
  loading: () => <p className="text-white">Loading...</p>,
  ssr: true,
})

const cards: CardType[] = [
  {
    uuid: "2346123", // click sur g ou création new card
    link: "www.facebook.com",
    username: "rhannachi",
    password: "bla bla bla",
    hasNumeric: true,
    hasLowercase: true,
    hasUppercase: true,
    hasSymbol: true,
    length: 15,
  },
  {
    uuid: "2678SFGS", // click sur g ou création new card
    link: "www.facebook.com",
    username: "rhannachi",
    password: "bla bla bla",
    hasNumeric: true,
    hasLowercase: true,
    hasUppercase: true,
    hasSymbol: true,
    length: 15,
  },
  {
    uuid: "54GGGGSZGR", // click sur g ou création new card
    link: "www.facebook.com",
    username: "rhannachi",
    password: "bla bla bla",
    hasNumeric: true,
    hasLowercase: true,
    hasUppercase: true,
    hasSymbol: true,
    length: 15,
  },
]

export default function Page() {
  return (
    <section className="flex flex-col items-center">
      {/** * Header ****/}
      <header>
        <h1 className="text-white font-semibold text-center text-4xl ">Password wallet manager</h1>
        <h2 className="text-white text-justify text-lg mt-4">
          <strong>Générez</strong> et <strong>stockez tous vos mots de passe</strong> dans un seul
          endroit pratique à partir d&apos;une passphrase et d&apos;un mot de passe
        </h2>
      </header>
      {/** * Form ****/}
      <section className="flex flex-col max-w-md w-full">
        <article className="mt-10">
          <Form />
        </article>
        <details className="text-white mt-2">
          <summary className="font-semibold cursor-pointer">En savoir plus ?</summary>
          <p className="text-justify font-normal">
            Pour maximiser la sécurité, aucune de ces informations passphrase et mot de passe
            n&apos;est stockée sur le serveur.
          </p>
          <p>
            Assurez-vous de mémoriser votre seed et la passphrase avec laquelle les mots de passe
            seront générés.
          </p>
        </details>
      </section>
      <section className="my-10">
        <CardAdd />
      </section>
      {/** * Cards ****/}
      <section className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {cards.map((card) => (
          <Card key={card.uuid} {...card} className="m-1" />
        ))}
      </section>
    </section>
  )
}
