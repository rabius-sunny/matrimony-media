import { useForm, hasLength, isNotEmpty } from '@mantine/form'
import { MyInput, MySelect } from 'components/profile/MyInputs'
import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import {
  _femalecondition,
  _malecondition,
  _conditions,
  _type
} from 'assets/profileinfo'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect, useMemo, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function Name() {
  const { data, loading, mutate } = getData()
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const { routes, setRoutes } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const router = useRouter()
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false
  const form = useForm({
    initialValues: {
      name: '',
      type: '',
      condition: '',
      education: ''
    },

    validate: {
      name: hasLength({ min: 5, max: 50 }, 'পূর্ণ নাম লিখুন'),
      type: isNotEmpty('বায়োডাটার ধরণ সিলেক্ট করুন'),
      condition: isNotEmpty('বৈবাহিক অবস্থা সিলেক্ট করুন'),
      education: isNotEmpty('পড়াশোনার মাধ্যম সিলেক্ট করুন')
    }
  })
  const onSubmit = (infos) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...infos,
        published: false,
        featured: false
      })
      .then((info) => {
        if (info.message === 'ok') {
          biodataRequests.setField(0).then((info) => {
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
  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])

  useEffect(() => {
    if (data) {
      formProperty.forEach((item) => form.setFieldValue(item, data[item]))
      setRoutes({
        ...routes,
        primary: {
          name: 'প্রাথমিক',
          link: '/primary',
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
        <title>প্রাথমিক তথ্য</title>
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
      {loading ? (
        <FormSkeleton />
      ) : (
        data && (
          <>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
              <MyInput
                label='পূর্ণ নাম'
                placeholder='আপনার নাম'
                description='নাম নেয়া হচ্ছে ভেরিফিকেশনের জন্য, পূর্ণ নাম লিখবেন। আপনার নাম কারো সাথে শেয়ার করা হবে না।'
                form={{ ...form.getInputProps('name') }}
              />
              <MySelect
                label='বায়োডাটার ধরণ'
                onClick={() => form.setFieldValue('condition', '')}
                placeholder='select option'
                data={_type}
                form={{ ...form.getInputProps('type') }}
              />
              <MySelect
                label='বৈবাহিক অবস্থা'
                placeholder='select option'
                data={
                  form.values.type === 'পাত্রের বায়োডাটা'
                    ? _malecondition
                    : form.values.type === 'পাত্রীর বায়োডাটা'
                    ? _femalecondition
                    : _conditions
                }
                form={{ ...form.getInputProps('condition') }}
              />
              <MySelect
                label='কোন মাধ্যমে পড়াশোনা করেছেন?'
                placeholder='select option'
                data={['জেনারেল', 'মাদ্রাসা']}
                form={{ ...form.getInputProps('education') }}
              />
              <SaveButton
                isLoading={isLoading}
                fields={fields}
              />
            </form>
          </>
        )
      )}
    </ProfileLayout>
  )
}
