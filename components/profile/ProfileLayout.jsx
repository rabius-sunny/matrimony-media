import Image from 'next/image'
import avatar from 'public/images/avatar.svg'

export default function ProfileLayout({ children }) {
  return (
    <div className='container my-8'>
      <div className='profile__grid'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 md:col-span-4'>
            <div className='rounded-md bg-red-500 p-4 text-center'>
              <Image src={avatar} height='500px' alt='profile avatar' />
              <h2 className='mt-2 text-3xl text-white'>Biodata No: 42456</h2>
              <div className='mt-8 h-1 bg-red-800'></div>
              <button className=' mt-8 w-3/4 rounded-md bg-white py-3 font-bold text-red-600 focus:ring-2 focus:ring-red-700'>
                Copy Bio Link
              </button>
            </div>
          </div>
          <div className='col-span-12 md:col-span-8'>{children}</div>
        </div>
      </div>
    </div>
  )
}
