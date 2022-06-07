import useAuth from 'hooks/useAuth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import userRequest from 'services/userRequest'

export default function Signin() {
  const [data, setData] = useState({
    username: '',
    phone: ''
  })
  const router = useRouter()
  const auth = useAuth()
  useEffect(() => {
    auth && router.push('/')
  }, [auth])

  const onSubmit = e => {
    e.preventDefault()
    if (
      isNaN(Number(data.phone)) ||
      data.phone.length < 11 ||
      data.phone.length > 12
    ) {
      alert('Please enter a valid phone number')
    } else {
      userRequest
        .signIn(data)
        .then(data => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          window.location.reload()
        })
        .catch(err => alert(err.response.data.message))
    }
  }
  const onChange = e => setData({ ...data, [e.target.name]: e.target.value })

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
              <form onSubmit={onSubmit}>
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
                    type='text'
                    name='phone'
                    id='phone'
                    onChange={onChange}
                    required
                    placeholder='Your phone number'
                    className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
                  />
                </div>

                <div className='mt-6'>
                  <button className='w-full transform rounded-md bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                    ENTER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
