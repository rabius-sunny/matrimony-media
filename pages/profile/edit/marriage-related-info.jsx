import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import getData from 'hooks/getData'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import biodataRequests from 'services/network/biodataRequests'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useAppContext } from 'utils/context'
import Link from 'next/link'
import { ExclamationIcon } from '@heroicons/react/solid'
import LongModal from 'components/shared/Modals/LongModal'
import SaveButton from 'components/bio/SaveButton'

export default function MarriageRelated() {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const [done, setDone] = useState(false)
  const router = useRouter()
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false

  const { data, loading } = getData(visible.done)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange'
  })
  const onSubmit = (data) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({
        ...data,
        published: false,
        featured: false
      })
      .then((info) => {
        if (info.message === 'ok') {
          biodataRequests.setField(2).then((info) => {
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
      .catch((err) => {
        setIsLoading(false)
        setVisible({
          message: 'ইরর হয়েছে, আবার চেষ্টা করুন',
          status: true,
          done: false
        })
      })
  }

  const { routes, setRoutes } = useAppContext()

  useEffect(() => {
    if (data) {
      if (
        (data.marry_reason ||
          data.whenDiedWife ||
          data.divorceInfo ||
          data.whenDiedHusband ||
          data.reMarryReason ||
          data.marry_reason) &&
        data.guardians_permission
      ) {
        setRoutes({
          ...routes,
          marriage: {
            name: 'বিয়ে সংক্রান্ত',
            link: '/marriage-related-info',
            status: 'done'
          }
        })
      }
      if (!data.type) {
        setDone(false)
      } else setDone(true)
    }
  }, [data, loading])
  useEffect(() => {
    biodataRequests.checkField().then((data) => {
      setFields(data.fields)
    })
  }, [visible.done])

  return (
    <ProfileLayout
      data={data}
      loading={loading}
    >
      <Head>
        <title>বিয়েসম্পর্কিত তথ্য</title>
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
      {!loading && !done && (
        <p className='border-l-4 border-red-500 flex bg-red-50 py-8 rounded px-2 items-center md:text-2xl text-primary font-bold text-center my-8'>
          <div className='mr-5'>
            <ExclamationIcon className='text-primary h-10 w-10' />
          </div>
          <div>
            <Link
              href='/profile/edit/primary'
              className=' underline text-indigo-500'
            >
              প্রাথমিক
            </Link>{' '}
            ফিল্ডটি এখনো অপূর্ণাঙ্গ রয়েছে, আগে সেটি ফিল করুন
          </div>
        </p>
      )}
      {!loading && data && done ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {data?.condition === 'বিপত্মীক' && (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.whenDiedWife ? 'border-red-500' : 'border-gray-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.whenDiedWife ? 'text-primary' : 'text-secondary'
                }`}
              >
                আপনার স্ত্রী কবে, কিভাবে মারা গিয়েছিল ? *
              </legend>
              <textarea
                defaultValue={data?.whenDiedWife}
                rows={5}
                {...register('whenDiedWife', {
                  required: 'please fill the field'
                })}
                className={`w-full rounded ${
                  errors.whenDiedWife ? 'bg-red-100' : 'bg-green-100'
                } px-4 py-2 font-medium text-green-400 shadow-md ${
                  errors.whenDiedWife
                    ? 'focus:outline-red-500'
                    : 'focus:outline-green-500'
                }`}
              />
              {errors.whenDiedWife && (
                <p className='text-primary py-2 pl-2'>
                  {errors.whenDiedWife.message}
                </p>
              )}
              <p className='pl-2 pt-4 text-green-400'>
                কয় বছরের সংসার ছিল উল্লেখ করতে পারেন। আপনার সন্তান আছে কি না,
                থাকলে তাদের বয়স সহ বর্ণনা দিবেন সংক্ষেপে।
              </p>
            </fieldset>
          )}
          {data?.condition === 'ডিভোর্সড' && (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.divorceInfo ? 'border-red-500' : 'border-gray-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.divorceInfo ? 'text-primary' : 'text-secondary'
                }`}
              >
                আপনার ডিভোর্সের সময়কাল ও কারণ *
              </legend>
              <textarea
                defaultValue={data?.divorceInfo}
                rows={5}
                {...register('divorceInfo', {
                  required: 'please fill the field'
                })}
                className={`w-full rounded ${
                  errors.divorceInfo ? 'bg-red-100' : 'bg-green-100'
                } px-4 py-2 font-medium text-green-400 shadow-md ${
                  errors.divorceInfo
                    ? 'focus:outline-red-500'
                    : 'focus:outline-green-500'
                }`}
              />
              {errors.divorceInfo && (
                <p className='text-primary py-2 pl-2'>
                  {errors.divorceInfo.message}
                </p>
              )}
              <p className='pl-2 pt-4 text-green-400'>
                সময়কাল অর্থাৎ কত মাস বা বছরের সংসার হয়েছিল আর ডিভোর্স কবে হয়েছে
                তা লিখতে বলা হয়েছে। বাচ্চা থাকলে তাদের বয়স ও অন্যান্য বিষয়ে
                লিখুন সংক্ষেপে।
              </p>
            </fieldset>
          )}
          {data?.condition === 'বিধবা' && (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.whenDiedHusband ? 'border-red-500' : 'border-gray-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.whenDiedHusband ? 'text-primary' : 'text-secondary'
                }`}
              >
                আপনার স্বামী কবে, কিভাবে মারা গিয়েছিল? *
              </legend>
              <textarea
                defaultValue={data?.whenDiedHusband}
                rows={5}
                {...register('whenDiedHusband', {
                  required: 'please fill the field'
                })}
                className={`w-full rounded ${
                  errors.whenDiedHusband ? 'bg-red-100' : 'bg-green-100'
                } px-4 py-2 font-medium text-green-400 shadow-md ${
                  errors.whenDiedHusband
                    ? 'focus:outline-red-500'
                    : 'focus:outline-green-500'
                }`}
              />
              {errors.whenDiedHusband && (
                <p className='text-primary py-2 pl-2'>
                  {errors.whenDiedHusband.message}
                </p>
              )}
              <p className='pl-2 pt-4 text-green-400'>
                কয় বছরের সংসার ছিল উল্লেখ করতে পারেন। আপনার সন্তান আছে কি না,
                থাকলে তাদের বয়স সহ বর্ণনা দিবেন সংক্ষেপে।
              </p>
            </fieldset>
          )}
          {data?.condition === 'বিবাহিত' && (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.reMarryReason ? 'border-red-500' : 'border-gray-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.reMarryReason ? 'text-primary' : 'text-secondary'
                }`}
              >
                বিবাহিত অবস্থায় আবার কেন বিয়ে করতে চাচ্ছেন ? *
              </legend>
              <textarea
                defaultValue={data?.reMarryReason}
                rows={5}
                {...register('reMarryReason', {
                  required: 'please fill the field'
                })}
                className={`w-full rounded ${
                  errors.reMarryReason ? 'bg-red-100' : 'bg-green-100'
                } px-4 py-2 font-medium text-green-400 shadow-md ${
                  errors.reMarryReason
                    ? 'focus:outline-red-500'
                    : 'focus:outline-green-500'
                }`}
              />
              {errors.reMarryReason && (
                <p className='text-primary py-2 pl-2'>
                  {errors.reMarryReason.message}
                </p>
              )}
              <p className='pl-2 pt-4 text-green-400'>
                বর্তমানে কতজন স্ত্রী আছে, স্ত্রী আপনার নতুন বিয়েতে রাজি কি না,
                নতুন স্ত্রীকে কোথায় রাখবেন এসব সংক্ষেপে লিখুন
              </p>
            </fieldset>
          )}

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.guardians_permission ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.guardians_permission ? 'text-primary' : 'text-secondary'
              }`}
            >
              অভিভাবক আপনার বিয়েতে রাজি কি না? *
            </legend>
            <input
              defaultValue={data?.guardians_permission}
              {...register('guardians_permission', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.guardians_permission ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.guardians_permission
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            {errors.guardians_permission && (
              <p className='text-primary py-2 pl-2'>
                {errors.guardians_permission.message}
              </p>
            )}
          </fieldset>

          {data?.condition !== 'বিবাহিত' && (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.marry_reason ? 'border-red-500' : 'border-gray-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.marry_reason ? 'text-primary' : 'text-secondary'
                }`}
              >
                বিয়ে কেন করছেন? বিয়ে সম্পর্কে আপনার ধারণা কি? *
              </legend>
              <textarea
                defaultValue={data?.marry_reason}
                rows={5}
                {...register('marry_reason', {
                  required: 'please fill the field'
                })}
                className={`w-full rounded ${
                  errors.marry_reason ? 'bg-red-100' : 'bg-green-100'
                } px-4 py-2 font-medium text-green-400 shadow-md ${
                  errors.marry_reason
                    ? 'focus:outline-red-500'
                    : 'focus:outline-green-500'
                }`}
              />
              {errors.marry_reason && (
                <p className='text-primary py-2 pl-2'>
                  {errors.marry_reason.message}
                </p>
              )}
              <p className='pl-2 pt-4 text-green-400'>সংক্ষেপে বর্ণনা করুন।</p>
            </fieldset>
          )}

          {data?.type === 'পাত্রের বায়োডাটা' && (
            <div>
              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.family_planning ? 'border-red-500' : 'border-gray-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.family_planning ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  বিয়ের পর স্ত্রীকে নিয়ে আপনার পরিকল্পনা বিস্তারিত লিখুন *
                </legend>
                <textarea
                  defaultValue={data?.family_planning}
                  rows={5}
                  {...register('family_planning', {
                    required: 'please fill the field'
                  })}
                  className={`w-full rounded ${
                    errors.family_planning ? 'bg-red-100' : 'bg-green-100'
                  } px-4 py-2 font-medium text-green-400 shadow-md ${
                    errors.family_planning
                      ? 'focus:outline-red-500'
                      : 'focus:outline-green-500'
                  }`}
                />
                {errors.family_planning && (
                  <p className='text-primary py-2 pl-2'>
                    {errors.family_planning.message}
                  </p>
                )}
                <p className='pl-2 pt-4 text-green-400'>
                  বিয়ের পর স্ত্রীর পর্দার ব্যবস্থা, পড়াশোনা এবং চাকরী করতে দিবেন
                  কিনা, স্ত্রীকে নিয়ে কোথায় থাকবেন ইত্যাদি স্পষ্ট লিখুন
                </p>
              </fieldset>

              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.demand ? 'border-red-500' : 'border-gray-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.demand ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক/উপহার/অর্থ আশা
                  করবেন কিনা? *
                </legend>
                <textarea
                  defaultValue={data?.demand}
                  rows={5}
                  {...register('demand', {
                    required: 'please fill the field'
                  })}
                  className={`w-full rounded ${
                    errors.demand ? 'bg-red-100' : 'bg-green-100'
                  } px-4 py-2 font-medium text-green-400 shadow-md ${
                    errors.demand
                      ? 'focus:outline-red-500'
                      : 'focus:outline-green-500'
                  }`}
                />
                {errors.demand && (
                  <p className='text-primary py-2 pl-2'>
                    {errors.demand.message}
                  </p>
                )}
              </fieldset>
            </div>
          )}

          {data?.type === 'পাত্রীর বায়োডাটা' && (
            <div>
              <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                <legend className='ml-4 font-bold text-secondary'>
                  আপনি কি বিয়ের পর পড়াশোনা করতে ইচ্ছুক?
                </legend>
                <input
                  defaultValue={data?.education_after_marriage}
                  {...register('education_after_marriage')}
                  className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                />
                <p className='pl-2 pt-4 text-green-400'>
                  ছাত্রী হলে বিয়ের পর পড়াশোনা চালিয়ে যেতে চান কিনা লিখুন।
                </p>
              </fieldset>

              <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                <legend className='ml-4 font-bold text-secondary'>
                  আপনি কি বিয়ের পর চাকরি করতে ইচ্ছুক?
                </legend>
                <input
                  defaultValue={data?.job_after_marriage}
                  {...register('job_after_marriage')}
                  className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                />
                <p className='pl-2 pt-4 text-green-400'>
                  চাকরীজীবী হলে বিয়ের পর চাকরি চালিয়ে যেতে চান কিনা লিখুন।
                </p>
              </fieldset>
            </div>
          )}

          <SaveButton
            isLoading={isLoading}
            fields={fields}
          />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
