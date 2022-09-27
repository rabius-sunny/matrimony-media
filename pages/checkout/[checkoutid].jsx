import CForm from 'components/profile/CFroms'
import GInput from 'components/profile/GInput'
import ColoredHeader from 'components/shared/ColoredHeader'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Collapse, Loading } from '@nextui-org/react'
import { useState } from 'react'
import LongModal from 'components/shared/Modals/LongModal'
import userRequest from 'services/userRequest'

export default function Checkout() {
  const {
    query: { checkoutid }
  } = useRouter()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [method, setMethod] = useState(1)
  const [pement, setPement] = useState({
    pnumber: '',
    trx: ''
  })
  const pmethod = method => {
    switch (method) {
      case 1:
        return 'bkash'
      case 2:
        return 'nagad'
      case 3:
        return 'rocket'
      default:
        return 'bkash'
    }
  }
  const onSubmit = data => {
    if (pement.pnumber === '' || pement.trx === '') {
      alert('Fill your payment info')
    } else {
      setLoading(true)
      userRequest
        .makeRequest({
          ...data,
          ...pement,
          method: pmethod(method),
          target: checkoutid
        })
        .then(info => {
          if (info.message === 'ok') {
            setLoading(false)
            setVisible(true)
          }
        })
        .catch(err => {
          setLoading(false)
          setVisible2(true)
        })
    }
  }
  const onChange = e =>
    setPement({ ...pement, [e.target.name]: e.target.value })

  return (
    <div>
      <Head>
        <title>তথ্যের জন্য আবেদন || {checkoutid}</title>
      </Head>
      <ColoredHeader heading='তথ্যের জন্য আবেদন' />

      <LongModal
        visible={visible}
        onClose={() => {
          setVisible(false)
          router.push('/')
        }}
        preventClose={false}
        body='আপনার রিকুয়েস্টটি গৃহীত হয়েছে, শীঘ্রই SMS এর মাধ্যমে তথ্য পেয়ে যাবেন ইনশা আল্লাহ!'
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

      <div className='container' style={{ maxWidth: '600px' }}>
        <div className='my-8'>
          <div className='text-center'>
            <p className='text-xl'>
              বায়োডাটার অভিভাবকের মোবাইল নাম্বার পেতে নির্ধারিত টাকা পরিশোধ করতে
              হবে। অনুগ্রহ পূর্বক ফর্মটি পূরণের মাধ্যমে আপনার আবেদন সম্পন্ন
              করুন। আবেদন সম্পন্ন হলে সর্বোচ্চ ২ কর্ম দিবসের মধ্যে যোগাযোগ তথ্য
              আপনার প্রদত্ত মোবাইল নাম্বারে SMS এর মাধ্যমে পাঠিয়ে দেয়া হবে ইন শা
              আল্লাহ।
            </p>
            <div className='mt-8'>
              <button className='bg-primary  p-4 text-xl text-white rounded-lg'>
                যেভাবে আবেদন করবেন (ভিডিও)
              </button>
            </div>
          </div>

          <div className='mt-8'>
            <CForm onSubmit={onSubmit}>
              <GInput
                legend='আপনি কি এই বায়োডাটাতে উল্লেখিত শর্তসমূহ পূরণ করেন? '
                name='fillrequired'
                message='field is required'
              />
              <GInput
                legend='আপনার মাঝে কি আকাঙ্ক্ষিত বৈশিষ্ট্যাবলী বিদ্যমান? '
                name='hasfeature'
                message='field is required'
              />
              <GInput
                legend='আপনার নাম'
                name='name'
                message='name is required'
              />
              <GInput
                type='email'
                legend='আপনার ইমেইল এ্যাড্রেস'
                name='email'
                message='email is required'
              />
              <GInput
                type='number'
                legend='আপনার মোবাইল নম্বর'
                name='phone'
                message='phone is required'
              />
              <div className='mt-8 mb-4 font-medium text-2xl'>
                {checkoutid} এর বায়োডাটাটি পেতে যেকোনো একটি মাধ্যমে পেমেন্ট করুন
                <hr />
              </div>
              <Collapse.Group onChange={data => setMethod(data)}>
                {_collaps.map((col, idx) => (
                  <Collapse
                    expanded={idx === 0 ? true : false}
                    title={col.title}
                    key={idx}
                  >
                    <p className=''>{col.text}</p>
                    <p className=''>{col.number}</p>
                    <div className='my-4'>
                      <label className='font-bold'>{col.legend}</label>
                      <input
                        name='pnumber'
                        onChange={onChange}
                        className={`w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500`}
                      />
                    </div>
                    <div className='my-4'>
                      <label className='font-bold'>Transaction ID</label>
                      <input
                        name='trx'
                        onChange={onChange}
                        className={`w-full rounded bg-blue-100 px-4 py-2 font-medium text-blue-400 shadow-md focus:outline-blue-500`}
                      />
                    </div>
                  </Collapse>
                ))}
              </Collapse.Group>
              <div className='flex items-center'>
                <button
                  type='submit'
                  className={`${
                    loading
                      ? 'pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer'
                  } rounded-md bg-primary  flex items-center font-medium text-white shadow-md hover:bg-primary  px-6 py-3`}
                >
                  {loading ? (
                    <Loading color='success' size='sm' />
                  ) : (
                    'রিকুয়েস্ট পাঠান'
                  )}
                </button>
              </div>
            </CForm>
          </div>
        </div>
      </div>
    </div>
  )
}

const _collaps = [
  {
    title: 'Bkash',
    avatar: '',
    text: 'নিম্ন উল্লিখিত Bkash (Personal) নাম্বারে ১০০ টাকা Send Money করুন।',
    number: 'আমাদের Bkash পার্সোনাল নম্বর : 01XXXXXXXXX',
    legend: 'আপনার Bkash নম্বর'
  },
  {
    title: 'Nagad',
    avatar: '',
    text: 'নিম্ন উল্লিখিত Nagad (Personal) নাম্বারে ১০০ টাকা Send Money করুন।',
    number: 'আমাদের Nagad পার্সোনাল নম্বর : 01XXXXXXXXX',
    legend: 'আপনার Nagad নম্বর'
  },
  {
    title: 'Rocket',
    avatar: '',
    text: 'নিম্ন উল্লিখিত Rocket (Personal) নাম্বারে ১০০ টাকা Send Money করুন।',
    number: 'আমাদের Rocket পার্সোনাল নম্বর : 01XXXXXXXXX',
    legend: 'আপনার Rocket নম্বর'
  }
]
