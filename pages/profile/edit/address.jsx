import { useRouter } from 'next/router'
import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import { CInput } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect } from 'react'

export default function Address() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const onSubmit = data =>
    biodataRequests
      .updateBio(data)
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(2).then(info => {
            if (info.message === 'ok') {
              router.push('/profile/edit/educational-qualifications')
            }
          })
        }
      })
      .catch(err => console.log(err.message))

  const { data, loading } = getData()

  const { routes, setRoutes } = useAppContext()
  useEffect(() => {
    if (data) {
      if (
        !data.permanent_address ||
        !data.current_address ||
        !data.where_lived
      ) {
        setRoutes({
          ...routes,
          address: {
            name: 'ঠিকানা',
            link: '/address',
            error: true
          }
        })
      }
    }
  }, [data, loading])

  return (
    <ProfileLayout data={data} loading={loading}>
      <Head>
        <title>ঠিকানা</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />
      {loading ? (
        <FormSkeleton />
      ) : data ? (
        <CForm onSubmit={onSubmit}>
          <CInput
            legend='স্থায়ী ঠিকানা *'
            name='permanent_address'
            placeholder='গুলশান-২, ঢাকা'
            defaultValue={data?.permanent_address}
            message='field is required'
          />

          <CInput
            legend='বর্তমান ঠিকানা *'
            name='current_address'
            placeholder='ভাটারা, গুলশান-২, ঢাকা'
            defaultValue={data?.current_address}
            message='field is required'
          />

          <CInput
            legend='কোথায় বড় হয়েছেন? *'
            name='where_lived'
            defaultValue={data?.where_lived}
            message='field is required'
          />

          <input
            type='submit'
            value='Save Changes'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </CForm>
      ) : (
        <CForm onSubmit={onSubmit}>
          <CInput
            legend='স্থায়ী ঠিকানা *'
            name='permanent_address'
            placeholder='গুলশান-২, ঢাকা'
            message='field is required'
          />

          <CInput
            legend='বর্তমান ঠিকানা *'
            name='current_address'
            placeholder='ভাটারা, গুলশান-২, ঢাকা'
            message='field is required'
          />

          <CInput
            legend='কোথায় বড় হয়েছেন? *'
            name='where_lived'
            message='field is required'
          />

          <input
            type='submit'
            value='Save Changes'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </CForm>
      )}
    </ProfileLayout>
  )
}
