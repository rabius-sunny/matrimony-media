import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import { Loading } from '@nextui-org/react'

export default function OthersInfo() {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  })
  const onSubmit = data => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        published: false,
        featured: false
      })
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(7).then(info => {
            if (info.message === 'ok') {
              setIsLoading(false)
              setVisible({
                message:
                  'আপনার তথ্যগুলো সংরক্ষিত হয়েছে এবং আপনার বায়োডাটাটি এখন হাইড অবস্থায় রয়েছে। এটিকে পুনরায় পাবলিশ করার জন্য সবগুলো ফিল্ড পূরণ করে প্রিভিউ থেকে পাবলিশ করুন।',
                status: true,
                done: true
              })
            }
          })
        }
      })
      .catch(err => {
        setIsLoading(false)
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
  }

  const { data, loading } = getData()

  useEffect(() => {
    biodataRequests.checkField().then(data => {
      setFields(data.fields)
    })
  }, [])

  return (
    <ProfileLayout data={data} loading={loading}>
      <Head>
        <title>অন্যান্য তথ্য</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />
      <LongModal
        visible={visible.status}
        onClose={() => setVisible({ message: '', status: false, done: false })}
        body={
          <p className={`text-${visible.done ? 'green' : 'red'}-500 text-2xl`}>
            {visible.message}
          </p>
        }
        btn='ok'
        preventClose={false}
        color={visible.done ? 'success' : 'error'}
      />
      {!loading && data ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 font-bold text-blue-500'>
              পেশা সম্পর্কিত তথ্য
            </legend>
            <textarea
              defaultValue={data?.profession_info}
              rows={5}
              {...register('profession_info')}
              className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
            />
            <p className='pl-2 pt-4 text-blue-400'>
              {data?.type === 'পাত্রের বায়োডাটা'
                ? 'এখানে বিভিন্ন বিষয় লিখতে পারেন। যেমনঃ আপনার ইনকাম  হালাল কি না, অফিস কোথায়, আপনার পদবী ও কাজ সম্পর্কে একটু বিস্তারিত বর্ণনা দিতে পারেন, আপনার পেশাগত ভবিষ্যৎ পরিকল্পনাও লিখতে পারেন। আপনি ছাত্র বা বেকার হলে সে বিষয়েও কিছু জানাতে পারেন। মূল বিষয় হচ্ছে পাত্রীপক্ষ যেন আপনার পেশা সম্পর্কে ক্লিয়ার ধারণা পেয়ে যায়।'
                : 'আপনি যদি চাকুরীজীবি হয়ে থাকেন তাহলে অফিসের অবস্থান, পেশাগত ভবিষ্যৎ পরিকল্পনা, বিয়ের পর চাকরী ও সংসার কিভাবে চালাতে চান ইত্যাদি বিষয় লিখতে পারেন। যদি চাকুরীজীবি না হয়ে থাকেন তাহলে ঘরটি ফাঁকা রাখুন।'}
            </p>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 font-bold text-blue-500'>
              বিশেষ কিছু যদি জানাতে চান
            </legend>
            <textarea
              defaultValue={data?.special_acknowledgement}
              rows={5}
              {...register('special_acknowledgement')}
              className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
            />
            <p className='pl-2 pt-4 text-blue-400'>
              আপনার কোনো শর্ত বা উপরে লিখার সুযোগ হয় নি এমন কিছু জানানোর থাকলে
              এই ঘরে লিখতে পারেন। যেমনঃ ছাত্র অবস্থায় বিয়ে করলে কিভাবে ভরণপোষণ
              করবেন বা সংসার চালাবেন, পারিবারিক বা ব্যক্তিগত কোনো সুবিধা বা
              অসুবিধা ইত্যাদি যে কোনো বিষয়ে যত ইচ্ছা লিখতে পারবেন। ।
            </p>
          </fieldset>

          <div className='flex items-center'>
            <button
              type='submit'
              className={`${
                isLoading
                  ? 'pointer-events-none cursor-not-allowed'
                  : 'cursor-pointer'
              } rounded-md bg-red-500 flex items-center font-medium text-white shadow-md hover:bg-red-600 px-6 py-3`}
            >
              {isLoading ? <Loading color='success' size='sm' /> : 'সেভ করুন'}
            </button>
            <button
              type='button'
              onClick={() => router.push('/profile/preview')}
              className={`${
                fields.length
                  ? 'bg-gray-300 pointer-events-none'
                  : 'bg-green-500 hover:bg-green-600'
              } ml-2 rounded-md text-white px-6 py-3 shadow-md`}
            >
              প্রিভিউ দেখুন ও পাবলিশ করুন
            </button>
          </div>
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
