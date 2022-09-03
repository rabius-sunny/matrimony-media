import Image from 'next/image'
import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import CSkeleton from 'components/shared/CSkeleton'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import copyToClip from 'utils/copyToClip'

export default function BioInfoCard({ data, loading, uId }) {
  const [id, setId] = useState(null)
  const [copy, setCopy] = useState(false)
  const [info, setInfo] = useState({
    type: '',
    condition: '',
    permanent_address: '',
    permanent_division: '',
    current_address: '',
    current_division: '',
    birth: '',
    complexion: '',
    height: '',
    weight: '',
    blood: '',
    profession: ''
  })
  useEffect(() => {
    data &&
      setInfo({
        type: data.type,
        condition: data.condition,
        permanent_address: data.permanent_address,
        permanent_division: data.permanent_division,
        current_address: data.current_address,
        current_division: data.current_division,
        birth: data.birth,
        complexion: data.complexion,
        height: data.height,
        weight: data.weight,
        blood: data.blood,
        profession: data.profession
      })

    const localId = localStorage.getItem('id')
    localId && setId(localId)
  }, [data])
  const handleCopy = text => {
    copyToClip(text)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }
  return (
    <div className='rounded-md bg-red-500 p-4 text-center'>
      {loading && !data ? (
        <div>
          <CSkeleton height={150} width={150} circle />
          <div className='my-2'>
            <CSkeleton height={30} width='100%' />
          </div>
          <div className='my-2'>
            <CSkeleton height={30} width='100%' />
          </div>
          <div className='my-2'>
            <CSkeleton height={30} width='100%' />
          </div>
          <div className='my-2'>
            <CSkeleton height={30} width='100%' />
          </div>
          <div className='my-2'>
            <CSkeleton height={30} width='100%' />
          </div>
          <div className='my-2'>
            <CSkeleton height={30} width='100%' />
          </div>
        </div>
      ) : (
        <div>
          {id && data?.user?._id === id ? (
            <div>
              <Image
                height='150px'
                width='150px'
                src={info.type === 'পাত্রীর বায়োডাটা' ? female : male}
                alt='profile avatar'
              />
              <h2 className='mt-2 mb-8 text-3xl text-white'>
                Biodata ID: <span className='underline'>{uId}</span>
              </h2>
            </div>
          ) : (
            <div className='flex justify-between md:px-12 mb-4'>
              <div>
                <Image
                  height='80px'
                  width='80px'
                  src={info.type === 'পাত্রীর বায়োডাটা' ? female : male}
                  alt='profile avatar'
                />
              </div>
              <div>
                <h2 className='mb-3 text-xl md:text-3xl text-white'>
                  Biodata ID: <span className='underline'>{uId}</span>
                </h2>
                <div className=''>
                  <button
                    onClick={() => handleCopy(uId)}
                    className={`block w-full rounded-md border-2 ${
                      copy ? 'border-red-800' : 'border-white'
                    } py-2 font-bold text-white`}
                  >
                    {copy ? 'Copied' : 'Copy BioID'}
                  </button>
                </div>
              </div>
            </div>
          )}
          {id && id === data?.user?._id ? (
            <div></div>
          ) : (
            <div className='item__holder2'>
              <div className='item'>
                <span>বায়োডাটার ধরণ</span>
                <span>{info.type}</span>
              </div>
              <div className='item'>
                <span>বৈবাহিক অবস্থা</span>
                <span>{info.condition}</span>
              </div>
              <div className='item'>
                <span>স্থায়ী ঠিকানা</span>
                <span>{info.permanent_address}</span>
              </div>
              <div className='item'>
                <span>স্থায়ী বিভাগ</span>
                <span>{info.permanent_division}</span>
              </div>
              <div className='item'>
                <span>বর্তমান ঠিকানা</span>
                <span>{info.current_address}</span>
              </div>
              <div className='item'>
                <span>বর্তমান বিভাগ</span>
                <span>{info.current_division}</span>
              </div>
              <div className='item'>
                <span>জন্মসন (আসল)</span>
                <span>{info.birth}</span>
              </div>
              <div className='item'>
                <span>গাত্রবর্ণ</span>
                <span>{info.complexion}</span>
              </div>
              <div className='item'>
                <span>উচ্চতা</span>
                <span>{info.height}</span>
              </div>
              <div className='item'>
                <span>ওজন</span>
                <span>{info.weight}</span>
              </div>
              <div className='item'>
                <span>রক্তের গ্রুপ</span>
                <span>{info.blood}</span>
              </div>
              <div className='item'>
                <span>পেশা</span>
                <span>{info.profession}</span>
              </div>
            </div>
          )}
          {id && id === data?.user?._id && (
            <>
              <div className='mt-6'>
                <button
                  onClick={() => handleCopy(uId)}
                  className={`block w-full rounded-md ${
                    copy ? 'bg-red-800' : 'bg-white'
                  } py-3 font-bold ${
                    copy ? 'text-white' : 'text-red-600'
                  } focus:ring-2 focus:ring-red-700`}
                >
                  {copy ? 'Copied' : 'Copy BioID'}
                </button>
              </div>
              <div className='mt-4'>
                <Link href='/profile/hide-delete'>
                  <a className='block w-full rounded-md bg-white py-3 font-bold text-red-600 focus:ring-2 focus:ring-red-700'>
                    Delete / Hide Biodata
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}