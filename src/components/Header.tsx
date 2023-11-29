import Link from 'next/link'

export default function Header() {
  return (
    <header className='bg-[#2872EC] flex justify-center'>
      <nav className='container text-white p-4 flex justify-between flex-wrap'>
        <h1 className='text-2xl font-bold mr-10 '>
          <Link className='flex flex-row lg:mt-0 text-white' href='/'>
            <svg
              className='mr-1'
              width='35'
              height='36'
              viewBox='0 0 48 49'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='48' height='48' fill='white' fillOpacity='0.01' />
              <path d='M48 1H0V49H48V1Z' fill='white' fillOpacity='0.01' />
              <path
                d='M6 9.25564L24.0086 4L42 9.25564V20.0337C42 31.3622 34.7502 41.4194 24.0026 45.0005C13.2521 41.4195 6 31.36 6 20.0287V9.25564Z'
                fill='#2F88FF'
                stroke='black'
                strokeWidth='4'
                strokeLinejoin='round'
              />
              <path
                d='M29.5 18.4081L18.1863 29.7218'
                stroke='white'
                strokeWidth='4'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M18.1863 18.4081L29.5 29.7218'
                stroke='white'
                strokeWidth='4'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            MyPass
          </Link>
        </h1>

        <button className='block lg:hidden flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white'>
          <svg className='h-3 w-3' viewBox='0 0 20 20' fill='currentColor'>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
        <ul className='w-full block flex-grow lg:flex lg:items-center lg:w-auto text-sm font-bold'>
          <li>
            <Link
              className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4'
              href='/generator'
            >
              Generator
            </Link>
          </li>
          <li>
            <Link
              className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4'
              href='/wallet'
            >
              Wallet
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
