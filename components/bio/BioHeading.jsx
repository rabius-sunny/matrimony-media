import { PencilAltIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export default function BioHeading({ heading, children, link }) {
  return (
    <div className='rounded-t-md overflow-hidden'>
      <div className='border-x-4 border-b-4 border-dark'>
        <h1 className='flex justify-between bg-primary  text-white text-xl sm:text-3xl p-4'>
          <span>{heading}</span>
          {link && (
            <Link href={`/profile/edit/${link}`}>
              <PencilAltIcon className='h-7 w-7 sm:h-10 sm:w-10  cursor-pointer hover:text-blue-500' />
            </Link>
          )}
        </h1>
        <div className='p-4 item__holder'>{children}</div>
      </div>
    </div>
  )
}
