import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import getData from 'hooks/getData'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import { Fade } from 'react-reveal'
import biodataRequests from 'services/biodataRequests'

export default function MarriageRelated() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const { data, loading } = getData()

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
      {!loading && data ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.guardians_permission ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.guardians_permission ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              অভিভাবক আপনার বিয়েতে রাজি কি না? *
            </legend>
            <input
              defaultValue={data.guardians_permission}
              {...register('guardians_permission', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.guardians_permission ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.guardians_permission
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.guardians_permission ? true : false}>
              {errors.guardians_permission && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.guardians_permission.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.marry_reason ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.marry_reason ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              বিয়ে কেন করছেন? বিয়ে সম্পর্কে আপনার ধারণা কি? *
            </legend>
            <textarea
              defaultValue={data.marry_reason}
              rows={5}
              {...register('marry_reason', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.marry_reason ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.marry_reason
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.marry_reason ? true : false}>
              {errors.marry_reason && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.marry_reason.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>সংক্ষেপে বর্ণনা করুন।</p>
          </fieldset>

          {data.type === 'পাত্রের বায়োডাটা' && (
            <div>
              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.family_planning ? 'border-red-500' : 'border-blue-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.family_planning ? 'text-red-500' : 'text-blue-500'
                  }`}
                >
                  বিয়ের পর স্ত্রীকে নিয়ে আপনার পরিকল্পনা বিস্তারিত লিখুন *
                </legend>
                <textarea
                  defaultValue={data.family_planning}
                  rows={5}
                  {...register('family_planning', {
                    required: 'please fill the field'
                  })}
                  className={`w-full rounded ${
                    errors.family_planning ? 'bg-red-100' : 'bg-blue-100'
                  } px-4 py-2 font-medium text-blue-400 shadow-md ${
                    errors.family_planning
                      ? 'focus:outline-red-500'
                      : 'focus:outline-blue-500'
                  }`}
                />
                <Fade right when={errors.family_planning ? true : false}>
                  {errors.family_planning && (
                    <p className='text-red-500 py-2 pl-2'>
                      {errors.family_planning.message}
                    </p>
                  )}
                </Fade>
                <p className='pl-2 pt-4 text-blue-400'>
                  বিয়ের পর স্ত্রীর পর্দার ব্যবস্থা, পড়াশোনা এবং চাকরী করতে দিবেন
                  কিনা, স্ত্রীকে নিয়ে কোথায় থাকবেন ইত্যাদি স্পষ্ট লিখুন
                </p>
              </fieldset>

              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.demand ? 'border-red-500' : 'border-blue-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.demand ? 'text-red-500' : 'text-blue-500'
                  }`}
                >
                  আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক/উপহার/অর্থ আশা
                  করবেন কিনা? *
                </legend>
                <textarea
                  defaultValue={data.demand}
                  rows={5}
                  {...register('demand', {
                    required: 'please fill the field'
                  })}
                  className={`w-full rounded ${
                    errors.demand ? 'bg-red-100' : 'bg-blue-100'
                  } px-4 py-2 font-medium text-blue-400 shadow-md ${
                    errors.demand
                      ? 'focus:outline-red-500'
                      : 'focus:outline-blue-500'
                  }`}
                />
                <Fade right when={errors.demand ? true : false}>
                  {errors.demand && (
                    <p className='text-red-500 py-2 pl-2'>
                      {errors.demand.message}
                    </p>
                  )}
                </Fade>
              </fieldset>
            </div>
          )}

          {data.type === 'পাত্রীর বায়োডাটা' && (
            <div>
              <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                <legend className='ml-4 font-bold text-blue-500'>
                  আপনি কি বিয়ের পর পড়াশোনা করতে ইচ্ছুক?
                </legend>
                <input
                  defaultValue={data.education_after_marriage}
                  {...register('education_after_marriage')}
                  className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                />
                <p className='pl-2 pt-4 text-blue-400'>
                  ছাত্রী হলে বিয়ের পর পড়াশোনা চালিয়ে যেতে চান কিনা লিখুন।
                </p>
              </fieldset>

              <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                <legend className='ml-4 font-bold text-blue-500'>
                  আপনি কি বিয়ের পর চাকরি করতে ইচ্ছুক?
                </legend>
                <input
                  defaultValue={data.job_after_marriage}
                  {...register('job_after_marriage')}
                  className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                />
                <p className='pl-2 pt-4 text-blue-400'>
                  চাকরীজীবী হলে বিয়ের পর চাকরি চালিয়ে যেতে চান কিনা লিখুন।
                </p>
              </fieldset>
            </div>
          )}

          <input
            type='submit'
            value='Save Changes'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </form>
      ) : (
        <div>Loading ...</div>
      )}
    </ProfileLayout>
  )
}
