import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import requests from 'services/http'
import getWidth from 'hooks/getWidth'

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
  const { xs, md, lg } = getWidth()

  return (
    <div
      id='card'
      className='col-span-6 lg:col-span-4 bg-primary pt-4 md:pt-8 border-2 border-dark rounded-md overflow-hidden duration-500 hover:scale-105 hover:shadow-lg'
    >
      <div className='text-center'>
        <Image
          width={xs ? '80px' : md ? '120px' : lg ? '150px' : '100px'}
          height={xs ? '80px' : md ? '120px' : lg ? '150px' : '100px'}
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
      <div className='pt-2 pb-5 md:py-8 text-center bg-white'>
        <Link
          href={`/bios/bio/${type !== 'userid' ? bio?.user?.uId : uId}`}
          className='bg-primary py-1 md:py-3 px-3 text-sm md:text-md md:px-6 rounded shadow text-white'>
          
            বায়োডাটা দেখুন
          
        </Link>
      </div>
    </div>
  );
}
