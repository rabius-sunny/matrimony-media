import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import { Fade } from 'react-reveal'
import OptionMap from 'components/profile/OptionMap'

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
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
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
            onClick={e => console.log(e.target.value)}
            className={`w-full focus:outline-none border-2 ${
              errors.family_about_bio ? 'border-red-500' : 'border-blue-300'
            } p-2 rounded-md`}
            {...register('family_about_bio', { required: 'field is required' })}
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
            onClick={e => console.log(e.target.value)}
            className={`w-full focus:outline-none border-2 ${
              errors.is_correct_info ? 'border-red-500' : 'border-blue-300'
            } p-2 rounded-md`}
            {...register('is_correct_info', { required: 'field is required' })}
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
            কোনো মিথ্যা তথ্য দিয়ে থাকলে তার দুনিয়াবী ও আখিরাতের দায়ভার ওয়েবসাইট
            কর্তৃপক্ষ নিবে না। আপনি কি রাজি? *
          </legend>
          <select
            onClick={e => console.log(e.target.value)}
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
    </ProfileLayout>
  )
}
const yesno = ['হ্যা', 'না']
