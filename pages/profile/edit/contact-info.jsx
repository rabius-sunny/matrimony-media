import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { Fade } from 'react-reveal'
import { useForm } from 'react-hook-form'
import biodataRequests from 'services/biodataRequests'

export default function Name() {
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
      .then(info => console.log(info))
      .catch(err => console.log(err.message))

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          className={`my-6 rounded-md border-2 ${
            errors.guandian_number ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.guandian_number ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            অভিভাবকের নাম্বার *
          </legend>
          <input
            placeholder='01700000000'
            {...register('guandian_number', {
              required: 'please fill the form'
            })}
            className={`w-full rounded ${
              errors.guandian_number ? 'bg-red-100' : 'bg-blue-100'
            } px-4 py-2 font-medium text-blue-400 shadow-md ${
              errors.guandian_number
                ? 'focus:outline-red-500'
                : 'focus:outline-blue-500'
            }`}
          />
          <Fade right when={errors.guandian_number ? true : false}>
            {errors.guandian_number && (
              <p className='text-red-500 py-2 pl-2'>
                {errors.guandian_number.message}
              </p>
            )}
          </Fade>
          <p className='pl-2 pt-4 text-blue-400'>
            অবশ্যই ইংরেজীতে নাম্বার লিখবেন এভাবে 01700-000000। বিঃদ্রঃ নিজের
            নাম্বার দিলে ভেরিফিকেশনে এপ্রুভ হবে না। এই ব্যাপারে আমরা সর্বোচ্চ
            কঠোর। সব সময় খোলা থাকবে এমন নাম্বার লিখবেন। নাম্বার বন্ধ থাকার আশংকা
            থাকলে দুইটি নাম্বার লিখতে পারেন।
          </p>
        </fieldset>

        <fieldset
          className={`my-6 rounded-md border-2 ${
            errors.number_relation ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.number_relation ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            যার নাম্বার লিখেছেন *
          </legend>
          <input
            {...register('number_relation', {
              required: 'please fill the form'
            })}
            className={`w-full rounded ${
              errors.number_relation ? 'bg-red-100' : 'bg-blue-100'
            } px-4 py-2 font-medium text-blue-400 shadow-md ${
              errors.number_relation
                ? 'focus:outline-red-500'
                : 'focus:outline-blue-500'
            }`}
          />
          <Fade right when={errors.number_relation ? true : false}>
            {errors.number_relation && (
              <p className='text-red-500 py-2 pl-2'>
                {errors.number_relation.message}
              </p>
            )}
          </Fade>
          <p className='pl-2 pt-4 text-blue-400'>
            যে অভিভাবকের নাম্বার দিয়েছেন তার সাথে আপনার সম্পর্ক। এভাবে লিখবেনঃ
            বাবা
          </p>
        </fieldset>

        <fieldset
          className={`my-6 rounded-md border-2 ${
            errors.receiving_email ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.receiving_email ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            বায়োডাটা গ্রহণের ই-মেইল এড্রেস *
          </legend>
          <input
            {...register('receiving_email', {
              required: 'enter a valid receiving_email address',
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
            })}
            className={`w-full rounded ${
              errors.receiving_email ? 'bg-red-100' : 'bg-blue-100'
            } px-4 py-2 font-medium text-blue-400 shadow-md ${
              errors.receiving_email
                ? 'focus:outline-red-500'
                : 'focus:outline-blue-500'
            }`}
          />
          <Fade right when={errors.receiving_email ? true : false}>
            {errors.receiving_email && (
              <p className='text-red-500 py-2 pl-2'>
                {errors.receiving_email.message ||
                  'enter a valid email address'}
              </p>
            )}
          </Fade>
          <p className='pl-2 pt-4 text-blue-400'>
            এই ই-মেইলে অপরপক্ষ বায়োডাটার লিংক পাঠাতে পারে। তাই নির্ভুলভাবে
            লিখুন।
          </p>
        </fieldset>
        <input
          type='submit'
          value='Save Changes'
          className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
        />
      </form>
    </ProfileLayout>
  )
}
