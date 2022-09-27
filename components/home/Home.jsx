// import { achieves } from 'assets/fakedata'
import Hometext from '../others/Hometext'
import Dropdown from './Dropdown'
import Featured from './Featured'

export default function Home() {
  return (
    <div className='home'>
      {/* Hero Section */}
      <div className='home__top'>
        <div className='container grid grid-cols-12 gap-6'>
          <div className='order-last col-span-12 md:order-1 md:col-span-5'>
            <div className='hidden rounded-lg border-4 border-dark bg-primary  px-8 py-2 md:block '>
              <Dropdown />
            </div>
          </div>
          <div className='col-span-12 md:order-2 md:col-span-7'>
            <div className=''>
              <h1>
                যে ব্যক্তি বিয়ে করলো সে তার অর্ধেক দ্বীন পূর্ণ করে ফেললো। বাকি
                অর্ধেকের জন্য সে আল্লাহকে ভয় করুক।
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-10 md:pt-0'>
        <div className='container'>
          <div className='block rounded-lg border-4 border-dark bg-primary  px-8 py-2 md:hidden '>
            <Dropdown />
          </div>
        </div>
        <hr className='mt-10 md:mt-0 md:hidden' />
      </div>

      {/* Acheivements */}
      {/* <section className='home__achievements'>
        <div className='container grid grid-cols-12 gap-4 text-center'>
          {achieves.map(acv => (
            <div key={acv.id} className='col-span-6 lg:col-span-3'>
              <img src={acv.img} alt='achievements' />
              <h1 className='py-4 text-3xl text-gray-600 sm:text-6xl'>
                {acv.number}
              </h1>
              <p className='text-primary sm:text-2xl'>{acv.text}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Featured Biodata */}
      <section className='bg-[#ffc9e2]'>
        <div className='container'>
          <h1 className='text-4xl mb-8 text-primary'>ফিচার্ড বায়োডাটা</h1>
          {/* <div className='p-12 rounded-md'> */}
          <Featured />
          {/* </div> */}
        </div>
      </section>

      {/* Tutorial */}
      <div className='home__options bg-primary  pb-28'>
        <h1 className='pt-16 pb-20 text-center text-4xl text-white'>
          টিউটোরিয়াল
        </h1>
        <div className='container text-center'>
          <h1 className='mb-24'>
            <span className='rounded bg-white py-8 px-8 text-lg text-primary sm:px-28 sm:text-xl md:text-3xl'>
              আপনার বায়োডাটা তৈরি করুন
            </span>
          </h1>
          <h2>
            <span className='rounded bg-slate-200 py-6 px-6 text-lg text-primary sm:px-20 sm:text-lg md:text-2xl'>
              কীভাবে বায়োডাটা তৈরি করবেন
            </span>
          </h2>
        </div>
      </div>

      {/* Guide */}
      <section className='bg-gray-200'>
        <div className='container'>
          <h1 className='pb-6 text-center text-3xl text-primary'>
            জীবনসঙ্গী নির্বাচনে ইসলামের নির্দেশনা
          </h1>
          <div className='flex justify-center'>
            <p style={{ maxWidth: '700px', textAlign: 'justify' }}>
              <Hometext />
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
