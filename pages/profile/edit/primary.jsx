import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { _femalecondition, _malecondition, _type } from 'assets/profileinfo'
import { CInput, CSelect } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect, useState } from 'react'

export default function Name() {
  const { data, loading } = getData()
  const router = useRouter()
  const [type, setType] = useState(null)
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const onSubmit = infos => {
    biodataRequests
      .updateBio({ ...infos, published: false, featured: false })
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(0).then(info => {
            if (info.message === 'ok') {
              router.push('/profile/edit/personal-info')
            }
          })
        }
      })
      .catch(err => console.log(err.message))
  }

  const { routes, setRoutes } = useAppContext()

  useEffect(() => {
    if (data) {
      if (!data.name || !data.type || !data.condition) {
        setRoutes({
          ...routes,
          primary: {
            name: 'প্রাথমিক',
            link: '/primary',
            error: true
          }
        })
      }
      setType(data?.type)
    }
  }, [data, loading])

  // const onReset = data => {
  //   let _reset = {}
  //   const dataArray = Object.keys(data)
  // dataArray.map(item => {
  //   _reset[item] = ''
  // })
  // Unneccessary
  //   for (const key of dataArray) {
  //     _reset[key] = ''
  //   }
  //   reset(_reset)
  // }

  return (
    <ProfileLayout data={data} loading={loading}>
      <Head>
        <title>প্রাথমিক তথ্য</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />
      {loading ? (
        <FormSkeleton />
      ) : data ? (
        <CForm onSubmit={onSubmit}>
          <CInput
            name='name'
            placeholder='My name'
            legend='সম্পূর্ণ নাম *'
            defaultValue={data?.name}
            description='নাম নেয়া হচ্ছে ভেরিফিকেশনের জন্য, পূর্ণ নাম লিখবেন। আপনার নাম কারো
          সাথে শেয়ার করা হবে না।'
            message='name is required'
          />
          <CSelect
            legend='বায়োডাটার ধরন *'
            message='Field is required'
            options={_type}
            onChange={setType}
            name='type'
            defaultValue={data?.type}
          />
          <CSelect
            legend='বৈবাহিক অবস্থা *'
            message='Field is required'
            options={
              type === 'পাত্রের বায়োডাটা'
                ? _malecondition
                : type === 'পাত্রীর বায়োডাটা'
                ? _femalecondition
                : []
            }
            name='condition'
            defaultValue={data?.condition}
          />
          <input
            type='submit'
            value='সেভ করুন ও পরবর্তী পেজে যান'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </CForm>
      ) : (
        <CForm onSubmit={onSubmit}>
          <CInput
            name='name'
            placeholder='My name'
            legend='সম্পূর্ণ নাম *'
            description='নাম নেয়া হচ্ছে ভেরিফিকেশনের জন্য, পূর্ণ নাম লিখবেন। আপনার নাম কারো
          সাথে শেয়ার করা হবে না।'
            message='name is required'
          />
          <CSelect
            legend='বায়োডাটার ধরন *'
            message='Field is required'
            options={_type}
            onChange={setType}
            name='type'
          />
          <CSelect
            legend='বৈবাহিক অবস্থা *'
            message='Field is required'
            options={
              type === 'পাত্রের বায়োডাটা'
                ? _malecondition
                : type === 'পাত্রীর বায়োডাটা'
                ? _femalecondition
                : []
            }
            name='condition'
            defaultValue={data?.condition}
          />
          <input
            type='submit'
            value='সেভ করুন ও পরবর্তী পেজে যান'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </CForm>
      )}
    </ProfileLayout>
  )
}
