import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {
  _type,
  _condition,
  _address_jilla,
  _address_division,
  _birthYear,
  _complexion,
  _height,
  _weight,
  _bloodGroup
} from 'assets/profileinfo'
import FieldInput from 'components/profile/FieldInput'
import { useState } from 'react'
import DropdownProfile from 'components/profile/DropdownProfile'
import SearchDropdownProfile from 'components/profile/SearchDropdownProfile'
import { Fade } from 'react-reveal'

export default function GeneralInfo() {
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
    <>
      <ProfileLayout>
        <ProfileRoutes activeRoute={activeRoute} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.condition ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.condition ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              বৈবাহিক অবস্থা *
            </legend>
            <select
              className={`w-full border-2 focus:outline-none ${
                errors.condition ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('condition', { required: 'condition is required' })}
            >
              <option value=''>---</option>
              {_condition.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Fade right when={errors.condition ? true : false}>
              {errors.condition && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.condition.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.permanent_jilla ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.permanent_jilla ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              স্থায়ী ঠিকানা *
            </legend>
            <select
              className={`w-full focus:outline-none border-2 ${
                errors.permanent_jilla ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('permanent_jilla', {
                required: 'address is required'
              })}
            >
              <option value=''>---</option>
              {_address_jilla.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Fade right when={errors.permanent_jilla ? true : false}>
              {errors.permanent_jilla && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.permanent_jilla.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.permanent_division ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.permanent_division ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              বিভাগ *
            </legend>
            <select
              className={`w-full focus:outline-none border-2 ${
                errors.permanent_division ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('permanent_division', {
                required: 'address is required'
              })}
            >
              <option value=''>---</option>
              {_address_division.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Fade right when={errors.permanent_division ? true : false}>
              {errors.permanent_division && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.permanent_division.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.current_jilla ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.current_jilla ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              বর্তমান ঠিকানা *
            </legend>
            <select
              className={`w-full focus:outline-none border-2 ${
                errors.current_jilla ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('current_jilla', {
                required: 'address is required'
              })}
            >
              <option value=''>---</option>
              {_address_jilla.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Fade right when={errors.current_jilla ? true : false}>
              {errors.current_jilla && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.current_jilla.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.current_division ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.current_division ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              বিভাগ *
            </legend>
            <select
              className={`w-full focus:outline-none border-2 ${
                errors.current_division ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('current_division', {
                required: 'address is required'
              })}
            >
              <option value=''>---</option>
              {_address_division.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Fade right when={errors.current_division ? true : false}>
              {errors.current_division && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.current_division.message}
                </p>
              )}
            </Fade>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.birth ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.birth ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              জন্মসন (আসল) *
            </legend>
            <select
              className={`w-full focus:outline-none border-2 ${
                errors.birth ? 'border-red-500' : 'border-blue-300'
              } p-2 rounded-md`}
              {...register('birth', { required: 'birth date is required' })}
            >
              <option value=''>---</option>
              {_birthYear.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Fade right when={errors.birth ? true : false}>
              {errors.birth && (
                <p className='text-red-500 py-2 pl-2'>{errors.birth.message}</p>
              )}
            </Fade>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 text-lg font-bold text-blue-500'>
              গাত্রবর্ণ
            </legend>
            <select
              className='w-full focus:outline-none  border-2 border-blue-300 p-2 rounded-md'
              {...register('complexion')}
            >
              <option value=''>---</option>
              {_complexion.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 text-lg font-bold text-blue-500'>
              উচ্চতা
            </legend>
            <select
              className='w-full  focus:outline-none border-2 border-blue-300 p-2 rounded-md'
              {...register('height')}
            >
              <option value=''>---</option>
              {_height.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 text-lg font-bold text-blue-500'>
              ওজন
            </legend>
            <select
              className='w-full  focus:outline-none border-2 border-blue-300 p-2 rounded-md'
              {...register('weight')}
            >
              <option value=''>---</option>
              {_weight.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 text-lg font-bold text-blue-500'>
              ওজন
            </legend>
            <select
              className='w-full  focus:outline-none border-2 border-blue-300 p-2 rounded-md'
              {...register('blood')}
            >
              <option value=''>---</option>
              {_bloodGroup.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset
            className={`my-6 rounded-md border-2 ${
              errors.profession ? 'border-red-500' : 'border-blue-300'
            } p-4`}
          >
            <legend
              className={`ml-4 font-bold ${
                errors.profession ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              পেশা *
            </legend>
            <input
              placeholder='সফটওয়্যার ইঞ্জিনিয়ার'
              {...register('profession', {
                required: 'profession is required'
              })}
              className={`w-full rounded ${
                errors.profession ? 'bg-red-100' : 'bg-blue-100'
              } px-4 py-2 font-medium text-blue-400 shadow-md ${
                errors.profession
                  ? 'focus:outline-red-500'
                  : 'focus:outline-blue-500'
              }`}
            />
            <Fade right when={errors.profession ? true : false}>
              {errors.profession && (
                <p className='text-red-500 py-2 pl-2'>
                  {errors.profession.message}
                </p>
              )}
            </Fade>
            <p className='pl-2 pt-4 text-blue-400'>
              সর্বোচ্চ ৩ শব্দে শুধু পদবী লিখবেন। পেশা সম্পর্কে বিস্তারিত লিখার
              জন্য সামনে প্রশ্ন আসছে।
            </p>
          </fieldset>

          <fieldset className='my-6 rounded-md border-2 border-blue-300 p-4'>
            <legend className='ml-4 font-bold text-blue-500'>মাসিক আয়</legend>
            <input
              placeholder='৩০ হাজার'
              {...register('income')}
              className='w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500'
            />
            <p className='pl-2 pt-4 text-blue-400'>
              জানাতে অনিচ্ছুক হলে ঘরটি ফাঁকা রাখুন।
            </p>
          </fieldset>

          <input
            type='submit'
            value='Save Changes'
            className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
          />
        </form>
      </ProfileLayout>
    </>
  )
}
