import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm as mantineForm, hasLength, isNotEmpty } from '@mantine/form'
import { MyInput, MySelect } from 'components/profile/MyInputs'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import OptionMap from 'components/profile/OptionMap'
import getData from 'hooks/getData'
import biodataRequests from 'services/network/biodataRequests'
import { useEffect } from 'react'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function Education() {
  const { data, loading, mutate } = getData()
  const { routes, setRoutes } = useAppContext()
  const [required, setRequired] = useState({
    secondary: false,
    higher: false
  })
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
      secondary: '',
      secondary_details: '',
      higher: '',
      higher_details: '',
      honors_details: ''
    },

    validate: {
      secondary: isNotEmpty('মাধ্যমিকের তথ্য দিন'),
      secondary_details: hasLength({ min: 5 }, 'মাধ্যমিক বিষয়ে লিখুন'),
      higher: required.secondary ? isNotEmpty('উচ্চমাধ্যমিকের তথ্য দিন') : null,
      higher_details:
        required.higher && required.secondary
          ? hasLength({ min: 5 }, 'উচ্চমাধ্যমিক বিষয়ে লিখুন')
          : null
    }
  })

  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])

  useEffect(() => {
    if (data) {
      formProperty.forEach((item) => {
        return form.setFieldValue(item, data[item])
      })
      setRoutes({
        ...routes,
        education: {
          name: 'শিক্ষাগত',
          link: '/educational-qualifications',
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
  useEffect(() => {
    if (form.values.secondary === yesno[0]) {
      setRequired((prev) => ({ ...prev, secondary: true }))
    } else {
      setRequired((prev) => ({ ...prev, secondary: false }))
    }
    if (
      form.values.higher === yesno_heigher[0] ||
      form.values.higher === yesno_heigher[1] ||
      form.values.higher === yesno_heigher[2]
    ) {
      setRequired((prev) => ({ ...prev, higher: true }))
    } else {
      setRequired((prev) => ({ ...prev, higher: false }))
    }
  }, [form.values.higher, form.values.secondary])

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
          biodataRequests.setField(6).then((info) => {
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

  const trimResult = (data) => {
    let formdata
    if (form.values.secondary === yesno[0]) {
      if (form.values.higher === yesno[0]) {
        formdata = {
          secondary: form.values.secondary,
          secondary_details: form.values.secondary_details,
          higher: form.values.higher,
          higher_details: form.values.higher_details,
          honors_details: form.values.honors_details
        }
      } else {
        formdata = {
          secondary: form.values.secondary,
          secondary_details: form.values.secondary_details,
          higher: form.values.higher,
          higher_details: form.values.higher_details,
          honors_details: ''
        }
        form.setFieldValue('honors_details', '')
      }
    } else {
      formdata = {
        secondary: form.values.secondary,
        secondary_details: form.values.secondary_details,
        higher: '',
        higher_details: '',
        honors_details: ''
      }
      form.setValues({
        higher: '',
        higher_details: '',
        honors_details: ''
      })
    }
    onSubmit(formdata)
  }

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>শিক্ষাগত যোগ্যতা</title>
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
        <>
          <form onSubmit={form.onSubmit((values) => trimResult(values))}>
            <MySelect
              label='মাধ্যমিক (SSC) / সমমান পাশ করেছেন?'
              placeholder='select option'
              data={yesno}
              form={{ ...form.getInputProps('secondary') }}
            />
            <MyInput
              label='মাধ্যমিক(SSC) / সমমান বিষয়ে লিখুন'
              description={
                form.values.secondary === yesno[1] ? (
                  <ul className='text-secondary desc'>
                    <li>
                      পরীক্ষা না দিলে লিখবেন - ৮ম/৯ম শ্রেণি পর্যন্ত পড়েছি।
                    </li>
                    <li>পাশ করতে না পারলে সেটাও লিখবেন।</li>
                  </ul>
                ) : (
                  <ul className='text-secondary desc'>
                    <li>
                      পাশের সাল, বিভাগ ও ফলাফলসহ লিখবেন এভাবে - ২০২৩ সালে পাশ
                      করেছি বিজ্ঞান বিষয়ে। A+ রেজাল্ট।
                    </li>
                  </ul>
                )
              }
              form={{ ...form.getInputProps('secondary_details') }}
            />
            {form.values.secondary === yesno[0] && (
              <>
                <MySelect
                  label='উচ্চমাধ্যমিক(HSC) / সমমান পাশ করেছেন?'
                  placeholder='select option'
                  data={yesno_heigher}
                  form={{ ...form.getInputProps('higher') }}
                />
                <MyInput
                  label='উচ্চমাধ্যমিক(HSC) / সমমান বিষয়ে লিখুন'
                  description={
                    form.values.higher === yesno_heigher[1] ? (
                      <ul className='text-secondary desc'>
                        <li>কোন বর্ষে পড়েন বিভাগসহ লিখবেন।</li>
                        <li>SSC এর পরে পড়াশোনা না করলে সেটাও লিখবেন।</li>
                        <li>পাশ করতে না পারলে সেটাও লিখবেন।</li>
                      </ul>
                    ) : form.values.higher === yesno_heigher[2] ? (
                      <ul className='text-secondary desc'>
                        <li>কোন বর্ষে পড়েন বিভাগসহ লিখবেন।</li>
                        <li>পাশ করলে পাশের সাল, বিভাগ ও ফলাফল লিখবেন।</li>
                        <li>পাশ করতে না পারলে সেটাও লিখবেন।</li>
                      </ul>
                    ) : (
                      <ul className='text-secondary desc'>
                        <li>
                          পাশের সাল, বিভাগ ও ফলাফলসহ লিখবেন এভাবে - ২০২৩ সালে
                          পাশ করেছি বিজ্ঞান বিষয়ে। A+ রেজাল্ট।
                        </li>
                      </ul>
                    )
                  }
                  form={{ ...form.getInputProps('higher_details') }}
                />
                {form.values.higher === yesno_heigher[0] && (
                  <MyInput
                    withAsterisk={false}
                    label='স্নাতক/স্নাতক(সম্মান)/সমমান বা উচ্চতর শিক্ষাগত যোগ্যতা'
                    description='এভাবে লিখতে পারেনঃ BA in English Language & Literature,
                  running year/passed year, university/college CGPA...'
                    form={{ ...form.getInputProps('honors_details') }}
                  />
                )}
              </>
            )}

            <SaveButton
              isLoading={isLoading}
              fields={fields}
            />
          </form>
        </>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}

const yesno = ['হ্যা', 'না']
const yesno_heigher = ['হ্যা', 'না', 'ডিপ্লোমা পড়েছি']
const yesno_dawra = ['হ্যা', 'না', 'এখনো পড়েছি']
const educationType = ['জেনারেল', 'মাদ্রাসা']
const _classes = [
  '১ম',
  '২য়',
  '৩য়',
  '৪র্থ',
  '৫ম',
  '৬ষ্ঠ',
  '৭ম',
  '৮ম',
  '৯ম',
  '১০ম'
]
