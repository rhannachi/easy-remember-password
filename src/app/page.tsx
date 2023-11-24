import WordHash from '@/components/WordHash'

export default function Page() {
  return (
    <main className='flex flex-col items-center py-10 md:pt-10 lg:pt-20 px-5 md:px-44 lg:px-64 xl:px-96 '>
      <div className='container'>
        <header className='flex flex-col items-center text-white'>
          <h1 className='font-semibold text-center text-3xl md:text-4xl lg:text-5xl lg:leading-snug'>
            Easy to remember password
          </h1>
          <span className='text-2xl'>*️⃣</span>
          <h2 className=' text-xl text-center mt-10'>
            Are you tired 😖 of <span className='line-through'>forgetting</span> your passwords ?
          </h2>
          <h3 className='text-justify mt-2 '>
            Generating your password with <span className='font-bold'>Easy to remember</span> words
            ✍️ and emojis 😎
          </h3>
        </header>
        <WordHash />
      </div>
    </main>
  )
}
