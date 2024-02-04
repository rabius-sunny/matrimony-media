import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyInput } from 'components/profile/MyInputs'

import getData from 'hooks/getData'

import biodataRequests from 'services/network/biodataRequests'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import { ExclamationIcon } from '@heroicons/react/solid'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'
import updateResponse from 'hooks/updateResponse'

export default function MarriageRelated() {
  const [states, setStates] = useState({
    widower: false,
    married: false,
    divorced: false,
    widow: false,
    male: false,
    female: false
  })
  const { data, loading, mutate } = getData('marriage')
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })

  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)

  const form = mantineForm({
    initialValues: {
      whenDiedWife: '',
      reMarryReason: '',
      family_planning: '',
      demand: '',
      divorceInfo: '',
      whenDiedHusband: '',
      marry_reason: '',
      guardians_permission: '',
      education_after_marriage: '',
      job_after_marriage: ''
    },
    validate: {
      guardians_permission:
        !states.married && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      marry_reason: !states.married && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      family_planning: states.male && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      whenDiedWife: states.widower && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      divorceInfo: states.divorced && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      reMarryReason: states.married && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      demand: states.male && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      whenDiedHusband: states.widow && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      education_after_marriage:
        states.female && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।'),
      job_after_marriage:
        states.female && isNotEmpty('ফিল্ডটিতে কিছু লিখতে হবে।')
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

      if (!data.bio.type || !data.bio.condition) {
        setDone(false)
      } else {
        setDone(true)
        setStates({
          widower: data.bio.condition === 'বিপত্মীক',
          married: data.bio.condition === 'বিবাহিত',
          divorced: data.bio.condition === 'ডিভোর্সড',
          widow: data.bio.condition === 'বিধবা',
          male: data.bio.type === 'পাত্রের বায়োডাটা',
          female: data.bio.type === 'পাত্রীর বায়োডাটা'
        })
      }
    }
  }, [data, loading])

  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        key: 'marriage'
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

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>বিয়েসম্পর্কিত তথ্য</title>
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
      {!loading && !done && (
        <p className='border-l-4 border-red-500 flex bg-red-50 py-8 rounded px-2 items-center md:text-2xl text-primary font-bold text-center my-8'>
          <div className='mr-5'>
            <ExclamationIcon className='text-primary h-10 w-10' />
          </div>
          <div>
            <Link
              href='/profile/edit/primary'
              className=' underline text-indigo-500'
            >
              প্রাথমিক
            </Link>{' '}
            ফিল্ডটি এখনো অপূর্ণাঙ্গ রয়েছে, আগে সেটি ফিল করুন
          </div>
        </p>
      )}
      {data && done ? (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          {states.widower && (
            <MyInput
              label='আপনার স্ত্রী কবে, কিভাবে মারা গিয়েছিল ?'
              form={{ ...form.getInputProps('whenDiedWife') }}
              description='কয় বছরের সংসার ছিল উল্লেখ করতে পারেন। আপনার সন্তান আছে কি না,
              থাকলে তাদের বয়স সহ বর্ণনা দিবেন সংক্ষেপে।'
            />
          )}
          {states.widow && (
            <MyInput
              label='আপনার স্বামী কবে, কিভাবে মারা গিয়েছিল ?'
              form={{ ...form.getInputProps('whenDiedHusband') }}
              description='কয় বছরের সংসার ছিল উল্লেখ করতে পারেন। আপনার সন্তান আছে কি না,
            থাকলে তাদের বয়স সহ বর্ণনা দিবেন সংক্ষেপে।'
            />
          )}
          {states.divorced && (
            <MyInput
              label='আপনার ডিভোর্সের সময়কাল ও কারণ'
              form={{ ...form.getInputProps('divorceInfo') }}
              description='সময়কাল অর্থাৎ কত মাস বা বছরের সংসার হয়েছিল আর ডিভোর্স কবে হয়েছে
              তা লিখতে বলা হয়েছে। বাচ্চা থাকলে তাদের বয়স ও অন্যান্য বিষয়ে
              লিখুন সংক্ষেপে।'
            />
          )}

          {states.married ? (
            <MyInput
              label='বিবাহিত অবস্থায় আবার কেন বিয়ে করতে চাচ্ছেন ?'
              form={{ ...form.getInputProps('reMarryReason') }}
              description='বর্তমানে কতজন স্ত্রী আছে, স্ত্রী আপনার নতুন বিয়েতে রাজি কি না,
            নতুন স্ত্রীকে কোথায় রাখবেন এসব সংক্ষেপে লিখুন।'
            />
          ) : (
            <MyInput
              label='বিয়ে কেন করছেন? বিয়ে সম্পর্কে আপনার ধারণা কি?'
              form={{ ...form.getInputProps('marry_reason') }}
              description='সংক্ষেপে বর্ণনা করুন।'
            />
          )}

          {!states.married && (
            <MyInput
              label='অভিভাবক আপনার বিয়েতে রাজি কি না?'
              form={{ ...form.getInputProps('guardians_permission') }}
            />
          )}

          {states.male && (
            <div>
              <MyInput
                label='বিয়ের পর স্ত্রীকে নিয়ে আপনার পরিকল্পনা বিস্তারিত লিখুন।'
                form={{ ...form.getInputProps('family_planning') }}
                description='বিয়ের পর স্ত্রীর পর্দার ব্যবস্থা, পড়াশোনা এবং চাকরী করতে দিবেন
            কিনা, স্ত্রীকে নিয়ে কোথায় থাকবেন ইত্যাদি স্পষ্ট লিখুন।'
              />
              <MyInput
                label='আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক/উপহার/অর্থ আশা
                করবেন কিনা ?'
                form={{ ...form.getInputProps('demand') }}
              />
            </div>
          )}

          {states.female && (
            <div>
              <MyInput
                label='আপনি কি বিয়ের পর পড়াশোনা করতে ইচ্ছুক ?'
                form={{ ...form.getInputProps('education_after_marriage') }}
                description='ছাত্রী হলে বিয়ের পর পড়াশোনা চালিয়ে যেতে চান কিনা লিখুন।'
              />
              <MyInput
                label='আপনি কি বিয়ের পর চাকরি করতে ইচ্ছুক ?'
                form={{ ...form.getInputProps('job_after_marriage') }}
                description='চাকরীজীবী হলে বিয়ের পর চাকরি চালিয়ে যেতে চান কিনা লিখুন।'
              />
            </div>
          )}

          <SaveButton
            fields={data?.filled}
            isLoading={isLoading}
          />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
