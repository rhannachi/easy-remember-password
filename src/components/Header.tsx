import Link from 'next/link'

export default function Header() {
  return (
    <header className='bg-[#2872EC] flex justify-center'>
      <nav className='container text-white p-4 flex items-center justify-between flex-wrap'>
        <h1 className='text-2xl font-bold mr-10 '>
          <Link className='block lg:inline-block lg:mt-0 text-white hover:text-gray-300' href='/'>
            <div className='flex flex-row items-center'>
              MyPass
              <svg
                className='ml-1'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M21 12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5z'></path>
                <rect x='3' y='13' width='18' height='8' rx='2' ry='2'></rect>
              </svg>
            </div>
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
