import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { _type } from 'assets/profileinfo'
import { CInput, CSelect } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
export default function Name() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const onSubmit = data => {
    biodataRequests
      .updateBio(data)
      .then(info => console.log(info))
      .catch(err => console.log(err.message))
  }
  const { data, error, loading } = getData()

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
      <ProfileRoutes activeRoute={activeRoute} />

      {!loading ? (
        <CForm onSubmit={onSubmit}>
          <CInput
            name='name'
            placeholder='মোঃ রবিউস সানী'
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
            value='save changes and go next'
            className='rounded-md bg-white px-6 py-3 text-xl border-2 cursor-pointer border-red-500 font-medium text-red-500 hover:bg-red-500 hover:text-white shadow-md focus:ring-2 focus:ring-red-800'
          />
        </CForm>
      ) : (
        <div>Loading...</div>
      )}
    </ProfileLayout>
  )
}
