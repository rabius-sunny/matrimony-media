import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { _type } from 'assets/profileinfo'
import { CInput, CSelect } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect } from 'react'

export default function Name() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const onSubmit = infos => {
    biodataRequests
      .updateBio(infos)
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(0).then(info => {
            if (info.message === 'ok') {
              router.push('/profile/edit/general-info')
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
      if (!data.name || !data.type) {
        setRoutes({
          ...routes,
          primary: {
            name: 'প্রাথমিক',
            link: '/name',
            error: true
          }
        })
      }
    }
  }, [data, loading])

  // const onReset = data => {
  //   const _reset = {}
  //   const dataArray = Object.keys(data)
  //   for (const key of dataArray) {
  //     _reset[key] = ''
  //   }
  //   reset(_reset)
  // }

  return (
    <ProfileLayout>
      <Head>
        <title>প্রাথমিক তথ্য</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />

      {!loading ? (
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
            name='type'
            defaultValue={data?.type}
          />
          <input
            type='submit'
            value='save changes'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </CForm>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
