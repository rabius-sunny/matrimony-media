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
import { Fade } from 'react-reveal'
import { useAppContext } from 'utils/context'
import SaveButton from 'components/bio/SaveButton'

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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
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
              setVisible({ message: '', status: false, done: true })
              window.scroll({
                top: 100,
                left: 100,
                behavior: 'smooth'
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

  const { data, loading } = getData(visible.done)
  const { routes, setRoutes } = useAppContext()

  useEffect(() => {
    if (data) {
      if (data.special_acknowledgement) {
        setRoutes({
          ...routes,
          another: {
            name: 'অন্যান্য',
            link: '/others-info',
            status: 'done'
          }
        })
      }
    }
  }, [data, loading])
  useEffect(() => {
    biodataRequests.checkField().then(data => {
      setFields(data.fields)
    })
  }, [visible.done])

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
          <fieldset className='my-6 rounded-md border-2 border-green-300 p-4'>
            <legend className='ml-4 font-bold text-secondary'>
              পেশা সম্পর্কিত তথ্য
            </legend>
            <textarea
              defaultValue={data?.profession_info}
              rows={5}
              {...register('profession_info')}
              className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
            />
            <p className='pl-2 pt-4 text-green-400'>
              {data?.type === 'পাত্রের বায়োডাটা'
                ? 'এখানে বিভিন্ন বিষয় লিখতে পারেন। যেমনঃ আপনার ইনকাম  হালাল কি না, অফিস কোথায়, আপনার পদবী ও কাজ সম্পর্কে একটু বিস্তারিত বর্ণনা দিতে পারেন, আপনার পেশাগত ভবিষ্যৎ পরিকল্পনাও লিখতে পারেন। আপনি ছাত্র বা বেকার হলে সে বিষয়েও কিছু জানাতে পারেন। মূল বিষয় হচ্ছে পাত্রীপক্ষ যেন আপনার পেশা সম্পর্কে ক্লিয়ার ধারণা পেয়ে যায়।'
                : 'আপনি যদি চাকুরীজীবি হয়ে থাকেন তাহলে অফিসের অবস্থান, পেশাগত ভবিষ্যৎ পরিকল্পনা, বিয়ের পর চাকরী ও সংসার কিভাবে চালাতে চান ইত্যাদি বিষয় লিখতে পারেন। যদি চাকুরীজীবি না হয়ে থাকেন তাহলে ঘরটি ফাঁকা রাখুন।'}
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.special_acknowledgement
                ? 'border-red-500'
                : 'border-green-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.special_acknowledgement
                  ? 'text-primary'
                  : 'text-secondary'
              }`}
            >
              বিশেষ কিছু যদি জানাতে চান *
            </legend>
            <textarea
              defaultValue={data?.special_acknowledgement}
              rows={5}
              {...register('special_acknowledgement', {
                required: 'field is required'
              })}
              className={`w-full rounded ${
                errors.special_acknowledgement ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.special_acknowledgement
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.special_acknowledgement ? true : false}>
              {errors.special_acknowledgement && (
                <p className='text-primary py-2 pl-2'>
                  {errors.special_acknowledgement.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-green-400'>
              আপনার কোনো শর্ত বা উপরে লিখার সুযোগ হয় নি এমন কিছু জানানোর থাকলে
              এই ঘরে লিখতে পারেন। যেমনঃ পারিবারিক বা ব্যক্তিগত কোনো সুবিধা বা
              অসুবিধা ইত্যাদি যে কোনো বিষয়ে যত ইচ্ছা লিখতে পারবেন। ।
            </p>
          </fieldset>

          <SaveButton isLoading={isLoading} fields={fields} />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
