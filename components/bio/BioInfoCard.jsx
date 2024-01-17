import Image from 'next/image'
import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import CSkeleton from 'components/shared/CSkeleton'
import { useState } from 'react'
import copyToClip from 'utils/copyToClip'
import LongModal from 'components/shared/Modals/LongModal'
import { Button } from '@nextui-org/react'
import userRequest from 'services/network/userRequest'

export default function BioInfoCard({
  data: {
    type,
    condition,
    permanent_jilla,
    permanent_division,
    current_jilla,
    current_division,
    birth,
    complexion,
    height,
    weight,
    blood,
    profession
  },
  loading,
  uId
}) {
  const [copy, setCopy] = useState(false)
  const [_delete, set_delete] = useState(false)
  const [hide, setHide] = useState(false)

  const HideAction = () => {
    const handleHide = () => {
      userRequest
        .hideByUser()
        .then((info) => {
          if (message === 'ok') {
            setHide(false)
            window.location.reload()
          }
        })
        .catch((err) => {
          alert('ইরর হয়েছে, আবার চেষ্টা করুন')
          setHide(false)
        })
    }

    return (
      <>
        <p className='mb-4 italic text-yellow-500'>
          বায়োডাটা “হাইড” এর মাধ্যমে আপনার বায়োডাটাটি সার্চ ফিল্টার থেকে গোপনে
          রাখতে পারবেন। পরবর্তীতে যে যেকোন সময় পুনরায় পাব্লিশ করতে পারবেন <br />
          ইন শা আল্লাহ।
        </p>

        <div className='flex gap-x-2 justify-end'>
          <Button
            bordered
            auto
            color='success'
            onPress={() => setHide(false)}
          >
            ফিরে যান
          </Button>
          <Button
            bordered
            auto
            color='warning'
            onPress={handleHide}
          >
            হাইড করুন
          </Button>
        </div>
      </>
    )
  }

  const DeleteAction = () => {
    const [reason, setReason] = useState('')

    const handleDelete = (type) => {
      if (reason !== '') {
        userRequest
          .deleteHideRequest({ reason, type })
          .then((info) => {
            if (message === 'ok') {
              alert(
                'আপনার delete রিকুয়েস্টটি গৃহীত হয়েছে, শীঘ্রই SMS এর মাধ্যমে ফলাফল পেয়ে যাবেন ইনশা আল্লাহ!'
              )
              set_delete(false)
            }
          })
          .catch((err) => {
            alert('ইরর হয়েছে, আবার চেষ্টা করুন')
            set_delete(false)
          })
      } else alert('কারণ বর্ণনা করুন')
    }

    return (
      <div>
        <p className='mb-4 font-semibold italic text-primary'>
          বায়োডাটা “ডিলিট” এর মাধ্যমে আপনার বায়োডাটা সম্পূর্ণভাবে ওয়েবসাইট থেকে
          মুছে ফেলতে পারবেন। যা পরবর্তীতে ফিরিয়ে আনা সম্ভব না।
        </p>

        <p className='my-4 text-sm'>
          আপনার বায়োডাটা ডিলিট করতে নিম্নোক্ত ফর্মটি পূরণের মাধ্যমে আবেদন করুন।
        </p>
        <div className='my-2'>
          <textarea
            onChange={({ target: { value } }) => setReason(value)}
            placeholder='সংক্ষেপে কারণ বর্ণনা করুন...'
            className='border-gray-300 border-2 mb-2 w-full p-2 focus:border-blue-500 rounded-lg'
            rows='4'
          />
        </div>

        <div className='flex gap-x-2 justify-end'>
          <Button
            bordered
            auto
            color='success'
            onPress={() => set_delete(false)}
          >
            ফিরে যান
          </Button>
          <Button
            type='submit'
            bordered
            auto
            color='error'
            onPress={handleDelete}
          >
            ডিলিট করুন
          </Button>
        </div>
      </div>
    )
  }

  const handleCopy = (text) => {
    copyToClip(text)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div>
        <CSkeleton
          height={150}
          width={150}
          circle
        />
        <div className='my-2'>
          <CSkeleton
            height={30}
            width='100%'
          />
        </div>
        <div className='my-2'>
          <CSkeleton
            height={30}
            width='100%'
          />
        </div>
        <div className='my-2'>
          <CSkeleton
            height={30}
            width='100%'
          />
        </div>
        <div className='my-2'>
          <CSkeleton
            height={30}
            width='100%'
          />
        </div>
        <div className='my-2'>
          <CSkeleton
            height={30}
            width='100%'
          />
        </div>
        <div className='my-2'>
          <CSkeleton
            height={30}
            width='100%'
          />
        </div>
      </div>
    )
  }

  return (
    <div className='rounded-md bg-primary p-1 sm:p-4 text-center'>
      <LongModal
        color='error'
        bodyColor='error'
        header='প্রোফাইলে ডিলিট করুন'
        visible={_delete}
        onClose={() => set_delete(false)}
        preventClose={false}
        body={<DeleteAction action='ডিলিট' />}
        blur={true}
      />
      <LongModal
        header='প্রোফাইল হাইড করুন'
        color='warning'
        bodyColor='warning'
        visible={hide}
        onClose={() => setHide(false)}
        preventClose={false}
        body={<HideAction />}
        blur={true}
      />
      <div>
        <div className='flex items-center justify-between my-4'>
          <div className='flex items-center gap-2'>
            <Image
              priority
              height={30}
              width={30}
              src={type === 'পাত্রীর বায়োডাটা' ? female : male}
              className='size-20 sm:size-28'
              alt='profile avatar'
            />
            <div className='font-bold text-lg text-white'>
              Biodata ID
              <p className='font-bold -mt-2 text-4xl tracking-normal'>{uId}</p>
            </div>
          </div>
          <div className=''>
            <button
              onClick={() => handleCopy(uId)}
              className={`rounded-md w-20 text-sm ${
                copy ? 'bg-secondary' : 'bg-white'
              } py-2 font-bold ${copy ? 'text-white' : 'text-primary'}`}
            >
              {copy ? 'Copied' : 'Copy BioID'}
            </button>
          </div>
        </div>
        <div className='item__holder2'>
          <div className='item'>
            <span>বায়োডাটার ধরণ</span>
            <span>{type}</span>
          </div>
          <div className='item'>
            <span>বৈবাহিক অবস্থা</span>
            <span>{condition}</span>
          </div>
          <div className='item'>
            <span>স্থায়ী ঠিকানা</span>
            <span>{permanent_jilla}</span>
          </div>
          <div className='item'>
            <span>স্থায়ী বিভাগ</span>
            <span>{permanent_division}</span>
          </div>
          <div className='item'>
            <span>বর্তমান ঠিকানা</span>
            <span>{current_jilla}</span>
          </div>
          <div className='item'>
            <span>বর্তমান বিভাগ</span>
            <span>{current_division}</span>
          </div>
          <div className='item'>
            <span>জন্মসন (আসল)</span>
            <span>{birth}</span>
          </div>
          <div className='item'>
            <span>গাত্রবর্ণ</span>
            <span>{complexion}</span>
          </div>
          <div className='item'>
            <span>উচ্চতা</span>
            <span>{height}</span>
          </div>
          <div className='item'>
            <span>ওজন</span>
            <span>{weight}</span>
          </div>
          <div className='item'>
            <span>রক্তের গ্রুপ</span>
            <span>{blood}</span>
          </div>
          <div className='item'>
            <span>পেশা</span>
            <span>{profession}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
