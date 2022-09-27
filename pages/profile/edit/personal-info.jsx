import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { Fade } from 'react-reveal'
import getData from 'hooks/getData'
import biodataRequests from 'services/biodataRequests'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import { _madhabs } from 'assets/profileinfo'
import Link from 'next/link'
import { ExclamationIcon } from '@heroicons/react/solid'
import LongModal from 'components/shared/Modals/LongModal'
import { Loading } from '@nextui-org/react'

export default function PersonalInfo() {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const [done, setDone] = useState(false)
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
          biodataRequests.setField(1).then(info => {
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
        data.dress &&
        data.salat &&
        data.salat_duration &&
        data.maintain_mahram &&
        data.can_tilawat &&
        data.madhab &&
        data.mazhab &&
        data.political_view &&
        data.drama_cinnema &&
        data.deeni_effort &&
        data.murid_of_peer &&
        data.majar_view &&
        data.favorite_books &&
        data.favorite_scholars &&
        data.about_me
      ) {
        setRoutes({
          ...routes,
          personal: {
            name: 'ব্যক্তিগত তথ্য',
            link: '/personal-info',
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
    biodataRequests.checkField().then(data => {
      setFields(data.fields)
    })
  }, [visible.done])

  return (
    <ProfileLayout data={data} loading={loading}>
      <Head>
        <title>ব্যক্তিগত তথ্য</title>
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
            <Link href='/profile/edit/primary'>
              <a className=' underline text-indigo-500'>প্রাথমিক</a>
            </Link>{' '}
            ফিল্ডটি এখনো অপূর্ণাঙ্গ রয়েছে, আগে সেটি ফিল করুন
          </div>
        </p>
      )}
      {!loading && data && done ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {data?.type === 'পাত্রের বায়োডাটা' ? (
            <div>
              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.beard ? 'border-red-500' : 'border-gray-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.beard ? 'text-primary' : 'text-secondary'
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
                    errors.beard ? 'bg-red-100' : 'bg-green-100'
                  } px-4 py-2 font-medium text-green-400 shadow-md ${
                    errors.beard
                      ? 'focus:outline-red-500'
                      : 'focus:outline-green-500'
                  }`}
                />
                <Fade right when={errors.beard ? true : false}>
                  {errors.beard && (
                    <p className='text-primary py-2 pl-2'>
                      {errors.beard.message}
                    </p>
                  )}
                </Fade>
              </fieldset>

              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.dress_over_ankle ? 'border-red-500' : 'border-gray-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.dress_over_ankle ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  কাপড় পায়ের টাখনুর উপরে পড়েন? *
                </legend>
                <input
                  defaultValue={data?.dress_over_ankle}
                  {...register('dress_over_ankle', {
                    required: 'please fill the field'
                  })}
                  className={`w-full rounded ${
                    errors.dress_over_ankle ? 'bg-red-100' : 'bg-green-100'
                  } px-4 py-2 font-medium text-green-400 shadow-md ${
                    errors.dress_over_ankle
                      ? 'focus:outline-red-500'
                      : 'focus:outline-green-500'
                  }`}
                />
                <Fade right when={errors.dress_over_ankle ? true : false}>
                  {errors.dress_over_ankle && (
                    <p className='text-primary py-2 pl-2'>
                      {errors.dress_over_ankle.message}
                    </p>
                  )}
                </Fade>
              </fieldset>

              <fieldset
                className={`my-6 rounded-md border-2 ${
                  errors.dress ? 'border-red-500' : 'border-gray-300'
                } p-4`}
              >
                <legend
                  className={`ml-4 font-bold ${
                    errors.dress ? 'text-primary' : 'text-secondary'
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
                    errors.dress ? 'bg-red-100' : 'bg-green-100'
                  } px-4 py-2 font-medium text-green-400 shadow-md ${
                    errors.dress
                      ? 'focus:outline-red-500'
                      : 'focus:outline-green-500'
                  }`}
                />
                <Fade right when={errors.dress ? true : false}>
                  {errors.dress && (
                    <p className='text-primary py-2 pl-2'>
                      {errors.dress.message}
                    </p>
                  )}
                </Fade>
                <div className='ppl-2 pt-4 text-green-400'>
                  এভাবে উত্তর দিতে পারেনঃ- "সাদা পাঞ্জবী সাথে সাদা টুপি" বা
                  "জিন্স প্যান্ট সাথে শার্ট"
                </div>
              </fieldset>
            </div>
          ) : (
            <fieldset
              className={`my-6 rounded-md border-2 ${
                errors.dress ? 'border-red-500' : 'border-gray-300'
              } p-4`}
            >
              <legend
                className={`ml-4 font-bold ${
                  errors.dress ? 'text-primary' : 'text-secondary'
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
                  errors.dress ? 'bg-red-100' : 'bg-green-100'
                } px-4 py-2 font-medium text-green-400 shadow-md ${
                  errors.dress
                    ? 'focus:outline-red-500'
                    : 'focus:outline-green-500'
                }`}
              />
              <Fade right when={errors.dress ? true : false}>
                {errors.dress && (
                  <p className='text-primary py-2 pl-2'>
                    {errors.dress.message}
                  </p>
                )}
              </Fade>
              <p className='pl-2 pt-4 text-green-400'>
                উত্তর যেভাবে দিতে পারেনঃ- "কালো বোরকা ও হিজাব পরি কিন্ত নিকাব
                পরি না" বা " কালো বোরকা ও নিকাব পরি কিন্ত হাত-পা মোজা পরি না"।
                এভাবে নিজের মত করে আপনার পোষাকের বিবরণ দিবেন। যেন পাঠক আপনার
                পর্দার ব্যাপারে নূন্যতম ধারণা করতে পারেন।
              </p>
            </fieldset>
          )}

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.salat ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.salat ? 'text-primary' : 'text-secondary'
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
                errors.salat ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.salat
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.salat ? true : false}>
              {errors.salat && (
                <p className='text-primary py-2 pl-2'>{errors.salat.message}</p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.salat_duration ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.salat_duration ? 'text-primary' : 'text-secondary'
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
                errors.salat_duration ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.salat_duration
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.salat_duration ? true : false}>
              {errors.salat_duration && (
                <p className='text-primary py-2 pl-2'>
                  {errors.salat_duration.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-green-400'>
              কয় বছর/মাস যাবত ৫ ওয়াক্ত সালাত শুরু করেছেন?
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.maintain_mahram ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.maintain_mahram ? 'text-primary' : 'text-secondary'
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
                errors.maintain_mahram ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.maintain_mahram
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.maintain_mahram ? true : false}>
              {errors.maintain_mahram && (
                <p className='text-primary py-2 pl-2'>
                  {errors.maintain_mahram.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.can_tilawat ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.can_tilawat ? 'text-primary' : 'text-secondary'
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
                errors.can_tilawat ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.can_tilawat
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.can_tilawat ? true : false}>
              {errors.can_tilawat && (
                <p className='text-primary py-2 pl-2'>
                  {errors.can_tilawat.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.madhab ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.madhab ? 'text-primary' : 'text-secondary'
              }`}
            >
              কোন মাযহাব অনুসরণ করেন *
            </legend>
            <select
              defaultValue={data?.madhab}
              className={`w-full focus:outline-none border-2 ${
                errors.madhab ? 'border-red-500' : 'border-green-300'
              } p-2 rounded-md`}
              {...register('madhab', { required: 'madhab is required' })}
            >
              <option value=''>-------</option>
              {_madhabs.map(item => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <Fade right when={errors.madhab ? true : false}>
              {errors.madhab && (
                <p className='text-primary py-2 pl-2'>
                  {errors.madhab.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.mazhab ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.mazhab ? 'text-primary' : 'text-secondary'
              }`}
            >
              আপনার মাযহাব নিয়ে সংক্ষেপে লিখুন *
            </legend>
            <input
              defaultValue={data?.mazhab}
              {...register('mazhab', {
                required: 'please fill the field'
              })}
              className={`w-full rounded ${
                errors.mazhab ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.mazhab
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.mazhab ? true : false}>
              {errors.mazhab && (
                <p className='text-primary py-2 pl-2'>
                  {errors.mazhab.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.political_view ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.political_view ? 'text-primary' : 'text-secondary'
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
                errors.political_view ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.political_view
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.political_view ? true : false}>
              {errors.political_view && (
                <p className='text-primary py-2 pl-2'>
                  {errors.political_view.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.drama_cinnema ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.drama_cinnema ? 'text-primary' : 'text-secondary'
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
                errors.drama_cinnema ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.drama_cinnema
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.drama_cinnema ? true : false}>
              {errors.drama_cinnema && (
                <p className='text-primary py-2 pl-2'>
                  {errors.drama_cinnema.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.disease ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.disease ? 'text-primary' : 'text-secondary'
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
                errors.disease ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.disease
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.disease ? true : false}>
              {errors.disease && (
                <p className='text-primary py-2 pl-2'>
                  {errors.disease.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.deeni_effort ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.deeni_effort ? 'text-primary' : 'text-secondary'
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
                errors.deeni_effort ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.deeni_effort
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.deeni_effort ? true : false}>
              {errors.deeni_effort && (
                <p className='text-primary py-2 pl-2'>
                  {errors.deeni_effort.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-green-400'>যেমনঃ তাবলীগ ইত্যাদি।</p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.murid_of_peer ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.murid_of_peer ? 'text-primary' : 'text-secondary'
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
                errors.murid_of_peer ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.murid_of_peer
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.murid_of_peer ? true : false}>
              {errors.murid_of_peer && (
                <p className='text-primary py-2 pl-2'>
                  {errors.murid_of_peer.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-green-400'>
              হয়ে থাকলে পীরের নাম, ঠিকানা ও মুরিদ হওয়ার কারণ লিখুন। না হলে
              পীর-মুরিদি সম্পর্কে আপনার বিশ্বাস লিখুন।
            </p>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.majar_view ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.majar_view ? 'text-primary' : 'text-secondary'
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
                errors.majar_view ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.majar_view
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.majar_view ? true : false}>
              {errors.majar_view && (
                <p className='text-primary py-2 pl-2'>
                  {errors.majar_view.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.favorite_books ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.favorite_books ? 'text-primary' : 'text-secondary'
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
                errors.favorite_books ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.favorite_books
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.favorite_books ? true : false}>
              {errors.favorite_books && (
                <p className='text-primary py-2 pl-2'>
                  {errors.favorite_books.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.favorite_scholars ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.favorite_scholars ? 'text-primary' : 'text-secondary'
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
                errors.favorite_scholars ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.favorite_scholars
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.favorite_scholars ? true : false}>
              {errors.favorite_scholars && (
                <p className='text-primary py-2 pl-2'>
                  {errors.favorite_scholars.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
            <legend className='ml-4 font-bold text-secondary'>
              বিশেষ দ্বীনি বা দুনিয়াবি যোগ্যতা (যদি থাকে)
            </legend>
            <textarea
              defaultValue={data?.special_qualifications}
              rows={5}
              {...register('special_qualifications')}
              className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
            />
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.about_me ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.about_me ? 'text-primary' : 'text-secondary'
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
                errors.about_me ? 'bg-red-100' : 'bg-green-100'
              } px-4 py-2 font-medium text-green-400 shadow-md ${
                errors.about_me
                  ? 'focus:outline-red-500'
                  : 'focus:outline-green-500'
              }`}
            />
            <Fade right when={errors.about_me ? true : false}>
              {errors.about_me && (
                <p className='text-primary py-2 pl-2'>
                  {errors.about_me.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-green-400'>
              নিজের পছন্দ-অপছন্দ, শখ-ইচ্ছা, দ্বীনী-দুনিয়াবী ইত্যাদি বিষয়
              বিস্তারিত লিখতে হবে। কারণ এই লেখা পড়ে পাঠক আপনার সম্পর্কে সাধারণ
              ধারণা লাভ করবে।
            </p>
          </fieldset>
          <div className='flex items-center'>
            <button
              type='submit'
              className={`${
                isLoading
                  ? 'pointer-events-none cursor-not-allowed'
                  : 'cursor-pointer'
              } rounded-md bg-primary  flex items-center font-medium text-white shadow-md hover:bg-primary  px-6 py-3`}
            >
              {isLoading ? <Loading color='success' size='sm' /> : 'সেভ করুন'}
            </button>
            <button
              type='button'
              onClick={() => router.push('/profile/preview')}
              className={`${
                fields.length
                  ? 'bg-gray-300 pointer-events-none'
                  : 'bg-green-500 hover:bg-green-600'
              } ml-2 rounded-md text-white px-6 py-3 shadow-md`}
            >
              প্রিভিউ দেখুন ও পাবলিশ করুন
            </button>
          </div>
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}
