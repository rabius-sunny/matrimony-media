import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAuth from 'hooks/useAuth'
import { LogoutIcon } from '@heroicons/react/outline'

const solutions = [
  {
    name: 'ফেভারিট',
    href: '/favorite'
  },
  {
    name: 'প্রশ্নোত্তর',
    href: '/qa'
  },
  {
    name: 'আমাদের সম্পর্কে',
    href: '/about-us'
  },
  {
    name: 'যোগাযোগ',
    href: '/contact-us'
  }
]

export default function Navigation() {
  const router = useRouter()
  const auth = useAuth()

  const _reload = _ => window.location.reload()

  const handleLogOut = _ => {
    if (router.pathname === '/') _reload()
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('username')
    router.push('/')
  }

  return (
    <Popover className='relative z-20 bg-white'>
      <Menu as='div' className='relative z-20 bg-white'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <Link href='/'>
                <a className='flex'>
                  <img
                    className='h-8 w-auto sm:h-10'
                    src='/images/logo.jpg'
                    alt='logo'
                  />
                  <span className='pl-3 text-2xl font-bold text-primary'>
                    mysite.com
                  </span>
                </a>
              </Link>
            </div>
            <div className='-my-2 -mr-2 md:hidden'>
              {/* <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"> */}
              <Menu.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500'>
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Menu.Button>
              {/* </Popover.Button> */}
            </div>
            <div className='hidden space-x-10 md:flex'>
              {solutions.map(item => (
                <Link href={item.href} key={item.href}>
                  <a className='text-base font-medium text-primary hover:underline hover:text-dark'>
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
              <Link href={auth ? '/profile/edit/primary' : '/sign-in'}>
                <a className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark'>
                  সিভি পাঠান
                </a>
              </Link>
              {auth && (
                <button onClick={handleLogOut}>
                  <LogoutIcon className='h-12 ml-4 text-primary hover:text-dark' />
                </button>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter='duration-200 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden'
          >
            <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='px-5 pt-5 pb-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Link href='/'>
                      <a className='flex'>
                        <img
                          className='h-8 w-auto'
                          src='/images/logo.jpg'
                          alt='Workflow'
                        />
                        <span className='pl-3 text-xl font-bold text-primary'>
                          mysite.com
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className='-mr-2'>
                    <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500'>
                      <span className='sr-only'>Close menu</span>
                      <XIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
                <div className='mt-6'>
                  <Menu.Items className='grid gap-y-8'>
                    {solutions.map(item => (
                      <Menu.Item key={item.href}>
                        {({ active }) => (
                          <button
                            onClick={() => router.push(item.href)}
                            className='text-left font-medium text-primary hover:text-dark'
                          >
                            {item.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </div>
              </div>
              <div className='space-y-6 py-6 px-5'>
                <div>
                  <Link href={auth ? '/profile/edit/primary' : '/sign-in'}>
                    <a className='flex w-full items-center justify-center rounded-md border border-transparent bg-primary  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700'>
                      সিভি পাঠান
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Menu>
    </Popover>
  )
}
