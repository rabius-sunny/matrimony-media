import Head from 'next/head'
import ColoredHeader from '../components/shared/ColoredHeader'

export default function ContactUs() {
  return (
    <div className='contactus'>
      <Head>
        <title>যোগাযোগ</title>
      </Head>
      <ColoredHeader heading='যোগাযোগ' />
      <div className='container minHeight'>
        <p className='my-20 text-center text-xl text-gray-600'>
          আপনার যে কোন জিজ্ঞাসা নিম্নোক্ত ফর্মে পূরণ করে আমাদের কাছে পাঠিয়ে দিন।{' '}
          <br /> আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো ইন শা আল্লাহ।
        </p>
        <div className='flex justify-center'>
          <form>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-md font-medium text-red-600'
              >
                আপনার নাম
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='enter your name'
                autoComplete='name'
                className='shadow-md w-full bg-red-100 focus:outline-red-500 text-red-400 rounded px-4 py-2'
              />
            </div>
            <div className='my-4'>
              <label
                htmlFor='email'
                className='block text-md font-medium text-red-600'
              >
                আপনার ইমেইল
              </label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='enter your email'
                autoComplete='email'
                className='shadow-md w-full bg-red-100 focus:outline-red-500 text-red-400 rounded px-4 py-2'
              />
            </div>
            <div className='my-4'>
              <label
                htmlFor='subject'
                className='block text-md font-medium text-red-600'
              >
                বিষয়
              </label>
              <input
                type='text'
                name='subject'
                id='subject'
                placeholder='enter your subject'
                className='shadow-md w-full bg-red-100 focus:outline-red-500 text-red-400 rounded px-4 py-2'
              />
            </div>
            <div>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-red-600'
              >
                আপনার বার্তা
              </label>
              <textarea
                id='message'
                name='message'
                rows={3}
                className='shadow-md bg-red-100 focus:outline-red-500 text-red-400 mt-1 block w-full sm:text-sm rounded-md px-4 py-2'
                placeholder='your message'
              />
            </div>
            <div className='submit text-right my-4'>
              <input
                type='submit'
                value='পাঠান'
                className='shadow-md bg-red-600 text-center text-white px-10 py-2 rounded'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
