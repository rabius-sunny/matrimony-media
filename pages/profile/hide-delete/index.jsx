import { Collapse } from '@nextui-org/react'
import ColoredHeader from 'components/shared/ColoredHeader'
import LongModal from 'components/shared/Modals/LongModal'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import userRequest from 'services/network/userRequest'

export default function Delete() {
  const router = useRouter()
  const [info, setInfo] = useState('')
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [method, setMethod] = useState(1)
  const _type = (type) => {
    switch (type) {
      case 1:
        return 'hide'
      case 2:
        return 'delete'
      default:
        return 'hide'
    }
  }
  const handleSubmit = (_) => {
    if (info === '') {
      alert('Enter your reason')
    } else {
      userRequest
        .deleteHideRequest({ reason: info, type: _type(method) })
        .then((info) => {
          if (info.message === 'ok') {
            setVisible(true)
          }
        })
        .catch((err) => setVisible2(true))
    }
  }
  return (
    <div>
      <Head>
        <title>Delete/Hide Request</title>
      </Head>
      <ColoredHeader heading='Delete / Hide Request' />
      <LongModal
        visible={visible}
        onClose={() => {
          setVisible(false)
          router.push('/')
        }}
        preventClose={false}
        body='আপনার রিকুয়েস্টটি গৃহীত হয়েছে, শীঘ্রই SMS এর মাধ্যমে ফলাফল পেয়ে যাবেন ইনশা আল্লাহ!'
        btn='ok'
        blur={true}
      />
      <LongModal
        visible={visible2}
        onClose={() => setVisible2(false)}
        preventClose={false}
        body={
          <div className='text-xl text-primary font-bold'>
            ইরর হয়েছে, আবার চেষ্টা করুন
          </div>
        }
        btn='ok'
        color='error'
        blur={true}
      />
      <div
        className='container'
        style={{ maxWidth: '600px', minHeight: '60vh' }}
      >
        <div className='my-8'>
          <p className='my-4 font-bold text-xl'>
            আপনার বায়োডাটা ডিলিট / হাইড করতে নিম্নোক্ত ফর্মটি পূরণের মাধ্যমে
            আবেদন করুন।
          </p>

          <p className='my-4 font-bold text-xl'>এখানে দুইটি অপশন আছে।</p>

          <p className='my-4'>
            ১) বায়োডাটা “ডিলিট” এর মাধ্যমে আপনার বায়োডাটা সম্পূর্ণভাবে ওয়েবসাইট
            থেকে মুছে ফেলতে পারবেন। যা পরবর্তীতে ফিরিয়ে আনা সম্ভব না।
            <br />
            ২) বায়োডাটা “হাইড” এর মাধ্যমে আপনার বায়োডাটাটি সার্চ ফিল্টার থেকে
            গোপনে রাখতে পারবেন। পরবর্তীতে যে যেকোন সময় পুনরায় পাব্লিশ করতে
            পারবেন ইন শা আল্লাহ।
          </p>
          <div className='my-4'>
            <Collapse.Group
              onChange={(data) => {
                setInfo('')
                setMethod(data)
              }}
            >
              <Collapse
                expanded
                title='হাইড করুন'
                className='font-bold text-2xl'
              >
                <label className='text-gray-600 font-bold'>
                  হাইড করার কারণ
                </label>
                <textarea
                  value={info}
                  rows={5}
                  onChange={(e) => setInfo(e.target.value)}
                  className={`w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500`}
                />
              </Collapse>
              <Collapse
                title='ডিলিট করুন'
                className='font-bold text-2xl'
              >
                <label className='text-gray-600 font-bold'>
                  ডিলিট করার কারণ
                </label>
                <textarea
                  value={info}
                  rows={5}
                  onChange={(e) => setInfo(e.target.value)}
                  className={`w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500`}
                />
              </Collapse>
            </Collapse.Group>
            <div className='my-4'>
              <button
                onClick={handleSubmit}
                className='w-full rounded-md bg-primary  px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-primary  focus:ring-2 focus:ring-red-800'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
