import qadata from 'assets/qadata'
import Head from 'next/head'
import Disclosure from '../components/others/Disclosure'
import ColoredHeader from '../components/shared/ColoredHeader'

export default function Qa() {
  return (
    <div className='qa'>
      <Head>
        <title>প্রশ্নোত্তর | জান্নাতি জুটি.COM</title>
      </Head>
      <ColoredHeader heading='প্রশ্নোত্তর' />
      <div className='mt-10'>
        <div className='container2 minHeight'>
          {qadata.map((item, idx) => (
            <Disclosure key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
