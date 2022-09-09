import ProfileLayout from 'components/profile/ProfileLayout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { _brothers } from 'assets/profileinfo'
import { useForm } from 'react-hook-form'
import { Fade } from 'react-reveal'
import OptionMap from 'components/profile/OptionMap'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { Loading } from '@nextui-org/react'
import LongModal from 'components/shared/Modals/LongModal'

export default function Family() {
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

  const { data, loading } = getData()

  const [brothers, setBrothers] = useState('')
  const [sisters, setSisters] = useState('')

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange'
  })
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
          biodataRequests.setField(4).then(info => {
            if (info.message === 'ok') {
              setIsLoading(false)
              setVisible({
                message:
                  'আপনার তথ্যগুলো সংরক্ষিত হয়েছে এবং আপনার বায়োডাটাটি এখন হাইড অবস্থায় রয়েছে। এটিকে পুনরায় পাবলিশ করার জন্য সবগুলো ফিল্ড পূরণ করে প্রিভিউ থেকে পাবলিশ করুন।',
                status: true,
                done: true
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

  useEffect(() => {
    if (data) {
      setBrothers(data?.brothers)
      setSisters(data?.sisters)
    }
  }, [data])
  const { routes, setRoutes } = useAppContext()
  useEffect(() => {
    if (data) {
      if (
        data.father_name &&
        data.mother_name &&
        data.father_profession &&
        data.mother_profession &&
        data.brothers &&
        data.sisters
      ) {
        setRoutes({
          ...routes,
          family: {
            name: 'পারিবারিক তথ্য',
            link: '/family-info',
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
  }, [])

  return (
    <ProfileLayout data={data} loading={loading}>
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
      {!loading && data ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.father_name ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.father_name ? 'text-red-500' : 'text-blue-500'
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
                errors.father_name ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.father_name
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.father_name ? true : false}>
              {errors.father_name && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.father_name.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              পিতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য।
              আপনার পিতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে
              পারবে না।
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.mother_name ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.mother_name ? 'text-red-500' : 'text-blue-500'
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
                errors.mother_name ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.mother_name
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.mother_name ? true : false}>
              {errors.mother_name && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.mother_name.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              মাতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য।
              আপনার মাতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে
              পারবে না।
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.father_profession ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.father_profession ? 'text-red-500' : 'text-blue-500'
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
                errors.father_profession ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.father_profession
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.father_profession ? true : false}>
              {errors.father_profession && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.father_profession.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) ব্যবসায়ী
              ছিলেন।
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.mother_profession ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.mother_profession ? 'text-red-500' : 'text-blue-500'
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
                errors.mother_profession ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.mother_profession
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.mother_profession ? true : false}>
              {errors.mother_profession && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.mother_profession.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) গৃহিণী
              ছিলেন।
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.brothers ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.brothers ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              ভাই কয়জন? *
            </legend>
            <select
              onClick={e => setBrothers(e.target.value)}
              defaultValue={data?.brothers}
              className={`w-full focus:outline-none border-2 ${
                errors.brothers ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('brothers', { required: 'field is required' })}
            >
              <option value=''>select</option>
              <OptionMap data={newBrothers} />
            </select>
            <Fade right when={errors.brothers ? true : false}>
              {errors.brothers && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.brothers.message}
                </p>
              )}
            </Fade>
          </fieldset>

          {newBrothers.indexOf(brothers) > 0 && (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.brothers_info ? 'border-red-500' : 'border-blue-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.brothers_info ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                ভাইদের সম্পর্কে তথ্য
              </legend>
              <textarea
                defaultValue={data?.brothers_info}
                rows={5}
                {...register('brothers_info')}
                className={`w-full rounded ${
                  errors.brothers_info ? 'bg-red-100' : 'bg-blue-100'
                } px-4 py-2 font-medium text-blue-400 shadow-md ${
                  errors.brothers_info
                    ? 'focus:outline-red-500'
                    : 'focus:outline-blue-500'
                }`}
              />
              <p className='pl-2 pt-4 text-blue-400'>
                সকল ভাইদের শিক্ষাগত যোগ্যতা, বৈবাহিক অবস্থা, পেশা, বর্তমান
                অবস্থান লিখুন। একাধিক ভাই থাকলে কমা দিয়ে নিচের লাইনে এসে লিখবেন।
              </p>
            </fieldset>
          )}

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.sisters ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.sisters ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              বোন কয়জন? *
            </legend>
            <select
              onClick={e => setSisters(e.target.value)}
              defaultValue={data?.sisters}
              className={`w-full focus:outline-none border-2 ${
                errors.sisters ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('sisters', { required: 'field is required' })}
            >
              <option value=''>select</option>
              <OptionMap data={newSisters} />
            </select>
            <Fade right when={errors.sisters ? true : false}>
              {errors.sisters && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.sisters.message}
                </p>
              )}
            </Fade>
          </fieldset>
          {newSisters.indexOf(sisters) > 0 && (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.sisters_info ? 'border-red-500' : 'border-blue-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.sisters_info ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                বোনদের সম্পর্কে তথ্য
              </legend>
              <textarea
                defaultValue={data?.sisters_info}
                rows={5}
                {...register('sisters_info')}
                className={`w-full rounded ${
                  errors.sisters_info ? 'bg-red-100' : 'bg-blue-100'
                } px-4 py-2 font-medium text-blue-400 shadow-md ${
                  errors.sisters_info
                    ? 'focus:outline-red-500'
                    : 'focus:outline-blue-500'
                }`}
              />
              <p className='pl-2 pt-4 text-blue-400'>
                সকল বোনদের শিক্ষাগত যোগ্যতা, বৈবাহিক অবস্থা, পেশা, বিবাহিত হলে
                স্বামীর পেশা লিখুন। একাধিক বোন থাকলে কমা দিয়ে নিচের লাইনে এসে
                লিখবেন।
              </p>
            </fieldset>
          )}

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 font-bold text-blue-500'>
              চাচা-মামাদের পেশা
            </legend>
            <textarea
              defaultValue={data?.uncles_profession}
              rows={5}
              {...register('uncles_profession')}
              className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
            />
            <p className='pl-2 pt-4 text-blue-400'>
              জানাতে অনিচ্ছুক হলে ফাঁকা রাখুন।
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.family_status ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.family_status ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              পরিবারের অর্থনৈতিক ও সামাজিক অবস্থা
            </legend>
            <textarea
              defaultValue={data?.family_status}
              rows={5}
              {...register('family_status', { required: 'field is required' })}
              className={`w-full rounded ${
                errors.family_status ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.family_status
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.family_status ? true : false}>
              {errors.family_status && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.family_status.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>সংক্ষেপে বর্ণনা করুন।</p>
          </fieldset>

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
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
const newBrothers = ['ভাই নেই', ..._brothers]
const newSisters = ['বোন নেই', ..._brothers]
