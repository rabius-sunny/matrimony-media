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
            name: 'আকাঙ্ক্ষিত বৈশিষ্ট্যাবলী',
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
              errors.ex_year ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_year ? 'text-primary' : 'text-secondary'
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
                errors.ex_year ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_year
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_year ? true : false}>
              {errors.ex_year && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_year.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_complexion ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_complexion ? 'text-primary' : 'text-secondary'
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
                errors.ex_complexion ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_complexion
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_complexion ? true : false}>
              {errors.ex_complexion && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_complexion.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_height ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_height ? 'text-primary' : 'text-secondary'
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
                errors.ex_height ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_height
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_height ? true : false}>
              {errors.ex_height && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_height.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_education ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_education ? 'text-primary' : 'text-secondary'
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
                errors.ex_education ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_education
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_education ? true : false}>
              {errors.ex_education && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_education.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_jilla ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_jilla ? 'text-primary' : 'text-secondary'
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
                errors.ex_jilla ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_jilla
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_jilla ? true : false}>
              {errors.ex_jilla && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_jilla.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_marrital_condition
                ? 'border-red-500'
                : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_marrital_condition ? 'text-primary' : 'text-secondary'
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
                errors.ex_marrital_condition ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_marrital_condition
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_marrital_condition ? true : false}>
              {errors.ex_marrital_condition && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_marrital_condition.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_profession ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_profession ? 'text-primary' : 'text-secondary'
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
                errors.ex_profession ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_profession
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_profession ? true : false}>
              {errors.ex_profession && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_profession.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_financial_condition
                ? 'border-red-500'
                : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_financial_condition
                  ? 'text-primary'
                  : 'text-secondary'
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
                errors.ex_financial_condition ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_financial_condition
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_financial_condition ? true : false}>
              {errors.ex_financial_condition && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_financial_condition.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
            <legend className='ml-4 font-bold text-secondary'>
              পারিবারিক অবস্থা
            </legend>
            <input
              defaultValue={data?.ex_family_condition}
              {...register('ex_family_condition')}
              className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
            />
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.ex_features ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.ex_features ? 'text-primary' : 'text-secondary'
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
                errors.ex_features ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.ex_features
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.ex_features ? true : false}>
              {errors.ex_features && (
                <p className='text-primary py-2 pl-2'>
                  {errors.ex_features.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-green-400'>
              এই পয়েন্ট অনেক গুরুত্বপূর্ণ। সময় নিয়ে বিস্তারিত লিখুন। কোন বিশেষ
              শর্ত থাকলে তা-ও লিখতে পারেন।
            </p>
          </fieldset>

          <SaveButton isLoading={isLoading} fields={fields} />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
