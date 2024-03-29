import useAuth from 'hooks/useAuth'
import Head from 'next/head'
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber
// } from 'firebase/auth'
// import firebaseApp from 'services/network/firebaseInit'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import userRequest from 'services/network/userRequest'
import getUIDs from 'hooks/getUIDs'
import getRandomUID from 'hooks/getRandomUID'
import { Loading } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { atHome, notHome } from 'services/state/utilSlice'
import Link from 'next/link'
import { addBookmark } from 'services/state/dataSlice'

export default function Signin() {
  const dispatch = useDispatch()

  const { uIds } = getUIDs()
  const [cred, setCred] = useState({
    phone: '',
    otp: ''
  })
  const [uId, setUId] = useState(null)
  const [loading, setLoading] = useState(false)
  // const [confirm, setConfirm] = useState(null)
  const [isOtp, setIsOtp] = useState(false)

  const router = useRouter()
  const auth = useAuth()
  useEffect(() => {
    dispatch(notHome())
    return () => dispatch(atHome())
  }, [])

  useEffect(() => {
    auth && router.push('/')
  }, [auth])

  useEffect(() => {
    const randomUid = getRandomUID(10100, 99999)
    setUId(randomUid)
    if (uIds) {
      while (uIds.includes(uId)) {
        setUId(getRandomUID(10100, 99999))
        console.log('exists, trying again..wait...')
      }
    }
  }, [uIds])

  // const recaptcha = async (_) => {
  //   const fireAuth = getAuth(firebaseApp)
  //   const recaptchaVerifier = new RecaptchaVerifier(
  //     'recaptcha-container',
  //     {},
  //     fireAuth
  //   )
  //   recaptchaVerifier.render()
  //   return signInWithPhoneNumber(
  //     fireAuth,
  //     '+88' + cred.phone.split(' ').join(''),
  //     recaptchaVerifier
  //   )
  // }

  // const onPhoneSubmit = async () => {
  //   setLoading(true)
  //   if (isNaN(Number(cred.phone)) || cred.phone.length !== 11) {
  //     alert('ভ্যালিড নাম্বার ব্যবহার করুন। ফরমেট = 01XXXXXXXXX')
  //     setLoading(false)
  //   } else {
  //     try {
  //       const response = await recaptcha()
  //       setConfirm(response)
  //       setIsOtp(true)
  //       setLoading(false)
  //     } catch (error) {
  //       console.log('otp error', error)
  //       setLoading(false)
  //     }
  //   }
  // }

  // const onOtpSubmit = async (e) => {
  //   setLoading(true)
  //   e.preventDefault()

  //   try {
  //     await confirm.confirm(cred.otp)
  //     handleSubmit(e)
  //   } catch (error) {
  //     alert('wrong otp')
  //     setLoading(false)
  //   }
  // }

  const handleSubmit = async () => {
    setLoading(true)
    if (isNaN(Number(cred.phone)) || cred.phone.length !== 11) {
      alert('ভ্যালিড নাম্বার ব্যবহার করুন। ফরমেট = 01XXXXXXXXX')
      setLoading(false)
      return
    }
    try {
      const data = await userRequest.signIn({
        phone: cred.phone.split(' ').join(''),
        uId
      })
      dispatch(addBookmark(data.bookmarks))
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data.id)
      router.push('/profile/edit/primary')
      // window.location.reload()
    } catch (error) {
      alert(error.response.data.message)
      window.location.reload()
    }
  }

  const onChange = (e) => setCred({ ...cred, [e.target.name]: e.target.value })

  const submitHandler = (e) => {
    e.preventDefault()
    return handleSubmit()
    // return onPhoneSubmit()
  }

  return (
    <div className='bg-secondary'>
      <Head>
        <title>সাইন ইন | জান্নাতি জুটি.COM</title>
      </Head>
      <div className='flex h-screen justify-center'>
        <div
          className='hidden bg-cover lg:block lg:w-2/3'
          style={{
            backgroundImage: "url('/images/homebg2.jpg')"
          }}
        >
          <div className='flex h-full items-center bg-gray-900 bg-opacity-40 px-20'>
            <div>
              <h2 className='text-6xl font-bold text-white'>
                <span className='text-primary'>জান্নাতি</span>{' '}
                <span className='text-secondary'>জুটি</span>
              </h2>

              <p className='mt-3 text-xl max-w-xl text-white'>
                দ্বীনদার পাত্র-পাত্রী খোঁজার একটি বিশ্বস্ত প্রতিষ্ঠান
              </p>
            </div>
          </div>
        </div>

        <div className='mx-auto bg-secondary flex w-full max-w-md items-center px-6 lg:w-2/6'>
          <div className='flex-1'>
            <div className='text-center'>
              <Link
                href='/'
                legacyBehavior
              >
                <a className='text-center text-4xl md:text-6xl font-bold text-primary dark:text-white'>
                  জান্নাতি জুটি
                </a>
              </Link>

              <p className='mt-5 text-lg text-white dark:text-gray-300'>
                আপনার ফোন নম্বর দিয়ে প্রবেশ করুন
              </p>
            </div>

            <div className='mt-8'>
              {!isOtp && (
                <form onSubmit={submitHandler}>
                  <div className='mt-6'>
                    <label
                      htmlFor='phone'
                      className='text-sm text-white dark:text-gray-200'
                    >
                      Phone
                    </label>
                    <input
                      type='tel'
                      placeholder='01XXXXXXXXX'
                      name='phone'
                      id='phone'
                      onChange={onChange}
                      required
                      className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-secondary font-semibold placeholder-gray-400 focus:outline-none focus:ring focus:ring-dark  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600'
                    />
                  </div>

                  <div className='my-3'>
                    <div id='recaptcha-container' />
                  </div>

                  <div className='mt-6'>
                    <button
                      className={`${
                        loading && 'pointer-events-none'
                      } w-full bg-primary text-white hover:bg-dark transform rounded-md px-4 py-2 tracking-wide transition-colors duration-200 focus:outline-none focus:ring focus:ring-dark`}
                    >
                      {loading ? (
                        <Loading
                          color='white'
                          size='sm'
                        />
                      ) : (
                        'OTP কোড নিন'
                      )}
                    </button>
                  </div>
                </form>
              )}
              {/* isOtp && (
                <div className='text-center'>
                  <h1 className='text-3xl text-white'>OTP কোড দিন</h1>
                  <form onSubmit={onOtpSubmit}>
                    <input
                      type='number'
                      name='otp'
                      onChange={onChange}
                      required
                      className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
                    />
                    <div className='mt-6'>
                      <button
                        type='submit'
                        className={`${
                          loading && 'pointer-events-none'
                        } w-full bg-primary hover:bg-dark transform rounded-md bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300`}
                      >
                        {loading ? (
                          <Loading
                            color='white'
                            size='sm'
                          />
                        ) : (
                          'OTP দিয়ে প্রবেশ করুন'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
