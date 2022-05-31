import { useRouter } from 'next/router'
import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import { CInput } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'

export default function Address() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const onSubmit = data =>
    biodataRequests
      .updateBio(data)
      .then(info => console.log(info))
      .catch(err => console.log(err.message))

  const { data, loading } = getData()
  console.log(data)

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      {!loading && data ? (
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
        <div>Loading...</div>
      )}
    </ProfileLayout>
  )
}
