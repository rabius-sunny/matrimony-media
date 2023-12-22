import { useState } from 'react'
import Image from 'next/image'
import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import CSkeleton from 'components/shared/CSkeleton'
import copyToClip from 'utils/copyToClip'
import LongModal from 'components/shared/Modals/LongModal'
import { Button } from '@nextui-org/react'
import userRequest from 'services/network/userRequest'

export default function SideCard({ data, loading }) {
  const [copy, setCopy] = useState(false)
  const [_delete, set_delete] = useState(false)
  const [hide, setHide] = useState(false)

  const HideAction = () => {
    const handleHide = () => {
      userRequest
        .hideByUser()
        .then((info) => {
          if (info.message === 'ok') {
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
            if (info.message === 'ok') {
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
    <>
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
          <div className=''>
            <Image
              height='100px'
              width='100px'
              src={data.type === 'পাত্রীর বায়োডাটা' ? female : male}
              alt='profile avatar'
            />
            <h2 className='mt-2 text-xl text-white'>
              Biodata ID
              <div className='text-5xl'>{data?.user?.uId}</div>
            </h2>
          </div>

          <div className='mt-6'>
            <button
              onClick={() => handleCopy(data?.user?.uId)}
              className={`block w-full rounded-md ${
                copy ? 'bg-red-800' : 'bg-white'
              } py-3 font-bold ${
                copy ? 'text-white' : 'text-primary'
              } focus:ring-2 focus:ring-red-700`}
            >
              {copy ? 'Copied' : 'Copy BioID'}
            </button>
          </div>
          <div className='btnHolder mt-4 flex rounded-md bg-white font-bold text-primary'>
            <button
              onClick={() => {
                set_delete(true)
              }}
              className='font-semibold text-md md:text-sm lg:text-md hover:bg-red-200'
            >
              Delete Biodata
            </button>
            <span></span>
            <button
              onClick={() => {
                setHide(true)
              }}
              className={`font-semibold text-md md:text-sm lg:text-md ${
                data?.published ? 'cursor-pointer' : 'pointer-events-none'
              } hover:bg-red-200`}
            >
              Hide Biodata
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${data ? 'block' : 'hidden'} my-4 ${
          data?.published ? 'bg-green-600' : 'bg-primary '
        } shadow-lg py-2 text-white rounded text-xl text-center`}
      >
        {data?.published ? 'বায়োটি পাবলিশড রয়েছে' : 'বায়োটি হাইড রয়েছে'}
      </div>
      <div
        className={`${
          !data || data?.published ? 'hidden' : 'block'
        } bg-red-200 text-primary text-sm sm:text-md text-center p-2 shadow font-semibold`}
      >
        পাবলিশ করতে প্রিভিউ থেকে পাবলিশ রিকুয়েস্ট করুন
      </div>
    </>
  )
}
