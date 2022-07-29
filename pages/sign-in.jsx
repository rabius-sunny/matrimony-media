import useAuth from 'hooks/useAuth'
import Head from 'next/head'
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth'
import firebaseApp from 'services/firebaseInit'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import userRequest from 'services/userRequest'

export default function Signin() {
  const [cred, setCred] = useState({
    username: '',
    phone: '',
    otp: ''
  })
  const [confirm, setConfirm] = useState(null)
  const [isOtp, setIsOtp] = useState(false)

  const router = useRouter()
  const auth = useAuth()
  useEffect(() => {
    auth && router.push('/')
  }, [auth])

  const recaptcha = async _ => {
    const fireAuth = getAuth(firebaseApp)
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      fireAuth
    )
    recaptchaVerifier.render()
    return signInWithPhoneNumber(
      fireAuth,
      '+88' + cred.phone,
      recaptchaVerifier
    )
  }

  const onPhoneSubmit = async e => {
    e.preventDefault()
    if (
      isNaN(Number(cred.phone)) ||
      cred.phone.length < 11 ||
      cred.phone.length > 14
    ) {
      alert('Please enter a valid phone number')
    } else {
      try {
        const response = await recaptcha()
        setConfirm(response)
        setIsOtp(true)
        console.log('response', response)
      } catch (error) {
        console.log('otp error', error)
      }
    }
  }
  const onOtpSubmit = async e => {
    e.preventDefault()

    try {
      const confirmation = await confirm.confirm(cred.otp)
      handleSubmit(e)
    } catch (error) {
      console.log('errorss', error)
      alert('wrong otp')
      if (typeof window !== 'undefined') window.location.reload()
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await userRequest.signIn({
        username: cred.username,
        phone: cred.phone
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data.id)
      localStorage.setItem('username', data.username)
      router.push('/profile/edit/name')
      // window.location.reload()
    } catch (error) {
      alert(error.response.data.message)
      window.location.reload()
    }
  }
  const onChange = e => setCred({ ...cred, [e.target.name]: e.target.value })

  return (
    <div className='bg-gradient-to-l from-rose-600 to-pink-600'>
      <Head>
        <title>সাইন ইন</title>
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
              <h2 className='text-4xl font-bold text-white'>Matrimony Media</h2>

              <p className='mt-3 max-w-xl text-gray-300'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        <div className='mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6'>
          <div className='flex-1'>
            <div className='text-center'>
              <h2 className='text-center text-4xl font-bold text-white dark:text-white'>
                Matrimony Media
              </h2>

              <p className='mt-3 text-white dark:text-gray-300'>
                Enter with your username and phone
              </p>
            </div>

            <div className='mt-8'>
              {!isOtp && (
                <form onSubmit={/* onPhoneSubmit */ handleSubmit}>
                  <div>
                    <label
                      htmlFor='username'
                      className='mb-2 block text-sm text-white dark:text-gray-200'
                    >
                      Username
                    </label>
                    <input
                      type='username'
                      name='username'
                      id='username'
                      required
                      onChange={onChange}
                      placeholder='your username'
                      className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
                    />
                  </div>

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
                      className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
                    />
                  </div>

                  <div className='my-3'>
                    <div id='recaptcha-container' />
                  </div>

                  <div className='mt-6'>
                    <button className='w-full transform rounded-md bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                      GET OTP
                    </button>
                  </div>
                </form>
              )}
              {isOtp && (
                <div className='text-center'>
                  <h1 className='text-3xl text-white'>Enter OTP</h1>
                  <form onSubmit={onOtpSubmit}>
                    <input
                      type='number'
                      name='otp'
                      onChange={onChange}
                      required
                      className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
                    />
                    <div className='mt-6'>
                      <button
                        type='submit'
                        className='w-full transform rounded-md bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                      >
                        ENTER OTP & SIGN IN
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
