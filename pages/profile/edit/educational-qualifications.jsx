import Head from 'next/head'
import ProfileLayout from 'components/profile/ProfileLayout'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Link from 'next/link'
import { ExclamationIcon } from '@heroicons/react/outline'
import EducationGeneral from 'components/profile/Education.General'
import EducationMadrasa from 'components/profile/Education.Madrasa'

export default function Education() {
  const { data, loading, mutate } = getData('education')

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>শিক্ষাগত যোগ্যতা</title>
      </Head>
      {loading ? (
        <FormSkeleton />
      ) : data?.bio?.education ? (
        data?.bio?.education === educationType[0] ? (
          <EducationGeneral
            data={data}
            loading={loading}
            mutate={mutate}
          />
        ) : (
          <EducationMadrasa
            data={data}
            loading={loading}
            mutate={mutate}
          />
        )
      ) : (
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
    </ProfileLayout>
  )
}

const educationType = ['জেনারেল', 'মাদ্রাসা']
