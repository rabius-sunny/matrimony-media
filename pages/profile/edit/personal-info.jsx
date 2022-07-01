import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { Fade } from 'react-reveal'
import getData from 'hooks/getData'
import biodataRequests from 'services/biodataRequests'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'

export default function PersonalInfo() {
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
          biodataRequests.setField(5).then(info => {
            if (info.message === 'ok') {
              router.push('/profile/edit/marriage-related-info')
            }
          })
        }
      })
      .catch(err => console.log(err.message))

  const { data, loading } = getData()

  const { routes, setRoutes } = useAppContext()
  useEffect(() => {
    if (data) {
      if (
        !data.dress ||
        !data.salat ||
        !data.salat_duration ||
        !data.maintain_mahram ||
        !data.can_tilawat ||
        !data.mazhab ||
        !data.political_view ||
        !data.drama_cinnema ||
        !data.deeni_effort ||
        !data.murid_of_peer ||
        !data.majar_view ||
        !data.favorite_books ||
        !data.favorite_scholars ||
        !data.about_me
      ) {
        setRoutes({
          ...routes,
          personal: {
            name: 'ব্যক্তিগত তথ্য',
            link: '/personal-info',
            error: true
          }
        })
      }
    }
  }, [data, loading])

  return (
    <ProfileLayout>
      <Head>
        <title>ব্যক্তিগত তথ্য</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {data?.type === 'পাত্রের বায়োডাটা' ? (
            <div>
              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.beard ? 'border-red-500' : 'border-blue-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.beard ? 'text-red-500' : 'text-blue-500'
                  }`}
                >
                  সুন্নতি দাঁড়ি আছে কি? *
                </legend>
                <input
                  defaultValue={data?.beard}
                  {...register('beard', {
                    required: 'please fill the field'
                  })}
                  className={`w-full rounded ${
                    errors.beard ? 'bg-red-100' : 'bg-blue-100'
                  } px-4 py-2 font-medium text-blue-400 shadow-md ${
                    errors.beard
                      ? 'focus:outline-red-500'
                      : 'focus:outline-blue-500'
                  }`}
                />
                <Fade right when={errors.beard ? true : false}>
                  {errors.beard && (
                    <p className='text-red-500 py-2 pl-2'>
                      {errors.beard.message}
                    </p>
                  )}
                </Fade>
              </fieldset>

              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.dress_over_ankle ? 'border-red-500' : 'border-blue-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.dress_over_ankle ? 'text-red-500' : 'text-blue-500'
                  }`}
                >
                  কাপড় পায়ের টাখনুর পড়েন? *
                </legend>
                <input
                  defaultValue={data?.dress_over_ankle}
                  {...register('dress_over_ankle', {
                    required: 'please fill the field'
                  })}
                  className={`w-full rounded ${
                    errors.dress_over_ankle ? 'bg-red-100' : 'bg-blue-100'
                  } px-4 py-2 font-medium text-blue-400 shadow-md ${
                    errors.dress_over_ankle
                      ? 'focus:outline-red-500'
                      : 'focus:outline-blue-500'
                  }`}
                />
                <Fade right when={errors.dress_over_ankle ? true : false}>
                  {errors.dress_over_ankle && (
                    <p className='text-red-500 py-2 pl-2'>
                      {errors.dress_over_ankle.message}
                    </p>
                  )}
                </Fade>
              </fieldset>

              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.dress ? 'border-red-500' : 'border-blue-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.dress ? 'text-red-500' : 'text-blue-500'
                  }`}
                >
                  ঘরের বাইরে সাধারণত কী ধরণের পোশাক পড়েন? *
                </legend>
                <input
                  defaultValue={data?.dress}
                  {...register('dress', {
                    required: 'please fill the field'
                  })}
                  className={`w-full rounded ${
                    errors.dress ? 'bg-red-100' : 'bg-blue-100'
                  } px-4 py-2 font-medium text-blue-400 shadow-md ${
                    errors.dress
                      ? 'focus:outline-red-500'
                      : 'focus:outline-blue-500'
                  }`}
                />
                <Fade right when={errors.dress ? true : false}>
                  {errors.dress && (
                    <p className='text-red-500 py-2 pl-2'>
                      {errors.dress.message}
                    </p>
                  )}
                </Fade>
                <div className='ppl-2 pt-4 text-blue-400'>
                  এভাবে উত্তর দিতে পারেনঃ- "সাদা পাঞ্জবী সাথে সাদা টুপি" বা
                  "জিন্স প্যান্ট সাথে শার্ট"
                </div>
              </fieldset>
            </div>
          ) : (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.dress ? 'border-red-500' : 'border-blue-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.dress ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                ঘরের বাইরে সাধারণত কী ধরণের পোশাক পড়েন? *
              </legend>
              <input
                defaultValue={data?.dress}
                {...register('dress', {
                  required: 'please fill the field'
                })}
                className={`w-full rounded ${
                  errors.dress ? 'bg-red-100' : 'bg-blue-100'
                } px-4 py-2 font-medium text-blue-400 shadow-md ${
                  errors.dress
                    ? 'focus:outline-red-500'
                    : 'focus:outline-blue-500'
                }`}
              />
              <Fade right when={errors.dress ? true : false}>
                {errors.dress && (
                  <p className='text-red-500 py-2 pl-2'>
                    {errors.dress.message}
                  </p>
                )}
              </Fade>
              <p className='pl-2 pt-4 text-blue-400'>
                উত্তর যেভাবে দিতে পারেনঃ- "কালো বোরকা ও হিজাব পরি কিন্ত নিকাব
                পরি না" বা " কালো বোরকা ও নিকাব পরি কিন্ত হাত-পা মোজা পরি না"।
                এভাবে নিজের মত করে আপনার পোষাকের বিবরণ দিবেন। যেন পাঠক আপনার
                পর্দার ব্যাপারে নূন্যতম ধারণা করতে পারেন।
              </p>
            </fieldset>
          )}

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.salat ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.salat ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              প্রতিদিন পাঁচ ওয়াক্ত সালাত পড়া হয়? *
            </legend>
            <input
              defaultValue={data?.salat}
              {...register('salat', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.salat ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.salat
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.salat ? true : false}>
              {errors.salat && (
                <p className='text-red-500 py-2 pl-2'>{errors.salat.message}</p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.salat_duration ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.salat_duration ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              নিয়মিত কত সময় যাবত সালাত পড়ছেন? *
            </legend>
            <input
              defaultValue={data?.salat_duration}
              {...register('salat_duration', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.salat_duration ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.salat_duration
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.salat_duration ? true : false}>
              {errors.salat_duration && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.salat_duration.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              কয় বছর/মাস যাবত ৫ ওয়াক্ত সালাত শুরু করেছেন?
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.maintain_mahram ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.maintain_mahram ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              মাহরাম/গায়রে-মাহরাম মেনে চলেন কি? *
            </legend>
            <input
              defaultValue={data?.maintain_mahram}
              {...register('maintain_mahram', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.maintain_mahram ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.maintain_mahram
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.maintain_mahram ? true : false}>
              {errors.maintain_mahram && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.maintain_mahram.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.can_tilawat ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.can_tilawat ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              শুদ্ধভাবে কুরআন তিলাওয়াত করতে পারেন? *
            </legend>
            <input
              defaultValue={data?.can_tilawat}
              {...register('can_tilawat', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.can_tilawat ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.can_tilawat
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.can_tilawat ? true : false}>
              {errors.can_tilawat && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.can_tilawat.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.mazhab ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.mazhab ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              কোন মাযহাব অনুসরণ করেন? *
            </legend>
            <input
              defaultValue={data?.mazhab}
              {...register('mazhab', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.mazhab ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.mazhab
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.mazhab ? true : false}>
              {errors.mazhab && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.mazhab.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.political_view ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.political_view ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              কোনো রাজনৈতিক দর্শন থাকলে লিখুন *
            </legend>
            <input
              defaultValue={data?.political_view}
              {...register('political_view', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.political_view ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.political_view
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.political_view ? true : false}>
              {errors.political_view && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.political_view.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.drama_cinnema ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.drama_cinnema ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              নাটক/সিনেমা/সিরিয়াল/গান এসব দেখেন বা শুনেন? *
            </legend>
            <input
              defaultValue={data?.drama_cinnema}
              {...register('drama_cinnema', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.drama_cinnema ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.drama_cinnema
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.drama_cinnema ? true : false}>
              {errors.drama_cinnema && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.drama_cinnema.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.disease ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.disease ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              মানসিক বা শারীরিক কোনো রোগ আছে কি? *
            </legend>
            <input
              defaultValue={data?.disease}
              {...register('disease', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.disease ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.disease
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.disease ? true : false}>
              {errors.disease && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.disease.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.deeni_effort ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.deeni_effort ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন? *
            </legend>
            <input
              defaultValue={data?.deeni_effort}
              {...register('deeni_effort', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.deeni_effort ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.deeni_effort
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.deeni_effort ? true : false}>
              {errors.deeni_effort && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.deeni_effort.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>যেমনঃ তাবলীগ ইত্যাদি।</p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.murid_of_peer ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.murid_of_peer ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              আপনি কি কোনো পীরের মুরিদ? *
            </legend>
            <textarea
              defaultValue={data?.murid_of_peer}
              {...register('murid_of_peer', {
                required: 'please fill the field'
              })}
              rows={5}
              className={`w-full rounded ${
                errors.murid_of_peer ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.murid_of_peer
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.murid_of_peer ? true : false}>
              {errors.murid_of_peer && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.murid_of_peer.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              হয়ে থাকলে পীরের নাম, ঠিকানা ও মুরিদ হওয়ার কারণ লিখুন। না হলে
              পীর-মুরিদি সম্পর্কে আপনার বিশ্বাস লিখুন।
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.majar_view ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.majar_view ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি? *
            </legend>
            <input
              defaultValue={data?.majar_view}
              {...register('majar_view', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.majar_view ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.majar_view
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.majar_view ? true : false}>
              {errors.majar_view && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.majar_view.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.favorite_books ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.favorite_books ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              আপনার পছন্দের অন্তত ৩ টি ইসলামী বইয়ের নাম লিখুন *
            </legend>
            <input
              defaultValue={data?.favorite_books}
              {...register('favorite_books', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.favorite_books ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.favorite_books
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.favorite_books ? true : false}>
              {errors.favorite_books && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.favorite_books.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.favorite_scholars ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.favorite_scholars ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন *
            </legend>
            <input
              defaultValue={data?.favorite_scholars}
              {...register('favorite_scholars', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.favorite_scholars ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.favorite_scholars
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.favorite_scholars ? true : false}>
              {errors.favorite_scholars && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.favorite_scholars.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 font-bold text-blue-500'>
              বিশেষ দ্বীনি বা দুনিয়াবি যোগ্যতা (যদি থাকে)
            </legend>
            <textarea
              defaultValue={data?.special_qualifications}
              rows={5}
              {...register('special_qualifications')}
              className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
            />
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.about_me ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.about_me ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              নিজের সম্পর্কে কিছু লিখুন *
            </legend>
            <textarea
              defaultValue={data?.about_me}
              rows={5}
              {...register('about_me', {
                required: 'please write about yourself'
              })}
              className={`w-full rounded ${
                errors.about_me ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.about_me
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.about_me ? true : false}>
              {errors.about_me && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.about_me.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              নিজের পছন্দ-অপছন্দ, শখ-ইচ্ছা, দ্বীনী-দুনিয়াবী ইত্যাদি বিষয়
              বিস্তারিত লিখতে হবে। কারণ এই লেখা পড়ে পাঠক আপনার সম্পর্কে সাধারণ
              ধারণা লাভ করবে।
            </p>
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
