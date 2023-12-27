import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyInput } from 'components/profile/MyInputs'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'

export default function Name() {
  const router = useRouter()
  const { data, loading, mutate } = getData('contact')

  const [errorState, setErrorState] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [unfilledMessage, setUnfilledMessage] = useState(false)
  const onClose = (_) => setUnfilledMessage(false)

  const form = mantineForm({
    initialValues: {
      guardian_number: '',
      number_relation: '',
      receiving_email: ''
    },

    validate: {
      guardian_number: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      number_relation: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      receiving_email: isNotEmpty('ফিল্ডটি পূরণ করতে হবে')
    }
  })

  const onSubmit = (values) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...values,
        key: 'contact'
      })
      .then((info) => {
        if (info.message === 'ok') {
          mutate()
          if (data?.filled?.length !== 10) {
            setUnfilledMessage(true)
          } else router.push('/profile/preview')
        }
      })
      .catch((err) => {
        setErrorState({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
      .finally(() => setIsLoading(false))
  }

  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])

  useEffect(() => {
    data &&
      formProperty.forEach((item) => form.setFieldValue(item, data.bio[item]))
  }, [data])

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>যোগাযোগ</title>
      </Head>
      <LongModal
        visible={errorState.status}
        onClose={() =>
          setErrorState({ message: '', status: false, done: false })
        }
        body={
          <p
            className={`text-${
              errorState.done ? 'secondary' : 'red-500'
            } text-2xl`}
          >
            {errorState.message}
          </p>
        }
        btn='ok'
        preventClose={false}
        color={errorState.done ? 'success' : 'error'}
      />
      <LongModal
        visible={unfilledMessage}
        onClose={onClose}
        header='নিম্নোক্ত ফিল্ডগুলো ঠিকভাবে পূরণ করা হয় নি, পাবলিশ রিকুয়েস্ট করতে সবগুলো ফিল্ড ঠিকভাবে পুরণ করুন।'
        body={data?.unfilled?.map((item, i) => (
          <div
            key={i}
            className='flex items-center justify-between'
          >
            <p className='text-primary font-semibold text-xl'>{item.name}</p>
            <Link
              href={'/profile/edit' + item.slug}
              className='text-secondary text-xs flex items-center hover:underline underline-offset-4'
              // legacyBehavior
            >
              পূরণ করুন
              <ArrowRightIcon
                className='text-green-400 h-3 pl-1'
                strokeWidth={2.5}
              />
            </Link>
          </div>
        ))}
        scroll={true}
        btn='ফিরে যান'
        color='primary'
      />

      {!loading ? (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <MyInput
            label='অভিভাবকের নাম্বার'
            placeholder='আপনার নাম'
            description='অবশ্যই ইংরেজীতে নাম্বার লিখবেন এভাবে 01700000000। বিঃদ্রঃ নিজের
                নাম্বার দিলে ভেরিফিকেশনে এপ্রুভ হবে না। এই ব্যাপারে আমরা সর্বোচ্চ
                কঠোর। সব সময় খোলা থাকবে এমন নাম্বার লিখবেন। নাম্বার বন্ধ থাকার
                আশংকা থাকলে দুইটি নাম্বার লিখতে পারেন।'
            form={{ ...form.getInputProps('guardian_number') }}
          />
          <MyInput
            label='যার নাম্বার লিখেছেন'
            placeholder='আপনার নাম'
            description='যে অভিভাবকের নাম্বার দিয়েছেন তার সাথে আপনার সম্পর্ক। এভাবে লিখবেনঃ
            বাবা'
            form={{ ...form.getInputProps('number_relation') }}
          />
          <MyInput
            label='বায়োডাটা গ্রহণের ই-মেইল এড্রেস'
            placeholder='আপনার নাম'
            description='এই ই-মেইলে অপরপক্ষ বায়োডাটার লিংক পাঠাতে পারে। তাই নির্ভুলভাবে
            লিখুন।'
            form={{ ...form.getInputProps('receiving_email') }}
          />
          <div className='mt-10'>
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
          </div>
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
