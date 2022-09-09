import Image from 'next/image'
import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import CSkeleton from 'components/shared/CSkeleton'
import { useEffect, useState } from 'react'
import copyToClip from 'utils/copyToClip'
import LongModal from 'components/shared/Modals/LongModal'
import { Button } from '@nextui-org/react'
import userRequest from 'services/userRequest'

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
  const [_delete, set_delete] = useState(false)
  const [hide, setHide] = useState(false)

  const ActionForm = ({ action }) => {
    const [reason, setReason] = useState('')

    const handleAction = type => {
      if (reason !== '') {
        if (action === 'ডিলিট') {
          userRequest
            .deleteHideRequest({ reason, type })
            .then(info => {
              if (info.message === 'ok') {
                alert(
                  'আপনার delete রিকুয়েস্টটি গৃহীত হয়েছে, শীঘ্রই SMS এর মাধ্যমে ফলাফল পেয়ে যাবেন ইনশা আল্লাহ!'
                )
                set_delete(false)
              }
            })
            .catch(err => {
              alert('ইরর হয়েছে, আবার চেষ্টা করুন')
              set_delete(false)
            })
        } else if (action === 'হাইড') {
          userRequest
            .deleteHideRequest({ reason, type })
            .then(info => {
              if (info.message === 'ok') {
                alert(
                  'আপনার hide রিকুয়েস্টটি গৃহীত হয়েছে, শীঘ্রই SMS এর মাধ্যমে ফলাফল পেয়ে যাবেন ইনশা আল্লাহ!'
                )
                setHide(false)
              }
            })
            .catch(err => {
              alert('ইরর হয়েছে, আবার চেষ্টা করুন')
              setHide(false)
            })
        }
      } else alert('please enter reason')
    }

    return (
      <div>
        {action === 'ডিলিট' ? (
          <p className='mb-4 font-semibold italic text-red-400'>
            বায়োডাটা “ডিলিট” এর মাধ্যমে আপনার বায়োডাটা সম্পূর্ণভাবে ওয়েবসাইট
            থেকে মুছে ফেলতে পারবেন। যা পরবর্তীতে ফিরিয়ে আনা সম্ভব না।
          </p>
        ) : (
          <p className='mb-4 font-semibold italic text-yellow-300'>
            বায়োডাটা “হাইড” এর মাধ্যমে আপনার বায়োডাটাটি সার্চ ফিল্টার থেকে গোপনে
            রাখতে পারবেন। পরবর্তীতে যে যেকোন সময় পুনরায় পাব্লিশ করতে পারবেন ইন
            শা আল্লাহ।
          </p>
        )}
        <p className='my-4 text-sm'>
          আপনার বায়োডাটা {action} করতে নিম্নোক্ত ফর্মটি পূরণের মাধ্যমে আবেদন
          করুন।
        </p>
        <div className='my-2'>
          <textarea
            onChange={({ target: { value } }) => setReason(value)}
            placeholder='সংক্ষেপে কারণ বর্ণনা করুন...'
            className='border-gray-300 border-2 mb-2 w-full p-2 focus:border-blue-500 rounded-lg'
            rows='4'
          />
          <div className='flex justify-end'>
            <Button
              type='submit'
              bordered
              auto
              color={action === 'ডিলিট' ? 'error' : 'warning'}
              onPress={() =>
                handleAction(action === 'ডিলিট' ? 'delete' : 'hide')
              }
            >
              {action} করুন
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
      <LongModal
        color='error'
        bodyColor='error'
        header='প্রোফাইলে ডিলিট করুন'
        visible={_delete}
        onClose={() => set_delete(false)}
        onTask={() => handleAction('delete')}
        preventClose={false}
        body={<ActionForm action='ডিলিট' />}
        blur={true}
      />
      <LongModal
        header='প্রোফাইল হাইড করুন'
        color='warning'
        bodyColor='warning'
        visible={hide}
        onClose={() => setHide(false)}
        onTask={() => handleAction('hide')}
        preventClose={false}
        body={<ActionForm action='হাইড' />}
        blur={true}
      />
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
            <div className='flex justify-between items-center md:px-8 mb-4'>
              <div className='flex items-center'>
                <Image
                  height='60px'
                  width='60px'
                  src={info.type === 'পাত্রীর বায়োডাটা' ? female : male}
                  alt='profile avatar'
                />
                <div className='pl-3 text-xl text-left md:text-3xl text-white'>
                  <p className=' text-sm sm:text-2xl font-semibold '>
                    Biodata ID
                  </p>{' '}
                  <p className=' text-sm sm:text-2xl font-semibold'>
                    " {uId} "
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <button
                    onClick={() => handleCopy(uId)}
                    className={`block text-sm sm:text-md px-1 sm:px-4 rounded-md border-2 ${
                      copy ? 'border-red-800' : 'border-white'
                    } py-1 sm:py-2 font-bold text-white`}
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
              <div className='btnHolder mt-4 flex rounded-md bg-white font-bold text-red-600'>
                <button
                  onClick={() => {
                    set_delete(true)
                  }}
                  className='font-semibold hover:bg-red-200'
                >
                  Delete Biodata
                </button>
                <span></span>
                <button
                  onClick={() => {
                    setHide(true)
                  }}
                  className='font-semibold hover:bg-red-200'
                >
                  Hide Biodata
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
