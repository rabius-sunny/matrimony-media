import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm, isNotEmpty } from '@mantine/form'
import { MyInput, MySelect } from 'components/profile/MyInputs'
import getData from 'hooks/getData'
import {
  _type,
  _condition,
  _address_jilla,
  _address_division,
  _birthYear,
  _complexion,
  _height,
  _weight,
  _bloodGroup
} from 'assets/profileinfo'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import biodataRequests from 'services/network/biodataRequests'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function GeneralInfo() {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const { data, loading } = getData('general')

  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])

  const form = useForm({
    initialValues: {
      permanent_jilla: '',
      permanent_division: '',
      current_jilla: '',
      current_division: '',
      birth: '',
      complexion: '',
      height: '',
      weight: '',
      blood: '',
      profession: '',
      income: ''
    },

    validate: {
      permanent_jilla: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      permanent_division: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      current_jilla: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      current_division: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      birth: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      complexion: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      height: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      weight: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      blood: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      profession: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      income:
        data?.type === 'পাত্রের বায়োডাটা' && isNotEmpty('ফিল্ডটি পূরণ করুন')
    }
  })
  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        age: new Date().getFullYear() - data.birth,
        key: 'general',
        published: false,
        featured: false
      })
      .then((info) => {
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
    data && formProperty.forEach((item) => form.setFieldValue(item, data[item]))
  }, [data])
  useEffect(() => {
    biodataRequests.checkField().then((data) => {
      setFields(data.fields)
    })
  }, [visible.done])
  return (
    <>
      <ProfileLayout
        data={data}
        loading={loading}
      >
        <Head>
          <title>সাধারণ তথ্য</title>
        </Head>

        <LongModal
          visible={visible.status}
          onClose={() =>
            setVisible({ message: '', status: false, done: false })
          }
          body={
            <p
              className={`text-${visible.done ? 'green' : 'red'}-500 text-2xl`}
            >
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
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
              <MySelect
                label='স্থায়ী ঠিকানা'
                placeholder='select option'
                data={_address_jilla}
                form={{ ...form.getInputProps('permanent_jilla') }}
              />
              <MySelect
                label='বিভাগ'
                placeholder='select option'
                data={_address_division}
                form={{ ...form.getInputProps('permanent_division') }}
              />
              <MySelect
                label='বর্তমান ঠিকানা'
                placeholder='select option'
                data={_address_jilla}
                form={{ ...form.getInputProps('current_jilla') }}
              />
              <MySelect
                label='বিভাগ'
                placeholder='select option'
                data={_address_division}
                form={{ ...form.getInputProps('current_division') }}
              />
              <MySelect
                label='জন্মসন (আসল)'
                placeholder='select option'
                data={_birthYear}
                form={{ ...form.getInputProps('birth') }}
              />
              <MySelect
                label='গাত্রবর্ণ'
                placeholder='select option'
                data={_complexion}
                form={{ ...form.getInputProps('complexion') }}
              />
              <MySelect
                label='উচ্চতা'
                placeholder='select option'
                data={_height}
                form={{ ...form.getInputProps('height') }}
              />
              <MySelect
                label='ওজন'
                placeholder='select option'
                data={_weight}
                form={{ ...form.getInputProps('weight') }}
              />
              <MySelect
                label='রক্তের গ্রুপ'
                placeholder='select option'
                data={_bloodGroup}
                form={{ ...form.getInputProps('blood') }}
              />
              <MyInput
                label='পেশা'
                placeholder='সফটওয়্যার ইঞ্জিনিয়ার'
                description='সর্বোচ্চ ৩ শব্দে শুধু পদবী লিখবেন। পেশা সম্পর্কে বিস্তারিত লিখার
                জন্য সামনে প্রশ্ন আসছে।'
                form={{ ...form.getInputProps('profession') }}
              />
              <MyInput
                label='মাসিক আয়'
                withAsterisk={data?.type === 'পাত্রের বায়োডাটা'}
                placeholder='৩০ হাজার'
                form={{ ...form.getInputProps('income') }}
              />

              <SaveButton
                isLoading={isLoading}
                fields={fields}
              />
            </form>
          )
        )}
      </ProfileLayout>
    </>
  )
}
