import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyInput } from 'components/profile/MyInputs'

import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect, useMemo, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'

export default function Name() {
  const router = useRouter()
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

  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        key: 'contact',
        published: false,
        featured: false
      })
      .then((info) => {
        if (info.message === 'ok') {
          setIsLoading(false)
          mutate()
          if (fields.length > 0) {
            setVisible2(true)
            return
          } else router.push('/profile/preview')
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

  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])

  useEffect(() => {
    if (data) {
      formProperty.forEach((item) => form.setFieldValue(item, data[item]))
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
        header='নিম্নোক্ত ফিল্ডগুলো ঠিকভাবে পূরণ করা হয় নি, পাবলিশ রিকুয়েস্ট করতে সবগুলো ফিল্ড ঠিকভাবে পুরণ করুন।'
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
