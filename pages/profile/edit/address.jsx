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
import { useEffect, useState } from 'react'
import { Loading } from '@nextui-org/react'
import LongModal from 'components/shared/Modals/LongModal'

export default function Address() {
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
        published: false,
        featured: false
      })
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(5).then(info => {
            if (info.message === 'ok') {
              setIsLoading(false)
              setVisible({ message: '', status: false, done: true })

              window.scroll({
                top: 100,
                left: 100,
                behavior: 'smooth'
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

  const { data, loading } = getData(visible.done)

  const { routes, setRoutes } = useAppContext()

  useEffect(() => {
    if (data) {
      if (data.permanent_address && data.current_address && data.where_lived) {
        setRoutes({
          ...routes,
          address: {
            name: 'ঠিকানা',
            link: '/address',
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
  }, [visible.done])

  return (
    <ProfileLayout data={data} loading={loading}>
      <Head>
        <title>ঠিকানা</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />
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
            value='সেভ করুন ও পরবর্তী পেজে যান'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </CForm>
      )}
    </ProfileLayout>
  )
}
