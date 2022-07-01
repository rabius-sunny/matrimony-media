import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import { Fade } from 'react-reveal'
import OptionMap from 'components/profile/OptionMap'
import biodataRequests from 'services/biodataRequests'
import getData from 'hooks/getData'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { useEffect } from 'react'

export default function AuthorityQuestion() {
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
  const onSubmit = data =>
    biodataRequests
      .updateBio(data)
      .then(info => {
        if (info.message === 'ok') {
          biodataRequests.setField(9).then(info => {
            if (info.message === 'ok') {
              router.push('/profile/edit/contact-info')
            }
          })
        }
      })
      .catch(err => console.log(err.message))

  const { data, loading } = getData()

  const { routes, setRoutes } = useAppContext()
  useEffect(() => {
    if (data) {
      if (!data.family_about_bio || !data.is_correct_info || !data.liability) {
        setRoutes({
          ...routes,
          authority: {
            name: 'কর্তৃপক্ষের জিজ্ঞাসা',
            link: '/authority-question',
            error: true
          }
        })
      }
    }
  }, [data, loading])

  return (
    <ProfileLayout>
      <Head>
        <title>কর্তৃপক্ষের জিজ্ঞাসা</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.family_about_bio ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.family_about_bio ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              এই ওয়েবসাইটে বায়োডাটা জমা দিচ্ছেন তা অভিভাবক জানেন? *
            </legend>
            <select
              defaultValue={data?.family_about_bio}
              className={`w-full focus:outline-none border-2 ${
                errors.family_about_bio ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('family_about_bio', {
                required: 'field is required'
              })}
            >
              <option value=''>select</option>
              <OptionMap data={yesno} />
            </select>
            <Fade right when={errors.family_about_bio ? true : false}>
              {errors.family_about_bio && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.family_about_bio.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.is_correct_info ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.is_correct_info ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              আল্লাহ'র শপথ করে সাক্ষ্য দিন, যে তথ্যগুলো দিচ্ছেন সব সত্য? *
            </legend>
            <select
              defaultValue={data?.is_correct_info}
              className={`w-full focus:outline-none border-2 ${
                errors.is_correct_info ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('is_correct_info', {
                required: 'field is required'
              })}
            >
              <option value=''>select</option>
              <OptionMap data={yesno} />
            </select>
            <Fade right when={errors.is_correct_info ? true : false}>
              {errors.is_correct_info && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.is_correct_info.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.liability ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.liability ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              কোনো মিথ্যা তথ্য দিয়ে থাকলে তার দুনিয়াবী ও আখিরাতের দায়ভার
              ওয়েবসাইট কর্তৃপক্ষ নিবে না। আপনি কি রাজি? *
            </legend>
            <select
              defaultValue={data?.liability}
              className={`w-full focus:outline-none border-2 ${
                errors.liability ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('liability', { required: 'field is required' })}
            >
              <option value=''>select</option>
              <OptionMap data={yesno} />
            </select>
            <Fade right when={errors.liability ? true : false}>
              {errors.liability && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.liability.message}
                </p>
              )}
            </Fade>
          </fieldset>
          <input
            type='submit'
            value='Save Changes'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
const yesno = ['হ্যা', 'না']
