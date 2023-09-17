import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import {
  _femalecondition,
  _malecondition,
  _conditions,
  _type
} from 'assets/profileinfo'
import { CInput, CSelect } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import { Loading } from '@nextui-org/react'
import SaveButton from 'components/bio/SaveButton'

export default function Name() {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const { data, loading, mutate } = getData()
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const router = useRouter()
  const [type, setType] = useState(null)
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false

  const onSubmit = (infos) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...infos,
        published: false,
        featured: false
      })
      .then((info) => {
        if (info.message === 'ok') {
          biodataRequests.setField(0).then((info) => {
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

  const { routes, setRoutes } = useAppContext()

  useEffect(() => {
    if (data) {
      setRoutes({
        ...routes,
        primary: {
          name: 'প্রাথমিক',
          link: '/primary',
          status: 'done'
        }
      })
      setType(data?.type)
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
        <title>প্রাথমিক তথ্য</title>
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
        data && (
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
              defaultValue={data?.condition}
              options={
                type === 'পাত্রের বায়োডাটা'
                  ? _malecondition
                  : type === 'পাত্রীর বায়োডাটা'
                  ? _femalecondition
                  : _conditions
              }
              name='condition'
            />

            <SaveButton
              isLoading={isLoading}
              fields={fields}
            />
          </CForm>
        )
      )}
    </ProfileLayout>
  )
}
