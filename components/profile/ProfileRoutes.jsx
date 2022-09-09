import Link from 'next/link'
import { useAppContext } from 'utils/context'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

export default function ProfileRoutes({ activeRoute }) {
  const { routes } = useAppContext()

  return (
    <>
      <div className='flex flex-wrap items-center'>
        {Object.keys(routes)
          .map(item => routes[item])
          .map((route, index) => (
            // <Link key={index} href={'/profile/edit' + route.link}>
            <div
              key={index}
              className={`border-2 shadow-sm rounded-md ${
                activeRoute(route.link)
                  ? 'bg-[#f9731657] text-orange-500'
                  : 'bg-[#3b82f638] text-blue-500'
              } m-2 p-2`}
            >
              <div className='flex items-center'>
                <Link href={'/profile/edit' + route.link}>{route.name}</Link>

                <div className=' ml-1'>
                  {
                    route.status === 'done' && (
                      // <ExclamationCircleIcon className='w-5 text-red-500' />
                      <CheckCircleIcon className='h-5 w-5 text-green-500' />
                    ) /* : (
                    <CheckCircleIcon className='h-5 w-5 text-green-500' />
                  ) */
                  }
                </div>
              </div>
            </div>
            // </Link>
          ))}
      </div>
      <div className='h-1 bg-red-500'></div>
    </>
  )
}
