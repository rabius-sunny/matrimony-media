import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function BioCard({ bio }) {
  return (
    <div
      id='card'
      className='col-span-6 lg:col-span-4 bg-primary pt-4 md:pt-8 border-2 border-dark rounded-md overflow-hidden duration-500 hover:scale-105 hover:shadow-lg'
    >
      <div className='flex justify-center mb-4'>
        <Image
          width={40}
          height={40}
          priority
          className='size-32 md:size-52'
          src={bio.bio.type === 'পাত্রের বায়োডাটা' ? male : female}
          alt='avatar'
        />
      </div>
      <div className='search-body'>
        <span className='text-xs sm:text-sm'>বৈবাহিক অবস্থা </span>
        <p className='text-xs sm:text-sm'>{bio.bio.condition}</p>
        <span className='text-xs sm:text-sm'>জন্মসন </span>
        <p className='text-xs sm:text-sm'>{bio.bio.birth}</p>
        <span
          className='text-xs sm:text-sm'
          id='lastspan'
        >
          পেশা{' '}
        </span>
        <p className='text-xs sm:text-sm'>{bio.bio.profession}</p>
      </div>
      <div className='pt-2 pb-5 md:py-8 text-center bg-white'>
        <Link
          href={`/bios/bio/${bio.uId}`}
          className='bg-primary py-1 md:py-3 px-3 text-sm md:text-md md:px-6 rounded shadow text-white'
        >
          বায়োডাটা দেখুন
        </Link>
      </div>
    </div>
  )
}
