import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyTextarea } from 'components/profile/MyInputs'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import { useAppContext } from 'utils/context'
import SaveButton from 'components/bio/SaveButton'

export default function OthersInfo() {
  const { data, loading, mutate } = getData()
  const router = useRouter()
  const { routes, setRoutes } = useAppContext()
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false

  const form = mantineForm({
    initialValues: {
      profession_info: '',
      special_acknowledgement: ''
    },
    validate: {
      special_acknowledgement: isNotEmpty('অনুগ্রহ করে কিছু লিখুন')
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
          biodataRequests.setField(7).then((info) => {
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

  useEffect(() => {
    if (data) {
      formProperty.forEach((item) => {
        return form.setFieldValue(item, data[item])
      })
      setRoutes({
        ...routes,
        another: {
          name: 'অন্যান্য',
          link: '/others-info',
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
      {!loading ? (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <MyTextarea
            label='পেশা সম্পর্কিত তথ্য'
            withAsterisk={false}
            description={
              data?.type === 'পাত্রের বায়োডাটা' ? (
                <p>
                  এখানে বিভিন্ন বিষয় লিখতে পারেন। যেমনঃ আপনার ইনকাম হালাল কি না,
                  অফিস কোথায়, আপনার পদবী ও কাজ সম্পর্কে একটু বিস্তারিত বর্ণনা
                  দিতে পারেন, আপনার পেশাগত ভবিষ্যৎ পরিকল্পনাও লিখতে পারেন। আপনি
                  ছাত্র বা বেকার হলে সে বিষয়েও কিছু জানাতে পারেন। মূল বিষয় হচ্ছে
                  পাত্রীপক্ষ যেন আপনার পেশা সম্পর্কে ক্লিয়ার ধারণা পেয়ে যায়।
                </p>
              ) : (
                <p>
                  আপনি যদি চাকুরীজীবি হয়ে থাকেন তাহলে অফিসের অবস্থান, পেশাগত
                  ভবিষ্যৎ পরিকল্পনা, বিয়ের পর চাকরী ও সংসার কিভাবে চালাতে চান
                  ইত্যাদি বিষয় লিখতে পারেন। যদি চাকুরীজীবি না হয়ে থাকেন তাহলে
                  ঘরটি ফাঁকা রাখুন।
                </p>
              )
            }
            form={{ ...form.getInputProps('profession_info') }}
          />
          <MyTextarea
            label='বিশেষ কিছু যদি জানাতে চান'
            form={{ ...form.getInputProps('special_acknowledgement') }}
            description={
              <p>
                আপনার কোনো শর্ত বা উপরে লিখার সুযোগ হয় নি এমন কিছু জানানোর থাকলে
                এই ঘরে লিখতে পারেন। যেমনঃ পারিবারিক বা ব্যক্তিগত কোনো সুবিধা বা
                অসুবিধা ইত্যাদি যে কোনো বিষয়ে যত ইচ্ছা লিখতে পারবেন।
              </p>
            }
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
