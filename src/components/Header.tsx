import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav>
        <ul className='text-white'>
          <li>
            <Link href='/generator'>Generator</Link>
          </li>
          <li>
            <Link href='/wallet'>Wallet</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
