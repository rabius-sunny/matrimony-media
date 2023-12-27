import { useMemo, useState } from 'react'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyInput, MySelect, MyTextarea } from 'components/profile/MyInputs'
import biodataRequests from 'services/network/biodataRequests'
import { useEffect } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'
import updateResponse from 'hooks/updateResponse'

export default function EducationGeneral({ data, loading, mutate }) {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const form = mantineForm({
    initialValues: {
      secondary: '',
      secondary_details: '',
      higher: '',
      higher_details: '',
      honors_details: '',
      highest_education: '',
      another_education: ''
    },

    validate: {
      secondary: isNotEmpty('মাধ্যমিকের তথ্য দিন'),
      secondary_details: isNotEmpty('মাধ্যমিকের তথ্য দিন'),
      higher: (value, values) =>
        values.secondary === yesno[0] && !value
          ? 'উচ্চমাধ্যমিকের তথ্য দিন'
          : null,
      higher_details: (value, values) =>
        values.higher && !value ? 'উচ্চমাধ্যমিকের তথ্য দিন' : null,
      highest_education: isNotEmpty('সর্বোচ্চ শিক্ষাগত স্তরটি উল্লেখ করুন')
    }
  })

  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])

  useEffect(() => {
    if (data) {
      formProperty.forEach((item) =>
        form.setFieldValue(item, data.bio[item] ?? '')
      )
    }
  }, [data, loading])

  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        key: 'education'
      })
      .then((info) => updateResponse(info, mutate))
      .catch((err) => {
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
      .finally(() => {
        setIsLoading(false)
        setVisible({ message: '', status: false, done: true })
      })
  }

  const trimResult = () => {
    let formdata
    if (form.values.secondary === yesno[0]) {
      if (form.values.higher === yesno[0]) {
        formdata = {
          secondary: form.values.secondary,
          secondary_details: form.values.secondary_details,
          higher: form.values.higher,
          higher_details: form.values.higher_details,
          honors_details: form.values.honors_details,
          highest_education: form.values.highest_education,
          another_education: form.values.another_education
        }
      } else {
        formdata = {
          secondary: form.values.secondary,
          secondary_details: form.values.secondary_details,
          higher: form.values.higher,
          higher_details: form.values.higher_details,
          highest_education: form.values.highest_education,
          another_education: form.values.another_education,
          honors_details: ''
        }
      }
    } else {
      formdata = {
        secondary: form.values.secondary,
        secondary_details: form.values.secondary_details,
        highest_education: form.values.highest_education,
        another_education: form.values.another_education,
        higher: '',
        higher_details: '',
        honors_details: ''
      }
    }
    // const data = Object.fromEntries(
    //   Object.entries(formdata).map(([key, value]) => [key, value ?? ''])
    // )
    onSubmit(formdata)
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

      <form onSubmit={form.onSubmit((values) => trimResult())}>
        <MySelect
          label='মাধ্যমিক (SSC) / সমমান পাশ করেছেন?'
          placeholder='select option'
          data={yesno}
          form={{ ...form.getInputProps('secondary') }}
        />
        <MyTextarea
          label='মাধ্যমিক(SSC) / সমমান বিষয়ে লিখুন'
          description={
            form.values.secondary === yesno[1] ? (
              <ul className='text-secondary desc'>
                <li>পরীক্ষা না দিলে লিখবেন - ৮ম/৯ম শ্রেণি পর্যন্ত পড়েছি।</li>
                <li>পাশ করতে না পারলে সেটাও লিখবেন।</li>
              </ul>
            ) : (
              <ul className='text-secondary desc'>
                <li>
                  পাশের সাল, বিভাগ ও ফলাফলসহ লিখবেন এভাবে - ২০২৩ সালে পাশ করেছি
                  বিজ্ঞান বিষয়ে। A+ রেজাল্ট।
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
            <MyTextarea
              label='উচ্চমাধ্যমিক(HSC) / সমমান বিষয়ে লিখুন'
              description={
                form.values.higher === yesno_heigher[1] ? (
                  <ul className='text-secondary desc'>
                    <li>কোন বর্ষে পড়েন বিভাগসহ লিখবেন।</li>
                    <li>SSC এর পরে পড়াশোনা না করলে সেটা লিখবেন।</li>
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
                      পাশের সাল, বিভাগ ও ফলাফলসহ লিখবেন এভাবে - ২০২৩ সালে পাশ
                      করেছি বিজ্ঞান বিষয়ে। A+ রেজাল্ট।
                    </li>
                  </ul>
                )
              }
              form={{ ...form.getInputProps('higher_details') }}
            />
            {form.values.higher === yesno_heigher[0] && (
              <MyTextarea
                withAsterisk={false}
                label='স্নাতক/স্নাতক(সম্মান)/সমমান বা উচ্চতর শিক্ষাগত যোগ্যতা'
                description='এভাবে লিখতে পারেনঃ BA in English Language & Literature,
                  running year/passed year, university/college CGPA...'
                form={{ ...form.getInputProps('honors_details') }}
              />
            )}
          </>
        )}

        <MyInput
          label='সর্বোচ্চ শিক্ষাগত যোগ্যতাটি লিখুন।'
          placeholder='মাধ্যমিক পাশ করেছি বা ইংলিশে অনার্স কমপ্লিট করেছি ইত্যাদি।'
          form={{ ...form.getInputProps('highest_education') }}
          description='আপনি সফল হয়েছেন এমন সর্বোচ্চ শিক্ষাগত স্তরটি লিখুন।'
        />
        <MyTextarea
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
const yesno_heigher = ['হ্যা', 'না', 'ডিপ্লোমা পড়েছি']
