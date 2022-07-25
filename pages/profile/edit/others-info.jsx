import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'

export default function OthersInfo() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  })
  const onSubmit = data =>
    biodataRequests
      .updateBio(data)
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(7).then(info => {
            if (info.message === 'ok') {
              router.push('/profile/edit/expectation')
            }
          })
        }
      })
      .catch(err => console.log(err.message))

  const { data, loading } = getData()

  return (
    <ProfileLayout data={data} loading={loading}>
      <Head>
        <title>অন্যান্য তথ্য</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />
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

          <input
            type='submit'
            value='Save Changes'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
