import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import { _type } from 'assets/profileinfo'
import { Fade } from 'react-reveal'

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
  const onSubmit = data => {
    console.log(JSON.stringify(data))
  }

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          className={`my-6 rounded-md border-2 ${
            errors.name ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.name ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            সম্পূর্ণ নাম *
          </legend>
          <input
            placeholder='মোঃ রবিউস সানী'
            {...register('name', {
              required: 'please fill the form'
            })}
            className={`w-full rounded ${
              errors.name ? 'bg-red-100' : 'bg-blue-100'
            } px-4 py-2 font-medium text-blue-400 shadow-md ${
              errors.name ? 'focus:outline-red-500' : 'focus:outline-blue-500'
            }`}
          />
          <Fade right when={errors.name ? true : false}>
            {errors.name && (
              <p className='text-red-500 py-2 pl-2'>{errors.name.message}</p>
            )}
          </Fade>
          <p className='pl-2 pt-4 text-blue-400'>
            নাম নেয়া হচ্ছে ভেরিফিকেশনের জন্য, পূর্ণ নাম লিখবেন। আপনার নাম কারো
            সাথে শেয়ার করা হবে না।
          </p>
        </fieldset>

        <fieldset
          className={`my-6 rounded-md border-2 ${
            errors.category ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.category ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            বায়োডাটার ধরন *
          </legend>
          <select
            onClick={e => console.log(e.target.value)}
            className={`w-full border-2 ${
              errors.category ? 'border-red-500' : 'border-blue-300'
            } p-2 rounded-md`}
            {...register('category', { required: 'required' })}
          >
            <option value=''>select</option>
            {_type.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Fade right when={errors.category ? true : false}>
            {errors.category && (
              <p className='text-red-500 py-2 pl-2'>
                {errors.category.message}
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
    </ProfileLayout>
  )
}
