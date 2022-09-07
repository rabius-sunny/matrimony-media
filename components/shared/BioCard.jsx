import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import requests from 'services/http'

export default function BioCard({ bio, type }) {
  const [uId, setUId] = useState(null)
  useEffect(() => {
    if (type === 'userid') {
      requests
        .get(`/bio-uId/${bio.user}`)
        .then(data => setUId(data.uId))
        .catch(err => err)
    }
  }, [bio.user, type])

  return (
    <div className='col-span-12 sm:col-span-6 lg:col-span-4 bg-red-600 pt-8 border-2 border-red-500 duration-500 hover:scale-105 hover:shadow-lg'>
      <div className='text-center'>
        <Image
          width='150px'
          height='150px'
          src={bio.type === 'পাত্রের বায়োডাটা' ? male : female}
          alt='avatar'
        />
      </div>
      <div className='search-body'>
        <span>বৈবাহিক অবস্থা </span>
        <p>{bio.condition}</p>
        <span>জন্মসন </span>
        <p>{bio.birth}</p>
        <span id='lastspan'>পেশা </span>
        <p>{bio.profession}</p>
      </div>
      <div className='py-8 text-center bg-white'>
        <Link href={`/bios/bio/${type !== 'userid' ? bio?.user?.uId : uId}`}>
          <a className='bg-red-500 py-3 px-6 rounded shadow text-white'>
            বায়োডাটা দেখুন
          </a>
        </Link>
      </div>
    </div>
  )
}
