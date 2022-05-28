import { useRouter } from 'next/router'
import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import { Fade } from 'react-reveal'
import biodataRequests from 'services/biodataRequests'

export default function Address() {
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
            errors.pemanent_address ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.pemanent_address ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            স্থায়ী ঠিকানা *
          </legend>
          <input
            placeholder='গুলশান-২, ঢাকা'
            {...register('pemanent_address', {
              required: 'permanent address is required'
            })}
            className={`w-full rounded ${
              errors.pemanent_address ? 'bg-red-100' : 'bg-blue-100'
            } px-4 py-2 font-medium text-blue-400 shadow-md ${
              errors.pemanent_address
                ? 'focus:outline-red-500'
                : 'focus:outline-blue-500'
            }`}
          />
          <Fade right when={errors.pemanent_address ? true : false}>
            {errors.pemanent_address && (
              <p className='text-red-500 py-2 pl-2'>
                {errors.pemanent_address.message}
              </p>
            )}
          </Fade>
        </fieldset>

        <fieldset
          className={`my-6 rounded-md border-2 ${
            errors.current_address ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.current_address ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            বর্তমান ঠিকানা *
          </legend>
          <input
            placeholder='ভাটারা, গুলশান-২, ঢাকা'
            {...register('current_address', {
              required: 'current address is required'
            })}
            className={`w-full rounded ${
              errors.current_address ? 'bg-red-100' : 'bg-blue-100'
            } px-4 py-2 font-medium text-blue-400 shadow-md ${
              errors.current_address
                ? 'focus:outline-red-500'
                : 'focus:outline-blue-500'
            }`}
          />
          <Fade right when={errors.current_address ? true : false}>
            {errors.current_address && (
              <p className='text-red-500 py-2 pl-2'>
                {errors.current_address.message}
              </p>
            )}
          </Fade>
        </fieldset>

        <fieldset
          className={`my-6 rounded-md border-2 ${
            errors.where_lived ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.where_lived ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            কোথায় বড় হয়েছেন? *
          </legend>
          <input
            placeholder='ভাটারা, গুলশান-২, ঢাকা'
            {...register('where_lived', {
              required: 'address is required'
            })}
            className={`w-full rounded ${
              errors.where_lived ? 'bg-red-100' : 'bg-blue-100'
            } px-4 py-2 font-medium text-blue-400 shadow-md ${
              errors.where_lived
                ? 'focus:outline-red-500'
                : 'focus:outline-blue-500'
            }`}
          />
          <Fade right when={errors.where_lived ? true : false}>
            {errors.where_lived && (
              <p className='text-red-500 py-2 pl-2'>
                {errors.where_lived.message}
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
