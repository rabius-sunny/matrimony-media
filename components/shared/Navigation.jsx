import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
    MenuIcon,
    XIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const solutions = [
    {
        name: 'ফেভারিট',
        href: '/favorite',
    },
    {
        name: 'প্রশ্নোত্তর',
        href: '/qa',
    },
    {
        name: 'আমাদের সম্পর্কে',
        href: '/about-us',
    },
    {
        name: 'যোগাযোগ',
        href: '/contact-us',
    }
]

export default function Navigation() {

    const router = useRouter()

    return (
        <Popover className="relative bg-white z-20">
            <Menu as="div" className="relative bg-white z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <Link href="/">
                                <a className='flex'>
                                    <img
                                        className="h-8 w-auto sm:h-10"
                                        src="/images/logo.jpg"
                                        alt="logo"
                                    />
                                    <span className="text-red-400 font-bold text-2xl pl-3">mysite.com</span>
                                </a>
                            </Link>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            {/* <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"> */}
                            <Menu.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Menu.Button>
                            {/* </Popover.Button> */}
                        </div>
                        <div className="hidden md:flex space-x-10">
                            {
                                solutions.map(item => <Link href={item.href} key={item.href}>
                                    <a className="text-base font-medium text-red-500 hover:text-red-400">{item.name}</a>
                                </Link>)
                            }
                        </div>
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            <a
                                href="/"
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                                সিভি পাঠান
                            </a>
                        </div>
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Link href="/">
                                            <a className='flex'>
                                                <img
                                                    className="h-8 w-auto"
                                                    src="/images/logo.jpg"
                                                    alt="Workflow"
                                                />
                                                <span className="text-red-400 font-bold text-xl pl-3">mysite.com</span>
                                            </a>
                                        </Link>

                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Menu.Items className="grid gap-y-8">
                                        {
                                            solutions.map(item => <Menu.Item key={item.href}>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => router.push(item.href)}
                                                        className='text-left font-medium text-red-500 hover:text-red-400'>
                                                        {item.name}
                                                    </button>)
                                                }
                                            </Menu.Item>
                                            )
                                        }
                                    </Menu.Items>

                                </div>
                            </div>
                            <div className="py-6 px-5 space-y-6">
                                <div>
                                    <a
                                        href="/"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
                                    >
                                        সিভি পাঠান
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Menu>
        </Popover >
    )
}
