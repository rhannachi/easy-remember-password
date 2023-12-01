import dynamic from "next/dynamic"

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

export default function Page() {
  return (
    <section>
      {/** * Header ****/}
      <header>
        <h1 className="text-white font-semibold text-center text-4xl ">Password wallet manager</h1>
        <h2 className="text-white text-justify text-lg mt-4">
          <strong>Générez</strong> et <strong>stockez tous vos mots de passe</strong> dans un seul
          endroit pratique à partir d&apos;une passphrase et d&apos;un mot de passe
        </h2>
      </header>
      {/** * Form ****/}
      <section>
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
      {/** * Cards ****/}
      <section className="mt-10">
        <Card />
      </section>
    </section>
  )
}
