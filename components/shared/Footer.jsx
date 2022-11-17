import Link from 'next/link'
import { TbExternalLink } from 'react-icons/tb'

export default function Footer() {
  return (
    <footer>
      <section className='bg-primary'>
        <div className='container'>
          <div className='grid grid-cols-6'>
            <div className='col-span-3'>
              <div className='text-start md:text-center'>
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
            </div>
            <div className='col-span-3 text-right'>
              <div className='text-center'>
                <h2 className='text-xl mb-4 text-white font-bold'>
                  Connect us
                </h2>
                <ul>
                  <li>
                    <a href='https://www.facebook.com/profile.php?id=100081513904117'>
                      ফেইসবুক পেইজ
                    </a>
                  </li>
                  <li>
                    <a href='https://www.facebook.com/groups/jannatijuti'>
                      ফেইসবুক গ্রুপ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='bg-secondary text-center'>
        <div className='container3 text-white tracking-wider'>
          Copyright, 2022 | jannatijuti.com
        </div>
      </div>
    </footer>
  )
}
