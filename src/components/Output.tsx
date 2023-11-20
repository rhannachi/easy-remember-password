'use client'

export const Output = ({ label }: { label: string }) => {
  return (
    <div className='flex flex-row py-2 bg-gray-50 px-2 w-full justify-end'>
      <div className='text-center font-semibold text-blue-600 w-full'>{label}</div>
      <div className='absolute cursor-pointer'>📋</div>
    </div>
  )
}
