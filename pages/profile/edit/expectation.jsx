import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import { Fade } from 'react-reveal'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect, useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import { Loading } from '@nextui-org/react'

export default function OthersInfo() {
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
          biodataRequests.setField(8).then(info => {
            if (info.message === 'ok') {
              setIsLoading(false)
              setVisible({
                message:
                  'আপনার তথ্যগুলো সংরক্ষিত হয়েছে এবং আপনার বায়োডাটাটি এখন হাইড অবস্থায় রয়েছে। এটিকে পুনরায় পাবলিশ করার জন্য সবগুলো ফিল্ড পূরণ করে প্রিভিউ থেকে পাবলিশ করুন।',
                status: true,
                done: true
              })
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
      if (
        data.ex_year &&
        data.ex_complexion &&
        data.ex_height &&
        data.ex_education &&
        data.ex_jilla &&
        data.ex_marrital_condition &&
        data.ex_profession &&
        data.ex_financial_condition &&
        data.ex_features
      ) {
        setRoutes({
          ...routes,
          expectation: {
            name: 'যেমন জীবনসঙ্গী আশা করেন',
            link: '/expectation',
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
        <title>যেমন জীবনসঙ্গী আশা করেন</title>
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
              errors.ex_year ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_year ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              বয়স *
            </legend>
            <input
              defaultValue={data?.ex_year}
              {...register('ex_year', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.ex_year ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_year
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_year ? true : false}>
              {errors.ex_year && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_year.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_complexion ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_complexion ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              গাত্রবর্ণ *
            </legend>
            <input
              defaultValue={data?.ex_complexion}
              {...register('ex_complexion', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.ex_complexion ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_complexion
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_complexion ? true : false}>
              {errors.ex_complexion && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_complexion.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_height ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_height ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              নূন্যতম উচ্চতা *
            </legend>
            <input
              defaultValue={data?.ex_height}
              {...register('ex_height', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.ex_height ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_height
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_height ? true : false}>
              {errors.ex_height && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_height.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_education ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_education ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              নূন্যতম শিক্ষাগত যোগ্যতা *
            </legend>
            <input
              defaultValue={data?.ex_education}
              {...register('ex_education', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.ex_education ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_education
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_education ? true : false}>
              {errors.ex_education && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_education.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_jilla ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_jilla ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              জেলা *
            </legend>
            <input
              defaultValue={data?.ex_jilla}
              {...register('ex_jilla', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.ex_jilla ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_jilla
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_jilla ? true : false}>
              {errors.ex_jilla && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_jilla.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_marrital_condition
                ? 'border-red-500'
                : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_marrital_condition ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              বৈবাহিক অবস্থা *
            </legend>
            <input
              defaultValue={data?.ex_marrital_condition}
              {...register('ex_marrital_condition', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.ex_marrital_condition ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_marrital_condition
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_marrital_condition ? true : false}>
              {errors.ex_marrital_condition && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_marrital_condition.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_profession ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_profession ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              পেশা *
            </legend>
            <input
              defaultValue={data?.ex_profession}
              {...register('ex_profession', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.ex_profession ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_profession
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_profession ? true : false}>
              {errors.ex_profession && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_profession.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_financial_condition
                ? 'border-red-500'
                : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_financial_condition ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              অর্থনৈতিক অবস্থা *
            </legend>
            <input
              defaultValue={data?.ex_financial_condition}
              {...register('ex_financial_condition', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.ex_financial_condition ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_financial_condition
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_financial_condition ? true : false}>
              {errors.ex_financial_condition && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_financial_condition.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 font-bold text-blue-500'>
              পারিবারিক অবস্থা
            </legend>
            <input
              defaultValue={data?.ex_family_condition}
              {...register('ex_family_condition')}
              className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
            />
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_features ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_features ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              জীবনসঙ্গীর যে বৈশিষ্ট্য বা গুণাবলি আশা করেন *
            </legend>
            <textarea
              defaultValue={data?.ex_features}
              rows={5}
              {...register('ex_features', {
                required: 'this field is required'
              })}
              className={`w-full rounded ${
                errors.ex_features ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.ex_features
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.ex_features ? true : false}>
              {errors.ex_features && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.ex_features.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              এই পয়েন্ট অনেক গুরুত্বপূর্ণ। সময় নিয়ে বিস্তারিত লিখুন। কোন বিশেষ
              শর্ত থাকলে তা-ও লিখতে পারেন।
            </p>
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
