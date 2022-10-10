import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useForm } from 'react-hook-form'
import OptionMap from 'components/profile/OptionMap'
import getData from 'hooks/getData'
import { Fade } from 'react-reveal'
import biodataRequests from 'services/biodataRequests'
import { useEffect } from 'react'
import FormSkeleton from 'components/shared/FormSkeleton'
import Head from 'next/head'
import { useAppContext } from 'utils/context'
import LongModal from 'components/shared/Modals/LongModal'

export default function Education() {
  const [visible, setVisible] = useState({
    message: '',
    status: false,
    done: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState([])
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const { data, loading } = getData(visible.done)
  const [education, setEducation] = useState(data?.education)
  const [secondary, setSecondary] = useState('')
  const [higher, setHigher] = useState('')

  const [dawra, setDawra] = useState('')
  const [takhassus, setTakhassus] = useState(yesno[1])

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
          biodataRequests.setField(6).then(info => {
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

  useEffect(() => {
    if (data) {
      setEducation(data.education)
      setSecondary(data.secondary)
      setHigher(data.higher)
      setDawra(data.dawra)
      setTakhassus(data.takhassus)
    }
  }, [data])

  const { routes, setRoutes } = useAppContext()
  useEffect(() => {
    if (data) {
      if (data.education) {
        setRoutes({
          ...routes,
          education: {
            name: 'শিক্ষাগত',
            link: '/educational-qualifications',
            status: 'done'
          }
        })
      }
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
        <title>শিক্ষাগত যোগ্যতা</title>
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
      {!loading && data ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.education ? 'border-red-500' : 'border-gray-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.education ? 'text-primary' : 'text-secondary'
              }`}
            >
              কোন মাধ্যমে পড়াশোনা করেছেন? *
            </legend>
            <select
              onClick={e => setEducation(e.target.value)}
              defaultValue={data?.education}
              className={`w-full focus:outline-none border-2 ${
                errors.education ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-md`}
              {...register('education', { required: 'education is required' })}
            >
              <option value=''>select</option>
              <OptionMap data={educationType} />
            </select>
            <Fade right when={errors.education ? true : false}>
              {errors.education && (
                <p className='text-primary py-2 pl-2'>
                  {errors.education.message}
                </p>
              )}
            </Fade>
          </fieldset>
          {/* General Education */}
          {education === educationType[0] && (
            <div>
              <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                <legend className='ml-4 text-lg font-bold text-secondary'>
                  মাধ্যমিক (SSC) / সমমান পাশ করেছেন?
                </legend>
                <select
                  onClick={e => setSecondary(e.target.value)}
                  defaultValue={data?.secondary}
                  className='w-full focus:outline-none  border-2 border-gray-300 p-2 rounded-md'
                  {...register('secondary')}
                >
                  <option value=''>---</option>
                  <OptionMap data={yesno} />
                </select>
              </fieldset>

              {secondary === yesno[0] && (
                <div>
                  <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                    <legend className='ml-4 font-bold text-secondary'>
                      মাধ্যমিক (SSC) / সমমান এর বিস্তারিত
                    </legend>
                    <textarea
                      rows={5}
                      defaultValue={data?.secondary_details}
                      placeholder='ফলাফলঃ A+, বিভাগঃ বিজ্ঞান, পাশের সনঃ 2016'
                      {...register('secondary_details')}
                      className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                    />
                    <p className='pl-2 pt-4 text-green-400'>
                      'আপনার মাধ্যমিক/সমমান এর ফলাফল, বিভাগ ও পাশের সন লিখুন'
                    </p>
                  </fieldset>

                  <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                    <legend className='ml-4 text-lg font-bold text-secondary'>
                      উচ্চমাধ্যমিক (HSC) / সমমান পাশ করেছেন?
                    </legend>
                    <select
                      onClick={e => setHigher(e.target.value)}
                      defaultValue={data?.higher}
                      className='w-full focus:outline-none  border-2 border-gray-300 p-2 rounded-md'
                      {...register('higher')}
                    >
                      <option value=''>---</option>
                      <OptionMap data={yesno_heigher} />
                    </select>
                  </fieldset>
                  {higher === yesno_heigher[0] && (
                    <div>
                      <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                        <legend className='ml-4 font-bold text-secondary'>
                          উচ্চমাধ্যমিক (HSC) / সমমান এর বিস্তারিত
                        </legend>
                        <textarea
                          rows={5}
                          defaultValue={data?.higher_details}
                          placeholder='আপনার উচ্চমাধ্যমিক/সমমান এর ফলাফল, বিভাগ ও পাশের সন লিখুন'
                          {...register('higher_details')}
                          className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                        />
                        <p className='pl-2 pt-4 text-green-400'>
                          'আপনার মাধ্যমিক/সমমান এর ফলাফল, বিভাগ ও পাশের সন
                          লিখুন'
                        </p>
                      </fieldset>

                      <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                        <legend className='ml-4 font-bold text-secondary'>
                          স্নাতক/স্নাতক(সম্মান)/সমমান শিক্ষাগত যোগ্যতা
                        </legend>
                        <textarea
                          rows={5}
                          defaultValue={data?.honors_details}
                          {...register('honors_details')}
                          className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                        />
                        <p className='pl-2 pt-4 text-green-400'>
                          এভাবে লিখতে পারেনঃ BA in English Language &
                          Literature, running year/passed year, CGPA...
                        </p>
                      </fieldset>
                    </div>
                  )}
                  {higher === yesno_heigher[1] && (
                    <div>
                      <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                        <legend className='ml-4 text-lg font-bold text-secondary'>
                          উচ্চমাধ্যমিক (HSC) / সমমান কোন বর্ষে পড়ছেন?
                        </legend>
                        <select
                          defaultValue={data?.higher_year}
                          className='w-full focus:outline-none  border-2 border-gray-300 p-2 rounded-md'
                          {...register('higher_year')}
                        >
                          <OptionMap data={higherType} />
                        </select>
                      </fieldset>
                    </div>
                  )}
                  {higher === yesno_heigher[2] && (
                    <div>
                      <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                        <legend className='ml-4 font-bold text-secondary'>
                          ডিপ্লোমা এর বিষয়ে বিস্তারিত
                        </legend>
                        <textarea
                          rows={5}
                          defaultValue={data?.diploma_details}
                          placeholder='প্রতিষ্ঠানের নাম, বিভাগ, ফলাফল, পাসের সন'
                          {...register('diploma_details')}
                          className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                        />
                        <p className='pl-2 pt-4 text-green-400'>
                          ছাত্র হলে বর্ষ লিখবেন
                        </p>
                      </fieldset>
                    </div>
                  )}
                </div>
              )}
              {secondary === yesno[1] && (
                <div>
                  <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                    <legend className='ml-4 text-lg font-bold text-secondary'>
                      কোন ক্লাস পর্যন্ত পড়েছেন?
                    </legend>
                    <select
                      defaultValue={data?.classes}
                      className='w-full focus:outline-none  border-2 border-gray-300 p-2 rounded-md'
                      {...register('classes')}
                    >
                      <option value=''>---</option>
                      <OptionMap data={_classes} />
                    </select>
                  </fieldset>
                </div>
              )}
            </div>
          )}

          {/* Madrasha Education */}
          {education === educationType[1] && (
            <div>
              <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                <legend className='ml-4 text-lg font-bold text-secondary'>
                  আপনি কি হাফেজ?
                </legend>
                <select
                  defaultValue={data?.hafej}
                  className='w-full focus:outline-none  border-2 border-gray-300 p-2 rounded-md'
                  {...register('hafej')}
                >
                  <option value=''>---</option>
                  <OptionMap data={yesno} />
                </select>
              </fieldset>

              <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                <legend className='ml-4 text-lg font-bold text-secondary'>
                  দাওরায়ে হাদীস পাশ করেছেন?
                </legend>
                <select
                  defaultValue={data?.dawra}
                  onClick={e => setDawra(e.target.value)}
                  className='w-full focus:outline-none  border-2 border-gray-300 p-2 rounded-md'
                  {...register('dawra')}
                >
                  <option value=''>---</option>
                  <OptionMap data={yesno_dawra} />
                </select>
              </fieldset>
              {dawra === yesno_dawra[0] && (
                <div>
                  <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                    <legend className='ml-4 font-bold text-secondary'>
                      দাওরায়ে হাদীস এর বিস্তারিত
                    </legend>
                    <textarea
                      rows={5}
                      defaultValue={data?.dawra_details}
                      placeholder='নতিজা, পাসের সন লিখুন'
                      {...register('dawra_details')}
                      className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                    />
                  </fieldset>

                  <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                    <legend className='ml-4 text-lg font-bold text-secondary'>
                      আপনি কি তাখাসসুস পড়েছেন?
                    </legend>
                    <select
                      onClick={e => setTakhassus(e.target.value)}
                      defaultValue={data?.takhassus}
                      className='w-full focus:outline-none  border-2 border-gray-300 p-2 rounded-md'
                      {...register('takhassus')}
                    >
                      <option value=''>---</option>
                      <OptionMap data={yesno} />
                    </select>
                  </fieldset>
                  {takhassus === yesno[0] && (
                    <div>
                      <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                        <legend className='ml-4 font-bold text-secondary'>
                          তাখাসসুস এর বিস্তারিত
                        </legend>
                        <textarea
                          rows={5}
                          defaultValue={data?.takhassus_details}
                          placeholder='তাখাসসুসের বিষয়, পাসের সন লিখুন'
                          {...register('takhassus_details')}
                          className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                        />
                      </fieldset>
                    </div>
                  )}
                </div>
              )}
              {dawra === yesno_dawra[2] && (
                <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                  <legend className='ml-4 font-bold text-secondary'>
                    দাওরায়ে হাদীস কোন বর্ষে পড়ছেন?
                  </legend>
                  <input
                    defaultValue={data?.dawra_year}
                    {...register('dawra_year')}
                    className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                  />
                </fieldset>
              )}

              <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
                <legend className='ml-4 font-bold text-secondary'>
                  সর্বোচ্চ শিক্ষাগত যোগ্যতা
                </legend>
                <textarea
                  rows={5}
                  defaultValue={data?.profession}
                  {...register('profession')}
                  className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
                />
                <p className='pl-2 pt-4 text-green-400'>
                  শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত
                  লিখবেন।
                </p>
              </fieldset>
            </div>
          )}

          <fieldset className='my-6 rounded-md border-2 border-gray-300 p-4'>
            <legend className='ml-4 font-bold text-secondary'>
              অন্যান্য শিক্ষাগত যোগ্যতা
            </legend>
            <textarea
              rows={5}
              defaultValue={data?.another_education}
              {...register('another_education')}
              className='w-full rounded bg-green-100 px-4 py-2 font-medium text-green-400 shadow-md focus:outline-green-500'
            />
            <p className='pl-2 pt-4 text-green-400'>
              শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত লিখবেন।
            </p>
          </fieldset>
          <SaveButton isLoading={isLoading} fields={fields} />
        </form>
      ) : (
        <FormSkeleton />
      )}
    </ProfileLayout>
  )
}

const yesno = ['হ্যা', 'না']
const yesno_heigher = ['হ্যা', 'না', 'ডিপ্লোমা পড়েছি']
const yesno_dawra = ['হ্যা', 'না', 'এখনো পড়েছি']
const educationType = ['জেনারেল', 'মাদ্রাসা']
const _classes = [
  '১ম',
  '২য়',
  '৩য়',
  '৪র্থ',
  '৫ম',
  '৬ষ্ঠ',
  '৭ম',
  '৮ম',
  '৯ম',
  '১০ম'
]
const higherType = [
  'HSC দ্বিতীয় বর্ষ',
  'HSC প্রথম বর্ষ',
  'HSC রেজাল্ট দেয় নি এখনো',
  'SSC এর পর আর পড়াশোনা করা হয় নি',
  'HSC পরীক্ষা দিয়ে পাশ করতে পারি নি।'
]
