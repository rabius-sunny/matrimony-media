import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm, isNotEmpty } from '@mantine/form'
import { MyInput } from 'components/profile/MyInputs'

import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'

import { useEffect, useMemo, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function OthersInfo() {
  const { data, loading, mutate } = getData('expectation')

  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])

  const form = useForm({
    initialValues: {
      ex_year: '',
      ex_complexion: '',
      ex_height: '',
      ex_education: '',
      ex_jilla: '',
      ex_marrital_condition: '',
      ex_profession: '',
      ex_financial_condition: '',
      ex_family_condition: '',
      ex_features: ''
    },

    validate: {
      ex_year: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_complexion: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_height: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_education: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_jilla: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_marrital_condition: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_profession: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_financial_condition: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_family_condition: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      ex_features: isNotEmpty('ফিল্ডটি পূরণ করতে হবে')
    }
  })

  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        key: 'expectation',
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
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>যেমন জীবনসঙ্গী আশা করেন</title>
      </Head>

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
            label='বয়স'
            form={{ ...form.getInputProps('ex_year') }}
          />
          <MyInput
            label='গাত্রবর্ণ'
            form={{ ...form.getInputProps('ex_complexion') }}
          />
          <MyInput
            label='নূন্যতম উচ্চতা'
            form={{ ...form.getInputProps('ex_height') }}
          />
          <MyInput
            label='নূন্যতম শিক্ষাগত যোগ্যতা'
            form={{ ...form.getInputProps('ex_education') }}
          />
          <MyInput
            label='জেলা'
            form={{ ...form.getInputProps('ex_jilla') }}
          />
          <MyInput
            label='বৈবাহিক অবস্থা'
            form={{ ...form.getInputProps('ex_marrital_condition') }}
          />
          <MyInput
            label='পেশা'
            form={{ ...form.getInputProps('ex_profession') }}
          />
          <MyInput
            label='অর্থনৈতিক অবস্থা'
            form={{ ...form.getInputProps('ex_financial_condition') }}
          />
          <MyInput
            label='পারিবারিক অবস্থা'
            form={{ ...form.getInputProps('ex_family_condition') }}
          />
          <MyInput
            label='জীবনসঙ্গীর যে বৈশিষ্ট্য বা গুণাবলি আশা করেন'
            form={{ ...form.getInputProps('ex_features') }}
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
