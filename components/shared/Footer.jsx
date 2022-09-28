import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <section className='bg-primary'>
        <div className='container'>
          <div className='grid grid-cols-5'>
            <div className='col-span-3 lg:col-span-2'>
              <h2 className='text-xl mb-4 text-white font-bold'>Pages</h2>
              <ul>
                <li>
                  <Link href='/favorite'>ফেভারিট</Link>
                </li>
                <li>
                  <Link href='/qa'>প্রশ্নোত্তর</Link>
                </li>
                <li>
                  <Link href='/about-us'>আমাদের সম্পর্কে</Link>
                </li>
                <li>
                  <Link href='/contact-us'>যোগাযোগ</Link>
                </li>
              </ul>
            </div>
            <div className='col-span-2'>
              <div className=''>
                <h2 className='text-xl mb-4 text-white font-bold'>
                  Important Links
                </h2>
                <ul>
                  <li>importantlink.com</li>
                  <li>importantlink.com</li>
                  <li>importantlink.com</li>
                  <li>importantlink.com</li>
                </ul>
              </div>
            </div>
            <div className='col-span-5 mt-8 lg:mt-0 text-center lg:text-left lg:col-span-1'>
              <div className=''>
                <h2 className='text-xl mb-4 text-white font-bold'>
                  Important Links
                </h2>
                <ul className='underline'>
                  <li>Blog title goes here, blog title goes here</li>
                  <li>Blog title goes here, blog title goes here</li>
                  <li>Blog title goes here, blog title goes here</li>
                  <li>Blog title goes here, blog title goes here</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
