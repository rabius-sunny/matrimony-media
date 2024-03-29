import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAuth from 'hooks/useAuth'
import { LogoutIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { addBookmark } from 'services/state/dataSlice'

const links = [
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
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useAuth()

  const _reload = (_) => window.location.reload()

  const handleLogOut = (_) => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    dispatch(addBookmark(null))
    if (router.pathname === '/') _reload()
    router.push('/')
  }

  return (
    <Popover className='relative z-20 bg-white'>
      <Menu
        as='div'
        className='relative z-20 bg-white'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='flex items-center justify-between border-b-2 border-gray-100 py-6'>
            <div className='lg:w-0 lg:flex-1'>
              <Link
                href='/'
                legacyBehavior
              >
                <img
                  className='h-8 w-auto sm:h-10'
                  src='/images/logo.png'
                  alt='logo'
                />
              </Link>
            </div>
            <div className='-my-2 -mr-2 lg:hidden'>
              <Menu.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary'>
                <span className='sr-only'>Open menu</span>
                <MenuIcon
                  className='h-6 w-6'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>
            <div className='hidden space-x-10 lg:flex'>
              {links.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  legacyBehavior
                >
                  <a className='text-base font-medium text-primary hover:underline hover:text-secondary'>
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <div className='hidden items-center justify-end lg:flex lg:flex-1 lg:w-0'>
              <Link
                legacyBehavior
                href={auth ? '/profile/edit/primary' : '/sign-in'}
              >
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
                    <Link
                      legacyBehavior
                      href='/'
                    >
                      <a>
                        <img
                          className='h-8 w-auto'
                          src='/images/logo.png'
                          alt='Workflow'
                        />
                      </a>
                    </Link>
                  </div>
                  <div className='-mr-2'>
                    <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary'>
                      <span className='sr-only'>Close menu</span>
                      <XIcon
                        className='h-6 w-6'
                        aria-hidden='true'
                      />
                    </Popover.Button>
                  </div>
                </div>
                <div className='mt-6'>
                  <Menu.Items className='grid gap-y-8'>
                    {links.map((item) => (
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
                    <Menu.Item>
                      {({ active }) =>
                        auth ? (
                          <button onClick={handleLogOut}>
                            <LogoutIcon className='h-8 text-primary text-center hover:text-dark' />
                          </button>
                        ) : (
                          <div></div>
                        )
                      }
                    </Menu.Item>
                  </Menu.Items>
                </div>
              </div>
              <div className='space-y-6 py-6 px-5'>
                <div>
                  <Link
                    legacyBehavior
                    href={auth ? '/profile/edit/primary' : '/sign-in'}
                  >
                    <a className='flex w-full items-center justify-center rounded-md border border-transparent bg-primary  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark'>
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
