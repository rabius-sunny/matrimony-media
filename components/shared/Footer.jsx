import Link from 'next/link'
import { HiUserGroup } from 'react-icons/hi'
import { BsFacebook, BsYoutube } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { Tooltip } from '@nextui-org/react'

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
      <div className='text-white py-3 text-center bg-dark'>
        <div className='container3'>
          <div className='flex items-center justify-center'>
            {links.map((item, index) => (
              <Tooltip
                color='secondary'
                className='px-3'
                content={item.name}
                key={item.name}
              >
                <a href={item.link} target='_blank' rel='noopener noreferrer'>
                  <item.icon className={index === 0 ? 'h-7 w-7' : 'h-8 w-8'} />
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
      <div className='bg-secondary text-center'>
        <div className='container3 text-sm text-white'>
          jannatijuti.com | Created with 💖 by{' '}
          <a
            className='text-primary font-semibold underline'
            href='https://fb.com/rabibinsalam'
          >
            dev
          </a>
        </div>
      </div>
    </footer>
  )
}

const links = [
  {
    name: 'Facebook Page',
    icon: BsFacebook,
    link: 'https://www.facebook.com/profile.php?id=100081513904117'
  },
  {
    name: 'Facebook Group',
    icon: HiUserGroup,
    link: 'https://www.facebook.com/groups/jannatijuti'
  },
  {
    name: 'Youtube Channel',
    icon: BsYoutube,
    link: 'https://www.facebook.com/profile.php?id=100081513904117'
  },
  {
    name: 'Twitter',
    icon: AiFillTwitterCircle,
    link: 'https://www.facebook.com/profile.php?id=100081513904117'
  }
]
