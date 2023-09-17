import { useRouter } from 'next/router'
import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import { CInput } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function Address() {
  const { data, loading, mutate } = getData()
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const router = useRouter()
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false
  const { routes, setRoutes } = useAppContext()

  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        published: false,
        featured: false
      })
      .then((info) => {
        if (info.message === 'ok') {
          biodataRequests.setField(5).then((info) => {
            if (info.message === 'ok') {
              setIsLoading(false)
              mutate()
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
      .catch((err) => {
        setIsLoading(false)
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
  }

  useEffect(() => {
    if (data) {
      setRoutes({
        ...routes,
        address: {
          name: 'ঠিকানা',
          link: '/address',
          status: 'done'
        }
      })
    }
  }, [data, loading])
  useEffect(() => {
    biodataRequests.checkField().then((data) => {
      setFields(data.fields)
    })
  }, [visible.done])

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
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
      ) : (
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

          <SaveButton
            isLoading={isLoading}
            fields={fields}
          />
        </CForm>
      )}
    </ProfileLayout>
  )
}
