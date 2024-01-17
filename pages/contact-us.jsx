import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import userRequest from 'services/network/userRequest'
import ColoredHeader from '../components/shared/ColoredHeader'
import LongModal from 'components/shared/Modals/LongModal'

export default function ContactUs() {
  const { back } = useRouter()
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isVisible, setIsVisible] = useState(false)

  const onChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    userRequest
      .postMessage(input)
      .then((res) => res.message === 'ok' && setIsVisible(true))
      .catch((err) => alert('error! try again.'))
  }

  return (
    <div className='contactus'>
      <Head>
        <title>যোগাযোগ</title>
      </Head>
      <LongModal
        blur
        scroll={false}
        visible={isVisible}
        onClose={() => back()}
        body='আপনার মেসেজটি কর্তৃপক্ষের নিকট পাঠানো হয়েছে। জাযাকাল্লাহু খাইরান।'
        btn='ok'
        color='success'
        bodyColor='success'
      />
      <ColoredHeader heading='যোগাযোগ' />
      <div className='container minHeight'>
        <p className='my-16 text-center text-xl text-gray-600'>
          আপনার যে কোন জিজ্ঞাসা নিম্নোক্ত ফর্মে পূরণ করে আমাদের কাছে পাঠিয়ে দিন।{' '}
          <br /> আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো ইন শা আল্লাহ।
        </p>
        <div className='flex justify-center'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block font-semibold text-secondary'
              >
                আপনার নাম
              </label>
              <input
                type='text'
                required
                name='name'
                onChange={onChange}
                placeholder='enter your name'
                autoComplete='name'
                className='shadow-md w-full bg-green-100 focus:ring-2 focus:ring-secondary text-secondary rounded px-4 py-2'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block font-semibold text-secondary'
              >
                আপনার ইমেইল
              </label>
              <input
                type='email'
                required
                name='email'
                onChange={onChange}
                placeholder='enter your email'
                autoComplete='email'
                className='shadow-md w-full bg-green-100 focus:ring-2 focus:ring-secondary text-secondary rounded px-4 py-2'
              />
            </div>
            <div>
              <label
                htmlFor='message'
                className='block font-semibold text-secondary'
              >
                আপনার বার্তা
              </label>
              <textarea
                onChange={onChange}
                required
                name='message'
                rows={3}
                className='shadow-md bg-green-100 focus:ring-2 focus:ring-secondary text-secondary mt-1 block w-full rounded-md px-4 py-2'
                placeholder='your message'
              />
            </div>
            <div className='text-right my-4'>
              <input
                type='submit'
                value='পাঠান'
                className=' cursor-pointer shadow-lg bg-secondary  text-center text-white px-10 py-2 rounded'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
