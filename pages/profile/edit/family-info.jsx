import ProfileLayout from 'components/profile/ProfileLayout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { _brothers } from 'assets/profileinfo'
import { useForm } from 'react-hook-form'
import biodataRequests from 'services/network/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function Family() {
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

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange'
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
          biodataRequests.setField(4).then((info) => {
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
        family: {
          name: 'পারিবারিক',
          link: '/family-info',
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
        <title>পারিবারিক তথ্য</title>
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
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.father_name ? 'border-red-500' : 'border-green-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.father_name ? 'text-primary' : 'text-secondary'
              }`}
            >
              পিতার নাম (শেয়ার করা হবে না) *
            </legend>
            <input
              defaultValue={data?.father_name}
              {...register('father_name', {
                required: 'Father name is required'
              })}
              className={`w-full rounded ${
                errors.father_name ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.father_name
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            {errors.father_name && (
              <p className='text-primary py-2 pl-2'>
                {errors.father_name.message}
              </p>
            )}
            <p className='pl-2 pt-4 text-green-400'>
              পিতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য।
              আপনার পিতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে
              পারবে না।
            </p>
          </fieldset>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.mother_name ? 'border-red-500' : 'border-green-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.mother_name ? 'text-primary' : 'text-secondary'
              }`}
            >
              মাতার নাম (শেয়ার করা হবে না) *
            </legend>
            <input
              defaultValue={data?.mother_name}
              {...register('mother_name', {
                required: 'Mother name is required'
              })}
              className={`w-full rounded ${
                errors.mother_name ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.mother_name
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            {errors.mother_name && (
              <p className='text-primary py-2 pl-2'>
                {errors.mother_name.message}
              </p>
            )}
            <p className='pl-2 pt-4 text-green-400'>
              মাতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য।
              আপনার মাতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে
              পারবে না।
            </p>
          </fieldset>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.father_profession ? 'border-red-500' : 'border-green-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.father_profession ? 'text-primary' : 'text-secondary'
              }`}
            >
              পিতার পেশা *
            </legend>
            <input
              defaultValue={data?.father_profession}
              {...register('father_profession', {
                required: "Father's profession is required"
              })}
              className={`w-full rounded ${
                errors.father_profession ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.father_profession
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            {errors.father_profession && (
              <p className='text-primary py-2 pl-2'>
                {errors.father_profession.message}
              </p>
            )}
            <p className='pl-2 pt-4 text-green-400'>
              মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) ব্যবসায়ী
              ছিলেন।
            </p>
          </fieldset>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.mother_profession ? 'border-red-500' : 'border-green-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.mother_profession ? 'text-primary' : 'text-secondary'
              }`}
            >
              মাতার পেশা *
            </legend>
            <input
              defaultValue={data?.mother_profession}
              {...register('mother_profession', {
                required: "Mother's profession is required"
              })}
              className={`w-full rounded ${
                errors.mother_profession ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.mother_profession
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            {errors.mother_profession && (
              <p className='text-primary py-2 pl-2'>
                {errors.mother_profession.message}
              </p>
            )}
            <p className='pl-2 pt-4 text-green-400'>
              মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) গৃহিণী
              ছিলেন।
            </p>
          </fieldset>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.brothers_info ? 'border-red-500' : 'border-green-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.brothers_info ? 'text-primary' : 'text-secondary'
              }`}
            >
              ভাইদের সম্পর্কে তথ্য
            </legend>
            <textarea
              defaultValue={data?.brothers_info}
              rows={5}
              {...register('brothers_info')}
              className={`w-full rounded ${
                errors.brothers_info ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.brothers_info
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <p className='pl-2 pt-4 text-green-400'>
              কয়জন ভাই রয়েছে তা লিখুন। এরপর সকল ভাইদের শিক্ষাগত যোগ্যতা, বৈবাহিক
              অবস্থা, পেশা, বর্তমান অবস্থান লিখুন। একাধিক ভাই থাকলে কমা দিয়ে
              নিচের লাইনে এসে লিখবেন। ভাই না থাকলে লিখবেন{' '}
              <span className='text-red-300'>ভাই নেই</span>
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.sisters_info ? 'border-red-500' : 'border-green-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.sisters_info ? 'text-primary' : 'text-secondary'
              }`}
            >
              বোনদের সম্পর্কে তথ্য
            </legend>
            <textarea
              defaultValue={data?.sisters_info}
              rows={5}
              {...register('sisters_info')}
              className={`w-full rounded ${
                errors.sisters_info ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.sisters_info
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <p className='pl-2 pt-4 text-green-400'>
              কয়জন বোন রয়েছে তা লিখুন। এরপর সকল বোনদের শিক্ষাগত যোগ্যতা, বৈবাহিক
              অবস্থা, পেশা, বিবাহিত হলে স্বামীর পেশা লিখুন। একাধিক বোন থাকলে কমা
              দিয়ে নিচের লাইনে এসে লিখবেন। বোন না থাকলে লিখবেন{' '}
              <span className='text-red-300'>বোন নেই</span>
            </p>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-green-300 p-4'>
            <legend className='ml-4 font-bold text-secondary'>
              চাচা-মামাদের পেশা
            </legend>
            <textarea
              defaultValue={data?.uncles_profession}
              rows={5}
              {...register('uncles_profession')}
              className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
            />
            <p className='pl-2 pt-4 text-green-400'>
              জানাতে অনিচ্ছুক হলে ফাঁকা রাখুন।
            </p>
          </fieldset>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.family_status ? 'border-red-500' : 'border-green-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.family_status ? 'text-primary' : 'text-secondary'
              }`}
            >
              পরিবারের অর্থনৈতিক ও সামাজিক অবস্থা *
            </legend>
            <textarea
              defaultValue={data?.family_status}
              rows={5}
              {...register('family_status', { required: 'field is required' })}
              className={`w-full rounded ${
                errors.family_status ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.family_status
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            {errors.family_status && (
              <p className='text-primary py-2 pl-2'>
                {errors.family_status.message}
              </p>
            )}
            <p className='pl-2 pt-4 text-green-400'>সংক্ষেপে বর্ণনা করুন।</p>
          </fieldset>
          <SaveButton
            isLoading={isLoading}
            fields={fields}
          />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
