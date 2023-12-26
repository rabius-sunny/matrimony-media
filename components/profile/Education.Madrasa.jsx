import { useMemo, useState } from 'react'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyInput, MySelect, MyTextarea } from 'components/profile/MyInputs'
import biodataRequests from 'services/network/biodataRequests'
import { useEffect } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function EducationMadrasa({ data, loading, mutate }) {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const form = mantineForm({
    initialValues: {
      hafej: '',
      dawra: '',
      dawra_details: '',
      takhassus: '',
      highest_education: '',
      another_education: ''
    },

    validate: {
      hafej: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      dawra: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      dawra_details: isNotEmpty('ফিল্ডটি পূরণ করতে হবে'),
      takhassus: (value, values) =>
        values.dawra === yesno_dawra[0] && !value
          ? 'ফিল্ডটি পূরণ করতে হবে'
          : null,
      highest_education: isNotEmpty('সর্বোচ্চ শিক্ষাগত স্তরটি উল্লেখ করুন')
    }
  })

  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])

  useEffect(() => {
    if (data) {
      formProperty.forEach(
        (item) => form.setFieldValue(item, data.bio[item]) ?? ''
      )
    }
  }, [data, loading])
  useEffect(() => {
    if (
      form.values.dawra === yesno_dawra[1] ||
      form.values.dawra === yesno_dawra[2]
    ) {
      form.setValues({ takhassus: '' })
    }
  }, [form.values.dawra])

  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        key: 'education',
        published: false,
        featured: false
      })
      .then((info) => {
        if (info.message === 'ok') {
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
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
      .finally(() => setIsLoading(false))
  }
  return (
    <>
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
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <MySelect
          data={yesno}
          label='আপনি কি হাফেজ?'
          placeholder='select option'
          form={{ ...form.getInputProps('hafej') }}
        />
        <MySelect
          label='দাওরায়ে হাদীস পাশ করেছেন?'
          placeholder='select option'
          data={yesno_dawra}
          form={{ ...form.getInputProps('dawra') }}
        />
        <MyTextarea
          label='দাওরায়ে হাদীস এর বিস্তারিত'
          description={
            !form.values.dawra
              ? ''
              : form.values.dawra === yesno_dawra[0]
              ? 'পাশের সন ও ফলাফলসহ লিখবেন।'
              : 'কোন বর্ষে পড়ছেন লিখবেন। পাশ করতে না পারলে সেটাও লিখবেন।'
          }
          form={{ ...form.getInputProps('dawra_details') }}
        />
        {form.values.dawra === yesno_dawra[0] && (
          <MyTextarea
            label='আপনি কি তাখাসসুস পড়েছেন?'
            description='তাখাসসুসের বিষয়, পাসের সন, ফলাফলসহ লিখুন।'
            form={{ ...form.getInputProps('takhassus') }}
          />
        )}
        <MyInput
          label='সর্বোচ্চ শিক্ষাগত যোগ্যতাটি লিখুন।'
          form={{ ...form.getInputProps('highest_education') }}
          description='আপনি সফল হয়েছেন এমন সর্বোচ্চ শিক্ষাগত স্তরটি লিখুন।'
        />
        <MyInput
          label='অন্যান্য শিক্ষাগত যোগ্যতা'
          description='অন্যান্য কোন শিক্ষাগত যোগ্যতা, কোর্স বা পড়াশোনার বিষয়ে লিখতে পারেন। শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত লিখবেন।'
          withAsterisk={false}
          form={{ ...form.getInputProps('another_education') }}
        />
        <SaveButton
          fields={data?.filled}
          isLoading={isLoading}
        />
      </form>
    </>
  )
}

const yesno = ['হ্যা', 'না']
const yesno_dawra = ['হ্যা', 'না', 'এখনো পড়েছি']
