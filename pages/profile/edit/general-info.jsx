import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { formRoutes } from '../../../assets/fakedata'

export default function GeneralInfo() {
  const router = useRouter()
  const activeRoute = routename => router.route.split('/edit')[1] === routename ? true : false
  return <div className='container my-8'>
  <div className="flex items-center flex-wrap">
    {
      formRoutes.map((route, index) => <Link key={index} href={'/profile/edit' + route.link}>
        <a className={`${activeRoute(route.link) ? 'bg-orange-500' : 'bg-blue-500'} p-2 text-white m-2`}>
          {route.name}
        </a>
      </Link>)
    }
  </div>
  <h1 className='text-red-500 text-3xl'>General Info</h1>

</div>
}
