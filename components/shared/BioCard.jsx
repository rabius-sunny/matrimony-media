import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export default function BioCard({ bios }) {
  return (
    <div className='my-4' style={{ minHeight: '60vh' }}>
      <div className='grid grid-cols-12 gap-8'>
        {bios.map(item => (
          <div
            key={item?._id}
            className='col-span-12 sm:col-span-6 lg:col-span-4 bg-red-600 pt-8 border-2 border-red-500 duration-500 hover:scale-105 hover:shadow-lg'
          >
            <div className='text-center'>
              <Image
                width='150px'
                height='150px'
                src={item?.type === 'পাত্রের বায়োডাটা' ? male : female}
                alt='avatar'
              />
            </div>
            <div class='search-body'>
              <span>বৈবাহিক অবস্থা </span>
              <p>{item?.condition}</p>
              <span>জন্মসন </span>
              <p>{item?.birth}</p>
              <span id='lastspan'>পেশা </span>
              <p>{item?.profession}</p>
            </div>
            <div className='py-8 text-center bg-white'>
              <Link href={`/bios/bio/${item?.user.username || item?._id}`}>
                <a className='bg-red-500 py-3 px-6 rounded shadow text-white'>
                  বায়োডাটা দেখুন
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
