import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { Loading } from '@nextui-org/react'

export default function Name() {
  const { data, loading, mutate } = getData()
  const { routes, setRoutes } = useAppContext()
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [fields, setFields] = useState([])
  const onClose = (_) => setVisible2(false)
  const router = useRouter()
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange'
  })
  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        published: false,
        featured: false
      })
      .then((info) => {
        if (info.message === 'ok') {
          biodataRequests.setField(9).then((info) => {
            if (info.message === 'ok') {
              setIsLoading(false)
              mutate()
              if (fields.length > 0) {
                setVisible2(true)
                return
              } else router.push('/profile/preview')
            }
          })
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
  }

  useEffect(() => {
    if (data) {
      setRoutes({
        ...routes,
        contact: {
          name: 'যোগাযোগ',
          link: '/contact-info',
          status: 'done'
        }
      })
    }
  }, [data, loading])
  useEffect(() => {
    biodataRequests.checkField().then((data) => {
      setFields(data.fields)
    })
  }, [visible.done])

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>যোগাযোগ</title>
      </Head>
      <LongModal
        visible={visible.status}
        onClose={() => setVisible({ message: '', status: false, done: false })}
        body={
          <p
            className={`text-${
              visible.done ? 'secondary' : 'red-500'
            } text-2xl`}
          >
            {visible.message}
          </p>
        }
        btn='ok'
        preventClose={false}
        color={visible.done ? 'success' : 'error'}
      />
      <LongModal
        visible={visible2}
        onClose={onClose}
        header='নিম্নোক্ত ফিল্ডগুলো ঠিকভাবে পূরণ করা হয় নি, প্রিভিউ দেখে পাবলিশ রিকুয়েস্ট করতে সবগুলো ফিল্ড ঠিকভাবে পুরণ করুন।'
        body={fields.map((item, i) => (
          <div key={i}>
            <p style={{ color: 'red', fontSize: '1.3rem' }}>{item.name}</p>
            <Link
              href={item.slug}
              className='text-secondary underline flex items-center'
              style={{ fontSize: '.9rem' }}
              legacyBehavior
            >
              পূরণ করুন
              <ArrowRightIcon className='text-green-400 h-4 pl-1' />
            </Link>
          </div>
        ))}
        scroll={true}
        btn='ফিরে যান'
        color='primary'
      />
      <ProfileRoutes activeRoute={activeRoute} />
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.guardian_number ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.guardian_number ? 'text-primary' : 'text-secondary'
              }`}
            >
              অভিভাবকের নাম্বার *
            </legend>
            <input
              type='number'
              defaultValue={data?.guardian_number}
              placeholder='01700000000'
              {...register('guardian_number', {
                required: 'field is required',
                min: 10,
                minLength: 10
              })}
              className={`w-full rounded ${
                errors.guardian_number ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.guardian_number
                  ? 'focus:outline-red-500'
                  : 'focus:outline-secondary'
              }`}
            />
            {errors.guardian_number && (
              <p className='text-primary py-2 pl-2'>
                {errors.guardian_number.message}
              </p>
            )}
            <p className='pl-2 pt-4 text-green-400'>
              অবশ্যই ইংরেজীতে নাম্বার লিখবেন এভাবে 01700-000000। বিঃদ্রঃ নিজের
              নাম্বার দিলে ভেরিফিকেশনে এপ্রুভ হবে না। এই ব্যাপারে আমরা সর্বোচ্চ
              কঠোর। সব সময় খোলা থাকবে এমন নাম্বার লিখবেন। নাম্বার বন্ধ থাকার
              আশংকা থাকলে দুইটি নাম্বার লিখতে পারেন।
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.number_relation ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.number_relation ? 'text-primary' : 'text-secondary'
              }`}
            >
              যার নাম্বার লিখেছেন *
            </legend>
            <input
              defaultValue={data?.number_relation}
              {...register('number_relation', {
                required: 'field is required'
              })}
              className={`w-full rounded ${
                errors.number_relation ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.number_relation
                  ? 'focus:outline-red-500'
                  : 'focus:outline-secondary'
              }`}
            />
            {errors.number_relation && (
              <p className='text-primary py-2 pl-2'>
                {errors.number_relation.message}
              </p>
            )}
            <p className='pl-2 pt-4 text-green-400'>
              যে অভিভাবকের নাম্বার দিয়েছেন তার সাথে আপনার সম্পর্ক। এভাবে লিখবেনঃ
              বাবা
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.receiving_email ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.receiving_email ? 'text-primary' : 'text-secondary'
              }`}
            >
              বায়োডাটা গ্রহণের ই-মেইল এড্রেস *
            </legend>
            <input
              defaultValue={data?.receiving_email}
              {...register('receiving_email', {
                required: 'enter a valid email address',
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
              })}
              className={`w-full rounded ${
                errors.receiving_email ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.receiving_email
                  ? 'focus:outline-red-500'
                  : 'focus:outline-secondary'
              }`}
            />
            {errors.receiving_email && (
              <p className='text-primary py-2 pl-2'>
                {errors.receiving_email.message ||
                  'enter a valid email address'}
              </p>
            )}
            <p className='pl-2 pt-4 text-green-400'>
              এই ই-মেইলে অপরপক্ষ বায়োডাটার লিংক পাঠাতে পারে। তাই নির্ভুলভাবে
              লিখুন।
            </p>
          </fieldset>
          <button
            type='submit'
            className={`${
              isLoading
                ? 'pointer-events-none cursor-not-allowed'
                : 'cursor-pointer'
            } rounded-md bg-primary  flex items-center font-medium text-white shadow-md hover:bg-primary  px-6 py-3`}
          >
            {isLoading ? (
              <Loading
                color='success'
                size='sm'
              />
            ) : (
              'সেভ করুন ও প্রিভিউ দেখুন'
            )}
          </button>
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
