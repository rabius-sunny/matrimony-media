import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm, isNotEmpty } from '@mantine/form'
import { MyInput, MySelect, MyTextarea } from 'components/profile/MyInputs'

import { useEffect, useMemo, useState } from 'react'

import getData from 'hooks/getData'
import biodataRequests from 'services/network/biodataRequests'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'

import { _madhabs } from 'assets/profileinfo'
import Link from 'next/link'
import { ExclamationIcon } from '@heroicons/react/solid'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'
import updateResponse from 'hooks/updateResponse'

export default function PersonalInfo() {
  const { data, loading, mutate } = getData('personal')
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(true)

  const form = useForm({
    initialValues: {
      beard: '',
      dress: '',
      dress_over_ankle: '',
      salat: '',
      salat_duration: '',
      maintain_mahram: '',
      can_tilawat: '',
      madhab: '',
      mazhab: '',
      political_view: '',
      drama_cinnema: '',
      disease: '',
      deeni_effort: '',
      murid_of_peer: '',
      majar_view: '',
      favorite_books: '',
      favorite_scholars: '',
      special_qualifications: '',
      about_me: ''
    },

    validate: {
      beard:
        data?.bio?.type === 'পাত্রের বায়োডাটা'
          ? isNotEmpty('ফিল্ডটি পূরণ করুন')
          : null,
      dress: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      dress_over_ankle:
        data?.bio?.type === 'পাত্রের বায়োডাটা'
          ? isNotEmpty('ফিল্ডটি পূরণ করুন')
          : null,
      salat: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      salat_duration: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      maintain_mahram: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      can_tilawat: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      madhab: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      mazhab: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      political_view: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      drama_cinnema: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      disease: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      deeni_effort: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      murid_of_peer: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      majar_view: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      favorite_books: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      favorite_scholars: isNotEmpty('ফিল্ডটি পূরণ করুন'),
      about_me: isNotEmpty('ফিল্ডটি পূরণ করুন')
    }
  })
  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        key: 'personal'
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
  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])

  useEffect(() => {
    if (data) {
      formProperty.forEach(
        (item) => form.setFieldValue(item, data.bio[item]) ?? ''
      )
      if (!data.bio.type) {
        setDone(false)
      }
    }
  }, [data, loading])

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>ব্যক্তিগত তথ্য</title>
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
      {!done && (
        <div className='border-l-4 border-red-500 flex bg-red-50 py-8 rounded px-2 items-center md:text-2xl text-primary font-bold text-center my-8'>
          <div className='mr-5'>
            <ExclamationIcon className='text-primary h-10 w-10' />
          </div>
          <div>
            <Link
              legacyBehavior
              href='/profile/edit/primary'
            >
              <a className=' underline text-indigo-500'>প্রাথমিক</a>
            </Link>{' '}
            ফিল্ডটি এখনো অপূর্ণাঙ্গ রয়েছে, আগে সেটি ফিল করুন
          </div>
        </div>
      )}
      {data && done ? (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          {data?.bio?.type === 'পাত্রের বায়োডাটা' && (
            <div>
              <MyInput
                label='সুন্নতি দাঁড়ি আছে কি?'
                form={{ ...form.getInputProps('beard') }}
              />
              <MyInput
                label='কাপড় পায়ের টাখনুর উপরে পড়েন?'
                form={{ ...form.getInputProps('dress_over_ankle') }}
              />
            </div>
          )}
          <MyTextarea
            label='ঘরের বাইরে সাধারণত কেমন ধরণের পোশাক পড়েন?'
            description={
              data?.bio?.type === 'পাত্রের বায়োডাটা'
                ? `এভাবে উত্তর দিতে পারেনঃ- "সাদা পাঞ্জবী সাথে সাদা টুপি" বা
                "জিন্স প্যান্ট সাথে শার্ট"`
                : `উত্তর যেভাবে দিতে পারেনঃ- "কালো বোরকা ও হিজাব পরি কিন্ত নিকাব
                পরি না" বা " কালো বোরকা ও নিকাব পরি কিন্ত হাত-পা মোজা পরি না"।
                এভাবে নিজের মত করে আপনার পোষাকের বিবরণ দিবেন। যেন পাঠক আপনার
                পর্দার ব্যাপারে নূন্যতম ধারণা করতে পারেন।`
            }
            form={{ ...form.getInputProps('dress') }}
          />
          <MyInput
            label='প্রতিদিন পাঁচ ওয়াক্ত সালাত পড়া হয়?'
            form={{ ...form.getInputProps('salat') }}
          />
          <MyInput
            label='নিয়মিত কত সময় যাবত সালাত পড়ছেন?'
            description='কয় বছর/মাস যাবত ৫ ওয়াক্ত সালাত শুরু করেছেন?'
            form={{ ...form.getInputProps('salat_duration') }}
          />
          <MyInput
            label='মাহরাম/গায়রে-মাহরাম মেনে চলেন কি?'
            form={{ ...form.getInputProps('maintain_mahram') }}
          />
          <MyInput
            label='শুদ্ধভাবে কুরআন তিলাওয়াত করতে পারেন?'
            form={{ ...form.getInputProps('can_tilawat') }}
          />
          <MySelect
            label='কোন মাযহাব অনুসরণ করেন'
            data={_madhabs}
            form={{ ...form.getInputProps('madhab') }}
          />
          <MyInput
            label='আপনার মাযহাব নিয়ে সংক্ষেপে লিখুন'
            form={{ ...form.getInputProps('mazhab') }}
          />
          <MyInput
            label='কোনো রাজনৈতিক দর্শন থাকলে লিখুন'
            form={{ ...form.getInputProps('political_view') }}
          />
          <MyInput
            label='নাটক/সিনেমা/সিরিয়াল/গান এসব দেখেন বা শুনেন?'
            form={{ ...form.getInputProps('drama_cinnema') }}
          />
          <MyInput
            label='মানসিক বা শারীরিক কোনো রোগ আছে কি?'
            form={{ ...form.getInputProps('disease') }}
          />
          <MyInput
            label='দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন?'
            form={{ ...form.getInputProps('deeni_effort') }}
          />
          <MyInput
            label='আপনি কি কোনো পীরের মুরিদ?'
            description='হয়ে থাকলে পীরের নাম, ঠিকানা ও মুরিদ হওয়ার কারণ লিখুন। না হলে
            পীর-মুরিদি সম্পর্কে আপনার বিশ্বাস লিখুন।'
            form={{ ...form.getInputProps('murid_of_peer') }}
          />
          <MyInput
            label='মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?'
            form={{ ...form.getInputProps('majar_view') }}
          />
          <MyInput
            label='আপনার পছন্দের অন্তত ৩ টি ইসলামী বইয়ের নাম লিখুন'
            form={{ ...form.getInputProps('favorite_books') }}
          />
          <MyInput
            label='আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন'
            form={{ ...form.getInputProps('favorite_scholars') }}
          />
          <MyTextarea
            label='বিশেষ দ্বীনি বা দুনিয়াবি যোগ্যতা (যদি থাকে)'
            withAsterisk={false}
            form={{ ...form.getInputProps('special_qualifications') }}
          />
          <MyTextarea
            label='নিজের সম্পর্কে কিছু লিখুন'
            description='নিজের পছন্দ-অপছন্দ, শখ-ইচ্ছা, দ্বীনী-দুনিয়াবী ইত্যাদি বিষয়
            বিস্তারিত লিখতে হবে। কারণ এই লেখা পড়ে পাঠক আপনার সম্পর্কে সাধারণ
            ধারণা লাভ করবে।'
            form={{ ...form.getInputProps('about_me') }}
          />

          <SaveButton
            isLoading={isLoading}
            fields={data?.filled}
          />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
