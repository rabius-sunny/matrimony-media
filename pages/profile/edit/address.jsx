import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { formRoutes } from 'assets/fakedata'

export default function Address() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  return (
    <div className='container my-8'>
      <div className='flex flex-wrap items-center'>
        {formRoutes.map((route, index) => (
          <Link key={index} href={'/profile/edit' + route.link}>
            <a
              className={`${
                activeRoute(route.link) ? 'bg-orange-500' : 'bg-blue-500'
              } m-2 p-2 text-white`}>
              {route.name}
            </a>
          </Link>
        ))}
      </div>
      <h1 className='text-3xl text-red-500'>Address</h1>
    </div>
  )
}
