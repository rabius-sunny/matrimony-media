import { useState } from 'react'
import DAddress from 'components/bio/DAddress'
import biodataRequests from 'services/network/biodataRequests'
import DEducation from 'components/bio/DEducaiton'
import DFamily from 'components/bio/DFamily'
import DPersonal from 'components/bio/DPersonal'
import DMarital from 'components/bio/DMarital'
import DAnother from 'components/bio/DAnother'
import DExpect from 'components/bio/DExpect'
import CSkeleton from 'components/shared/CSkeleton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LongModal from 'components/shared/Modals/LongModal'
import useAuth from 'hooks/useAuth'
import { PencilAltIcon } from '@heroicons/react/outline'
import { Loading } from '@nextui-org/react'
import useAsync from 'hooks/useAsync'
import requests from 'services/network/http'
import BioInfoCard from 'components/bio/BioInfoCard'

export default function Preview() {
  const { data, isLoading, error } = useAsync('/getbio-by-token', requests.get)
  const auth = useAuth()
  const [btnLoading, setBtnLoading] = useState(false)
  const [publishMessage, setPublishMessage] = useState(false)
  const [errorState, setErrorState] = useState(false)
  const [initialMessage, setInitialMessage] = useState(false)
  const router = useRouter()

  const handlePublish = (_) => {
    setBtnLoading(true)
    biodataRequests
      .publishRequest()
      .then((info) => info.message === 'ok' && setPublishMessage(true))
      .catch((err) => setErrorState(true))
      .finally(() => setBtnLoading(false))
  }

  if (error || data?.unfilled?.length !== 0) {
    return (
      <div>
        <LongModal
          blur
          scroll={false}
          visible={true}
          onClose={() => router.back()}
          header='Error'
          body={
            data?.unfilled?.length !== 0
              ? 'সবগুলো ফরম ফিল্ড পূরণ করা হয়নি, অনুগ্রহ করে পূরণ করে প্রিভিউ দেখুন।'
              : 'ইরর হয়েছে, আবার চেষ্টা করুন।'
          }
          btn='Go Back'
          color='success'
          bodyColor='error'
        />
      </div>
    )
  }

  return !isLoading && data ? (
    <div className='container3'>
      <Head>
        <title>প্রিভিউ | জান্নাতি জুটি.COM</title>
      </Head>
      <LongModal
        blur
        scroll={false}
        visible={initialMessage}
        onClose={() => setInitialMessage(false)}
        header='Editing Report'
        body={
          <div>
            আপনার তথ্যসমূহ সংরক্ষিত হয়েছে। বায়োডাটাটি পাবলিশ করতে নিচে
            <span className='text-secondary'> পাবলিশ রিকুয়েস্ট করুন </span>
            বাটনে ক্লিক করুন, প্রয়োজনীয় পরিবর্তন থাকলে{' '}
            <PencilAltIcon className='inline w-5 mr-1 text-secondary' />
            আইকনে ক্লিক করুন।
          </div>
        }
        btn='OK'
        color='success'
        bodyColor='success'
        preventClose={false}
      />
      <LongModal
        blur
        scroll={false}
        visible={publishMessage}
        onClose={() => router.push('/')}
        header='Publishing report'
        body='আপনার রিকুয়েস্টটি এ্যাপ্রুভাল পেন্ডিংয়ে লিস্ট করা হল। পাবলিশ করা হলে জানিয়ে দেয়া হবে।'
        btn='OK'
        color='success'
        bodyColor='success'
        preventClose={false}
      />
      <LongModal
        blur
        scroll={false}
        visible={errorState}
        onClose={() => setErrorState(false)}
        header='Publishing report'
        body='ইরর হয়েছে, আবার চেষ্টা করুন।'
        btn='OK'
        color='success'
        bodyColor='error'
      />
      <div className='mt-4'>
        <BioInfoCard
          data={data?.bio?.card}
          loading={isLoading}
          uId={data?.uId}
        />
        <div className='my-4'>
          <DAddress
            auth={auth}
            data={data?.bio?.address}
          />
        </div>

        <div className='my-4'>
          <DEducation
            auth={auth}
            data={data?.bio?.education}
          />
        </div>

        <div className='my-4'>
          <DFamily
            auth={auth}
            data={data?.bio?.family}
          />
        </div>

        <div className='my-4'>
          <DPersonal
            auth={auth}
            data={data?.bio?.personal}
          />
        </div>

        <div className='my-4'>
          <DMarital
            auth={auth}
            data={data?.bio?.marriage}
          />
        </div>

        <div className='my-4'>
          <DAnother
            auth={auth}
            data={data?.bio?.others}
          />
        </div>

        <div className='my-4'>
          <DExpect
            auth={auth}
            data={data?.bio?.expectation}
          />
        </div>
      </div>

      <div className='my-4'>
        <button
          onClick={handlePublish}
          className='text-white font-bold text-xl cursor-pointer rounded-md bg-primary  py-3 my-8 w-full'
        >
          {btnLoading ? (
            <Loading
              color='success'
              size='sm'
            />
          ) : (
            'পাবলিশ রিকুয়েস্ট করুন'
          )}
        </button>
      </div>
    </div>
  ) : (
    <div className='container3'>
      <Head>
        <title>বায়োডাটা</title>
      </Head>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={200}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={100}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={400}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={300}
          width={'100%'}
        />
      </div>
    </div>
  )
}
