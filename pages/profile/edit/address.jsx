import ProfileLayout from 'components/profile/ProfileLayout'
import { useForm as mantineForm, isNotEmpty } from '@mantine/form'
import { MyInput } from 'components/profile/MyInputs'

import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'

import { useEffect, useMemo, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'
import updateResponse from 'hooks/updateResponse'

export default function Address() {
  const { data, loading, mutate } = getData('address')
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)

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
        key: 'address'
      })
      .then((info) => updateResponse(info, mutate))
      .catch((err) => {
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
      .finally(() => {
        setIsLoading(false)
        setVisible({ message: '', status: false, done: true })
      })
  }
  const formProperty = useMemo(() => {
    return Object.keys(form.values)
  }, [])
  useEffect(() => {
    data &&
      formProperty.forEach((item) => form.setFieldValue(item, data.bio[item]))
  }, [data])

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>ঠিকানা</title>
      </Head>

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
            fields={data?.filled}
          />
        </form>
      )}
    </ProfileLayout>
  )
}
