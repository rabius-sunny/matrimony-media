// import { achieves } from 'assets/fakedata'
import Hometext from '../others/Hometext'
import Dropdown from './Dropdown'
import Featured from './Featured'

export default function Home() {
  return (
    <div className='home'>
      {/* Hero Section */}
      <div className='home__top'>
        <div className='container grid grid-cols-12 md:gap-8'>
          <div className='order-last col-span-12 md:order-1 md:col-span-5'>
            <div className='hidden rounded-lg border-4 border-white border-opacity-40 bg-secondary px-4 lg:px-8 md:block '>
              <Dropdown />
            </div>
          </div>
          <div className='col-span-12 md:order-2 md:col-span-7'>
            <div className='flex lg:ml-12 flex-col items-center'>
              <h1 className='text-white text-xl sm:text-3xl lg:text-3xl lg:leading-normal xl:text-5xl xl:leading-snug font-semibold'>
                যে ব্যক্তি বিয়ে করলো সে তার অর্ধেক দ্বীন পূর্ণ করে ফেললো। বাকি
                অর্ধেকের জন্য সে আল্লাহকে ভয় করুক।
              </h1>
              <div className='flex items-center mt-2'>
                <div className='h-[1px] md:h-[3px] bg-white w-16 md:w-28' />
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    className='flex items-center -mt-[5px]'
                    key={item}
                  >
                    <div className='h-[1px] md:h-[2px] bg-white w-2 -mx-[2px] -rotate-45' />
                    <div className='h-[1px] md:h-[2px] bg-white w-2 -mx-[2px] rotate-45' />
                  </div>
                ))}
                <div className='h-[1px] md:h-[3px] bg-white w-16 md:w-28' />
              </div>
              <p className='text-white text-sm mt-2 sm:text-md lg:text-lg mb-20 '>
                বায়হাক্বী, শু’আবুল ঈমান, ৫৪৮৬
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-2 md:pt-0 bg-[#fcfcfc]'>
        <div className='container'>
          <div className='block rounded-lg border-4 border-dark bg-primary -mt-6 px-3 sm:px-5 md:hidden '>
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
      <section className='bg-[#ffc9e2] md:bg-[#fcfcfc]'>
        <div className=' px-2 sm:px-6 md:px-8 md:max-w-6xl mx-auto'>
          <h1 className='text-3xl sm:text-4xl mb-8 text-primary'>
            ফিচার্ড বায়োডাটা
          </h1>
          <div className='sm:pt-0 rounded-md'>
            <Featured />
          </div>
        </div>
      </section>

      {/* Tutorial */}
      <div className='home__options bg-primary pb-60'>
        <h1 className='pt-16 pb-20 text-center text-3xl sm:text-4xl text-white'>
          টিউটোরিয়াল
        </h1>
        <div className='container text-center'>
          <h1 className='mb-24'>
            <span className='rounded bg-white font-semibold py-8 px-8 text-lg text-primary sm:px-28 sm:text-xl md:text-3xl'>
              আপনার বায়োডাটা তৈরি করুন
            </span>
          </h1>
          <h2>
            <span className='rounded bg-red-100 font-semibold py-6 px-6 text-lg text-primary sm:px-20 sm:text-lg md:text-2xl'>
              কীভাবে বায়োডাটা তৈরি করবেন
            </span>
          </h2>
        </div>
      </div>

      {/* Guide */}
      <section className='container bg-gray-100 -mt-28 rounded-t-md'>
        <h1 className='pb-6 text-center text-xl font-semibold text-primary'>
          জীবনসঙ্গী নির্বাচনে ইসলাম কী বলে
        </h1>
        <div className='flex justify-center'>
          <div style={{ maxWidth: '700px', textAlign: 'justify' }}>
            <Hometext />
          </div>
        </div>
      </section>
    </div>
  )
}
