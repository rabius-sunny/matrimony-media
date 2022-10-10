import { Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'

export default function SaveButton({ isLoading, fields }) {
  const { push } = useRouter()
  return (
    <div className='flex items-center'>
      <button
        type='submit'
        className={`${
          isLoading
            ? 'pointer-events-none cursor-not-allowed'
            : 'cursor-pointer'
        } rounded-md bg-primary  flex items-center font-medium text-white shadow-md hover:bg-primary px-4 md:px-6 py-2 text-sm md:text-md md:py-3`}
      >
        {isLoading ? <Loading color='success' size='sm' /> : 'সেভ করুন'}
      </button>
      <button
        type='button'
        onClick={() => push('/profile/preview')}
        className={`${
          fields.length
            ? 'bg-gray-300 pointer-events-none'
            : 'bg-secondary hover:bg-green-600'
        } ml-2 rounded-md text-white px-4 md:px-6 py-2 text-sm md:text-md md:py-3 shadow-md`}
      >
        প্রিভিউ দেখুন ও পাবলিশ করুন
      </button>
    </div>
  )
}
