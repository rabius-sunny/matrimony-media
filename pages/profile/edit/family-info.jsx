import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyInput, MyTextarea } from 'components/profile/MyInputs'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { _brothers } from 'assets/profileinfo'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function Family() {
  const { data, loading, mutate } = getData()
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const router = useRouter()
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false

  const form = mantineForm({
    initialValues: {
      father_name: '',
      mother_name: '',
      father_profession: '',
      mother_profession: '',
      brothers_info: '',
      sisters_info: '',
      uncles_profession: '',
      family_status: ''
    },

    validate: {
      father_name: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      mother_name: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      father_profession: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      mother_profession: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      brothers_info: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      sisters_info: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      family_status: isNotEmpty('ফিল্ডটি পূরণ করতে হবে')
    }
  })
  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])

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
          biodataRequests.setField(4).then((info) => {
            if (info.message === 'ok') {
              setIsLoading(false)
              mutate()
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
      .catch((err) => {
        setIsLoading(false)
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
  }

  const { routes, setRoutes } = useAppContext()
  useEffect(() => {
    if (data) {
      formProperty.forEach((item) => form.setFieldValue(item, data[item]))
      setRoutes({
        ...routes,
        family: {
          name: 'পারিবারিক',
          link: '/family-info',
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
        <title>পারিবারিক তথ্য</title>
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
      {!loading ? (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <MyInput
            label='পিতার নাম (শেয়ার করা হবে না)'
            description='পিতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য।
                আপনার পিতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে
                পারবে না।'
            form={{ ...form.getInputProps('father_name') }}
          />
          <MyInput
            label='মাতার নাম (শেয়ার করা হবে না)'
            description='মাতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য।
                আপনার মাতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে
                পারবে না।'
            form={{ ...form.getInputProps('mother_name') }}
          />
          <MyInput
            label='পিতার পেশা'
            description='মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) ব্যবসায়ী
                ছিলেন।'
            form={{ ...form.getInputProps('father_profession') }}
          />
          <MyInput
            label='মাতার পেশা'
            description='মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) গৃহিণী
                ছিলেন।'
            form={{ ...form.getInputProps('mother_profession') }}
          />
          <MyTextarea
            label='ভাইদের সম্পর্কে তথ্য'
            description={
              <p className='text-xs'>
                কয়জন ভাই রয়েছে তা লিখুন। এরপর সকল ভাইদের শিক্ষাগত যোগ্যতা,
                বৈবাহিক অবস্থা, পেশা, বর্তমান অবস্থান লিখুন। একাধিক ভাই থাকলে
                কমা দিয়ে নিচের লাইনে এসে লিখবেন। ভাই না থাকলে লিখবেন{' '}
                <span className='text-red-300'>ভাই নেই</span>
              </p>
            }
            form={{ ...form.getInputProps('brothers_info') }}
          />
          <MyTextarea
            label='ভাইদের সম্পর্কে তথ্য'
            description={
              <p className='text-xs'>
                কয়জন বোন রয়েছে তা লিখুন। এরপর সকল বোনদের শিক্ষাগত যোগ্যতা,
                বৈবাহিক অবস্থা, পেশা, বিবাহিত হলে স্বামীর পেশা লিখুন। একাধিক বোন
                থাকলে কমা দিয়ে নিচের লাইনে এসে লিখবেন। বোন না থাকলে লিখবেন{' '}
                <span className='text-red-300'>বোন নেই</span>
              </p>
            }
            form={{ ...form.getInputProps('sisters_info') }}
          />
          <MyTextarea
            label='চাচা-মামাদের পেশা'
            withAsterisk={false}
            description='জানাতে অনিচ্ছুক হলে ফাঁকা রাখুন।'
            form={{ ...form.getInputProps('uncles_profession') }}
          />
          <MyTextarea
            label='পরিবারের অর্থনৈতিক ও সামাজিক অবস্থা'
            description='সংক্ষেপে বর্ণনা করুন।'
            form={{ ...form.getInputProps('family_status') }}
          />
          <SaveButton
            isLoading={isLoading}
            fields={fields}
          />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
