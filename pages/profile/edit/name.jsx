import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import { _type } from 'assets/profileinfo'
import { Fade } from 'react-reveal'
import OptionMap from 'components/profile/OptionMap'
import biodataRequests from 'services/biodataRequests'
import { CInput } from 'components/profile/CInputs'
import CForm from 'components/profile/CFroms'

export default function Name() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  let req = false

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit
  // } = useForm({
  //   mode: 'onChange'
  // })
  const onSubmit = data => {
    console.log(data)
    // biodataRequests
    //   .updateBio(data)
    //   .then(info => console.log(info))
    //   .catch(err => console.log(err.message))
  }

  // const onReset = data => {
  //   const _reset = {}
  //   const dataArray = Object.keys(data)
  //   for (const key of dataArray) {
  //     _reset[key] = ''
  //   }
  //   reset(_reset)
  // }

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />

      {/* <form onSubmit={handleSubmit(onSubmit)}>
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
              required: req && 'please fill the form'
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
            errors.type ? 'border-red-500' : 'border-blue-300'
          } p-4`}
        >
          <legend
            className={`ml-4 font-bold ${
              errors.type ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            বায়োডাটার ধরন *
          </legend>
          <select
            onClick={e => console.log(e.target.value)}
            className={`w-full focus:outline-none border-2 ${
              errors.type ? 'border-red-500' : 'border-blue-300'
            } p-2 rounded-md`}
            {...register('type', { required: 'required' })}
          >
            <option value=''>select</option>
            <OptionMap data={_type} />
          </select>
          <Fade right when={errors.type ? true : false}>
            {errors.type && (
              <p className='text-red-500 py-2 pl-2'>{errors.type.message}</p>
            )}
          </Fade>
        </fieldset>

        <input
          type='submit'
          value='Save Changes'
          className='rounded-md bg-white px-6 py-3 text-xl border-2 cursor-pointer border-red-500 font-medium text-red-500 hover:bg-red-500 hover:text-white shadow-md focus:ring-2 focus:ring-red-800'
        />
      </form> */}

      <CForm onSubmit={onSubmit}>
        <CInput
          name='name2'
          legend='সম্পূর্ণ নাম *'
          description='this is description'
          message='name is required'
        />
        <input type='submit' className='bg-red-500 p-2' value='Submit' />
      </CForm>
    </ProfileLayout>
  )
}
