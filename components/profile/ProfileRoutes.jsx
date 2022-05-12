import { formRoutes } from 'assets/fakedata'
import Link from 'next/link'

export default function ProfileRoutes({ activeRoute }) {
  return (
    <>
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
      <div className='mb-4 h-1 bg-red-500'></div>
    </>
  )
}
