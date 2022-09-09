import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useRouter } from 'next/router'
import getData from 'hooks/getData'
import { CInput, CSelect } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'
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
import { useEffect, useState } from 'react'
import { useAppContext } from 'utils/context'
import biodataRequests from 'services/biodataRequests'
import LongModal from 'components/shared/Modals/LongModal'
import { Loading } from '@nextui-org/react'

export default function GeneralInfo() {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const router = useRouter()

  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const onSubmit = data => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        age: new Date().getFullYear() - data.birth,
        published: false,
        featured: false
      })
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(1).then(info => {
            if (info.message === 'ok') {
              setIsLoading(false)
              setVisible({
                message:
                  'আপনার তথ্যগুলো সংরক্ষিত হয়েছে এবং আপনার বায়োডাটাটি এখন হাইড অবস্থায় রয়েছে। এটিকে পুনরায় পাবলিশ করার জন্য সবগুলো ফিল্ড পূরণ করে প্রিভিউ থেকে পাবলিশ করুন।',
                status: true,
                done: true
              })
            }
          })
        }
      })
      .catch(err => {
        setIsLoading(false)
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
  }
  const { data, loading } = getData()

  const { routes, setRoutes } = useAppContext()

  useEffect(() => {
    if (data) {
      if (
        data.condition &&
        data.permanent_jilla &&
        data.permanent_division &&
        data.current_jilla &&
        data.current_division &&
        data.birth &&
        data.profession &&
        data.income
      ) {
        setRoutes({
          ...routes,
          general: {
            name: 'সাধারণ তথ্য',
            link: '/general-info',
            status: 'done'
          }
        })
      }
    }
  }, [data, loading])
  useEffect(() => {
    biodataRequests.checkField().then(data => {
      setFields(data.fields)
    })
  }, [])
  return (
    <>
      <ProfileLayout data={data} loading={loading}>
        <Head>
          <title>সাধারণ তথ্য</title>
        </Head>
        <ProfileRoutes activeRoute={activeRoute} />

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
        ) : data ? (
          <CForm onSubmit={onSubmit}>
            <CSelect
              legend='স্থায়ী ঠিকানা *'
              message='Field is required'
              options={_address_jilla}
              name='permanent_jilla'
              defaultValue={data?.permanent_jilla}
            />

            <CSelect
              legend='বিভাগ *'
              message='Field is required'
              options={_address_division}
              name='permanent_division'
              defaultValue={data?.permanent_division}
            />

            <CSelect
              legend='বর্তমান ঠিকানা *'
              message='Field is required'
              options={_address_jilla}
              name='current_jilla'
              defaultValue={data?.current_jilla}
            />

            <CSelect
              legend='বিভাগ *'
              message='Field is required'
              options={_address_division}
              name='current_division'
              defaultValue={data?.current_division}
            />

            <CSelect
              legend='জন্মসন (আসল) *'
              message='Field is required'
              options={_birthYear}
              name='birth'
              defaultValue={data?.birth}
            />

            <CSelect
              legend='গাত্রবর্ণ'
              options={_complexion}
              name='complexion'
              defaultValue={data?.complexion}
            />

            <CSelect
              legend='উচ্চতা'
              options={_height}
              name='height'
              defaultValue={data?.height}
            />

            <CSelect
              legend='ওজন'
              options={_weight}
              name='weight'
              defaultValue={data?.weight}
            />

            <CSelect
              legend='Blood Group'
              options={_bloodGroup}
              name='blood'
              defaultValue={data?.blood}
            />

            <CInput
              name='profession'
              placeholder='সফটওয়্যার ইঞ্জিনিয়ার'
              legend='পেশা *'
              defaultValue={data?.profession}
              description='সর্বোচ্চ ৩ শব্দে শুধু পদবী লিখবেন। পেশা সম্পর্কে বিস্তারিত লিখার
            জন্য সামনে প্রশ্ন আসছে।'
              message='profession is required'
            />

            <CInput
              name='income'
              placeholder='৩০ হাজার'
              legend='মাসিক আয়'
              defaultValue={data?.income}
              description='জানাতে অনিচ্ছুক হলে ঘরটি ফাঁকা রাখুন।'
            />

            <div className='flex items-center'>
              <button
                type='submit'
                className={`${
                  isLoading
                    ? 'pointer-events-none cursor-not-allowed'
                    : 'cursor-pointer'
                } rounded-md bg-red-500 flex items-center font-medium text-white shadow-md hover:bg-red-600 px-6 py-3`}
              >
                {isLoading ? <Loading color='success' size='sm' /> : 'সেভ করুন'}
              </button>
              <button
                type='button'
                onClick={() => router.push('/profile/preview')}
                className={`${
                  fields.length
                    ? 'bg-gray-300 pointer-events-none'
                    : 'bg-green-500 hover:bg-green-600'
                } ml-2 rounded-md text-white px-6 py-3 shadow-md`}
              >
                প্রিভিউ দেখুন ও পাবলিশ করুন
              </button>
            </div>
          </CForm>
        ) : (
          <CForm onSubmit={onSubmit}>
            <CSelect
              legend='স্থায়ী ঠিকানা *'
              message='Field is required'
              options={_address_jilla}
              name='permanent_jilla'
            />

            <CSelect
              legend='বিভাগ *'
              message='Field is required'
              options={_address_division}
              name='permanent_division'
            />

            <CSelect
              legend='বর্তমান ঠিকানা *'
              message='Field is required'
              options={_address_jilla}
              name='current_jilla'
            />

            <CSelect
              legend='বিভাগ *'
              message='Field is required'
              options={_address_division}
              name='current_division'
            />

            <CSelect
              legend='জন্মসন (আসল) *'
              message='Field is required'
              options={_birthYear}
              name='birth'
            />

            <CSelect
              legend='গাত্রবর্ণ'
              options={_complexion}
              name='complexion'
            />

            <CSelect legend='উচ্চতা' options={_height} name='height' />

            <CSelect legend='ওজন' options={_weight} name='weight' />

            <CSelect legend='Blood Group' options={_bloodGroup} name='blood' />

            <CInput
              name='profession'
              placeholder='সফটওয়্যার ইঞ্জিনিয়ার'
              legend='পেশা *'
              description='সর্বোচ্চ ৩ শব্দে শুধু পদবী লিখবেন। পেশা সম্পর্কে বিস্তারিত লিখার
            জন্য সামনে প্রশ্ন আসছে।'
              message='profession is required'
            />

            <CInput
              name='income'
              placeholder='৩০ হাজার'
              legend='মাসিক আয় *'
              description='জানাতে অনিচ্ছুক হলে ঘরটি ফাঁকা রাখুন।'
            />

            <input
              type='submit'
              value='সেভ করুন ও পরবর্তী পেজে যান'
              className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
            />
          </CForm>
        )}
      </ProfileLayout>
    </>
  )
}
