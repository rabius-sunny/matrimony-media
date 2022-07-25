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
import { useEffect } from 'react'
import { useAppContext } from 'utils/context'
import biodataRequests from 'services/biodataRequests'

export default function GeneralInfo() {
  const router = useRouter()

  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const onSubmit = data => {
    biodataRequests
      .updateBio(data)
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(1).then(info => {
            if (info.message === 'ok') {
              router.push('/profile/edit/address')
            }
          })
        }
      })
      .catch(err => console.log(err.message))
  }
  const { data, loading } = getData()

  const { routes, setRoutes } = useAppContext()
  useEffect(() => {
    if (data) {
      if (
        !data.condition ||
        !data.permanent_jilla ||
        !data.permanent_division ||
        !data.current_jilla ||
        !data.current_division ||
        !data.birth ||
        !data.profession ||
        !data.income
      ) {
        setRoutes({
          ...routes,
          general: {
            name: 'সাধারণ তথ্য',
            link: '/general-info',
            error: true
          }
        })
      }
    }
  }, [data, loading])
  return (
    <>
      <ProfileLayout data={data} loading={loading}>
        <Head>
          <title>সাধারণ তথ্য</title>
        </Head>
        <ProfileRoutes activeRoute={activeRoute} />

        {loading ? (
          <FormSkeleton />
        ) : data ? (
          <CForm onSubmit={onSubmit}>
            <CSelect
              legend='বৈবাহিক অবস্থা *'
              message='Field is required'
              options={_condition}
              name='condition'
              defaultValue={data?.condition}
            />

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
              legend='মাসিক আয় *'
              defaultValue={data?.income}
              description='জানাতে অনিচ্ছুক হলে ঘরটি ফাঁকা রাখুন।'
            />

            <input
              type='submit'
              value='Save Changes'
              className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
            />
          </CForm>
        ) : (
          <CForm onSubmit={onSubmit}>
            <CSelect
              legend='বৈবাহিক অবস্থা *'
              message='Field is required'
              options={_condition}
              name='condition'
            />

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
              value='Save Changes'
              className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
            />
          </CForm>
        )}
      </ProfileLayout>
    </>
  )
}
