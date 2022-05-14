import { useState } from 'react'

export default function Signin() {
  const [data, setData] = useState({
    name: '',
    phone: ''
  })

  const onSubmit = e => {
    e.preventDefault()
    if (
      isNaN(Number(data.phone)) ||
      data.phone.length < 11 ||
      data.phone.length > 12
    ) {
      alert('Please enter a valid phone number')
    } else {
      console.log(data)
    }
  }
  const onChange = e => setData({ ...data, [e.target.name]: e.target.value })

  return (
    <div className='bg-gradient-to-l from-rose-600 to-pink-600'>
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
                Enter with your name and phone
              </p>
            </div>

            <div className='mt-8'>
              <form onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor='name'
                    className='mb-2 block text-sm text-white dark:text-gray-200'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    onChange={onChange}
                    placeholder='Rabius Sunny'
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
