import { useRouter } from 'next/router'
import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyInput, MySelect } from 'components/profile/MyInputs'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import { CInput } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect, useMemo, useState } from 'react'
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

  const form = mantineForm({
    initialValues: {
      permanent_address: '',
      current_address: '',
      where_lived: ''
    },

    validate: {
      permanent_address: isNotEmpty('ফিল্ডটি পূরণ করতে হবে।'),
      current_address: isNotEmpty('ফিল্ডটি পূরণ করতে হবে।'),
      where_lived: isNotEmpty('ফিল্ডটি পূরণ করতে হবে।')
    }
  })

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
  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])
  useEffect(() => {
    if (data) {
      formProperty.forEach((item) => form.setFieldValue(item, data[item]))
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
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <MyInput
            label='স্থায়ী ঠিকানা'
            placeholder='গুলশান-২, ঢাকা'
            form={{ ...form.getInputProps('permanent_address') }}
          />
          <MyInput
            label='বর্তমান ঠিকানা'
            placeholder='গুলশান-২, ঢাকা'
            form={{ ...form.getInputProps('current_address') }}
          />
          <MyInput
            label='কোথায় বড় হয়েছেন?'
            form={{ ...form.getInputProps('where_lived') }}
          />

          <SaveButton
            isLoading={isLoading}
            fields={fields}
          />
        </form>
      )}
    </ProfileLayout>
  )
}
