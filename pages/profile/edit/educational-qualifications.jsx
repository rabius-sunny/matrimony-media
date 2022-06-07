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

export default function Education() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const { data, loading } = getData()
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
  const onSubmit = data =>
    biodataRequests
      .updateBio(data)
      .then(info => console.log(info))
      .catch(err => console.log(err.message))

  useEffect(() => {
    if (data) {
      setEducation(data.education)
      setSecondary(data.secondary)
      setHigher(data.higher)
      setDawra(data.dawra)
      setTakhassus(data.takhassus)
    }
  }, [data])

  return (
    <ProfileLayout>
      <Head>
        <title>শিক্ষাগত যোগ্যতা</title>
      </Head>
      <ProfileRoutes activeRoute={activeRoute} />
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.education ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.education ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              কোন মাধ্যমে পড়াশোনা করেছেন? *
            </legend>
            <select
              onClick={e => setEducation(e.target.value)}
              defaultValue={data?.education}
              className={`w-full focus:outline-none border-2 ${
                errors.education ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('education', { required: 'education is required' })}
            >
              <option value=''>select</option>
              <OptionMap data={educationType} />
            </select>
            <Fade right when={errors.education ? true : false}>
              {errors.education && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.education.message}
                </p>
              )}
            </Fade>
          </fieldset>
          {/* General Education */}
          {education === educationType[0] && (
            <div>
              <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                <legend className='ml-4 text-lg font-bold text-blue-500'>
                  মাধ্যমিক (SSC) / সমমান পাশ করেছেন?
                </legend>
                <select
                  onClick={e => setSecondary(e.target.value)}
                  defaultValue={data?.secondary}
                  className='w-full focus:outline-none  border-2 border-blue-300 p-2 rounded-md'
                  {...register('secondary')}
                >
                  <option value=''>---</option>
                  <OptionMap data={yesno} />
                </select>
              </fieldset>

              {secondary === yesno[0] && (
                <div>
                  <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                    <legend className='ml-4 font-bold text-blue-500'>
                      মাধ্যমিক (SSC) / সমমান এর বিস্তারিত
                    </legend>
                    <textarea
                      rows={5}
                      defaultValue={data?.secondary_details}
                      placeholder='ফলাফলঃ A+, বিভাগঃ বিজ্ঞান, পাশের সনঃ 2016'
                      {...register('secondary_details')}
                      className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                    />
                    <p className='pl-2 pt-4 text-blue-400'>
                      'আপনার মাধ্যমিক/সমমান এর ফলাফল, বিভাগ ও পাশের সন লিখুন'
                    </p>
                  </fieldset>

                  <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                    <legend className='ml-4 text-lg font-bold text-blue-500'>
                      উচ্চমাধ্যমিক (HSC) / সমমান পাশ করেছেন?
                    </legend>
                    <select
                      onClick={e => setHigher(e.target.value)}
                      defaultValue={data?.higher}
                      className='w-full focus:outline-none  border-2 border-blue-300 p-2 rounded-md'
                      {...register('higher')}
                    >
                      <option value=''>---</option>
                      <OptionMap data={yesno_heigher} />
                    </select>
                  </fieldset>
                  {higher === yesno_heigher[0] && (
                    <div>
                      <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                        <legend className='ml-4 font-bold text-blue-500'>
                          উচ্চমাধ্যমিক (HSC) / সমমান এর বিস্তারিত
                        </legend>
                        <textarea
                          rows={5}
                          defaultValue={data?.higher_details}
                          placeholder='আপনার উচ্চমাধ্যমিক/সমমান এর ফলাফল, বিভাগ ও পাশের সন লিখুন'
                          {...register('higher_details')}
                          className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                        />
                        <p className='pl-2 pt-4 text-blue-400'>
                          'আপনার মাধ্যমিক/সমমান এর ফলাফল, বিভাগ ও পাশের সন
                          লিখুন'
                        </p>
                      </fieldset>

                      <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                        <legend className='ml-4 font-bold text-blue-500'>
                          স্নাতক/স্নাতক(সম্মান)/সমমান শিক্ষাগত যোগ্যতা
                        </legend>
                        <textarea
                          rows={5}
                          defaultValue={data?.honors_details}
                          {...register('honors_details')}
                          className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                        />
                        <p className='pl-2 pt-4 text-blue-400'>
                          এভাবে লিখতে পারেনঃ BA in English Language &
                          Literature, running year/passed year, CGPA...
                        </p>
                      </fieldset>
                    </div>
                  )}
                  {higher === yesno_heigher[1] && (
                    <div>
                      <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                        <legend className='ml-4 text-lg font-bold text-blue-500'>
                          উচ্চমাধ্যমিক (HSC) / সমমান কোন বর্ষে পড়ছেন?
                        </legend>
                        <select
                          defaultValue={data?.higher_year}
                          className='w-full focus:outline-none  border-2 border-blue-300 p-2 rounded-md'
                          {...register('higher_year')}
                        >
                          <OptionMap data={higherType} />
                        </select>
                      </fieldset>
                    </div>
                  )}
                  {higher === yesno_heigher[2] && (
                    <div>
                      <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                        <legend className='ml-4 font-bold text-blue-500'>
                          ডিপ্লোমা এর বিষয়ে বিস্তারিত
                        </legend>
                        <textarea
                          rows={5}
                          defaultValue={data?.diploma_details}
                          placeholder='প্রতিষ্ঠানের নাম, বিভাগ, ফলাফল, পাসের সন'
                          {...register('diploma_details')}
                          className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                        />
                        <p className='pl-2 pt-4 text-blue-400'>
                          ছাত্র হলে বর্ষ লিখবেন
                        </p>
                      </fieldset>
                    </div>
                  )}
                </div>
              )}
              {secondary === yesno[1] && (
                <div>
                  <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                    <legend className='ml-4 text-lg font-bold text-blue-500'>
                      কোন ক্লাস পর্যন্ত পড়েছেন?
                    </legend>
                    <select
                      defaultValue={data?.classes}
                      className='w-full focus:outline-none  border-2 border-blue-300 p-2 rounded-md'
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
              <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                <legend className='ml-4 text-lg font-bold text-blue-500'>
                  আপনি কি হাফেজ?
                </legend>
                <select
                  defaultValue={data?.hafej}
                  className='w-full focus:outline-none  border-2 border-blue-300 p-2 rounded-md'
                  {...register('hafej')}
                >
                  <option value=''>---</option>
                  <OptionMap data={yesno} />
                </select>
              </fieldset>

              <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                <legend className='ml-4 text-lg font-bold text-blue-500'>
                  দাওরায়ে হাদীস পাশ করেছেন?
                </legend>
                <select
                  defaultValue={data?.dawra}
                  onClick={e => setDawra(e.target.value)}
                  className='w-full focus:outline-none  border-2 border-blue-300 p-2 rounded-md'
                  {...register('dawra')}
                >
                  <option value=''>---</option>
                  <OptionMap data={yesno_dawra} />
                </select>
              </fieldset>
              {dawra === yesno_dawra[0] && (
                <div>
                  <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                    <legend className='ml-4 font-bold text-blue-500'>
                      দাওরায়ে হাদীস এর বিস্তারিত
                    </legend>
                    <textarea
                      rows={5}
                      defaultValue={data?.dawra_details}
                      placeholder='নতিজা, পাসের সন লিখুন'
                      {...register('dawra_details')}
                      className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                    />
                  </fieldset>

                  <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                    <legend className='ml-4 text-lg font-bold text-blue-500'>
                      আপনি কি তাখাসসুস পড়েছেন?
                    </legend>
                    <select
                      onClick={e => setTakhassus(e.target.value)}
                      defaultValue={data?.takhassus}
                      className='w-full focus:outline-none  border-2 border-blue-300 p-2 rounded-md'
                      {...register('takhassus')}
                    >
                      <option value=''>---</option>
                      <OptionMap data={yesno} />
                    </select>
                  </fieldset>
                  {takhassus === yesno[0] && (
                    <div>
                      <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                        <legend className='ml-4 font-bold text-blue-500'>
                          তাখাসসুস এর বিস্তারিত
                        </legend>
                        <textarea
                          rows={5}
                          defaultValue={data?.takhassus_details}
                          placeholder='তাখাসসুসের বিষয়, পাসের সন লিখুন'
                          {...register('takhassus_details')}
                          className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                        />
                      </fieldset>
                    </div>
                  )}
                </div>
              )}
              {dawra === yesno_dawra[2] && (
                <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                  <legend className='ml-4 font-bold text-blue-500'>
                    দাওরায়ে হাদীস কোন বর্ষে পড়ছেন?
                  </legend>
                  <input
                    defaultValue={data?.dawra_year}
                    {...register('dawra_year')}
                    className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                  />
                </fieldset>
              )}

              <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
                <legend className='ml-4 font-bold text-blue-500'>
                  সর্বোচ্চ শিক্ষাগত যোগ্যতা
                </legend>
                <textarea
                  rows={5}
                  defaultValue={data?.profession}
                  {...register('profession')}
                  className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
                />
                <p className='pl-2 pt-4 text-blue-400'>
                  শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত
                  লিখবেন।
                </p>
              </fieldset>
            </div>
          )}

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 font-bold text-blue-500'>
              অন্যান্য শিক্ষাগত যোগ্যতা
            </legend>
            <textarea
              rows={5}
              defaultValue={data?.another_education}
              {...register('another_education')}
              className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
            />
            <p className='pl-2 pt-4 text-blue-400'>
              শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত লিখবেন।
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
