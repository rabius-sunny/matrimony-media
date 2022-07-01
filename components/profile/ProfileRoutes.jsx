import formRoutes from 'assets/formRoutes'
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
            <Link key={index} href={'/profile/edit' + route.link}>
              <a
                className={`border-2 shadow-sm rounded-md ${
                  activeRoute(route.link)
                    ? 'border-orange-500'
                    : 'border-blue-500'
                } m-2 p-2 ${
                  activeRoute(route.link) ? 'text-orange-500' : 'text-blue-500'
                } `}
              >
                <div className='flex items-center'>
                  <div>{route.name}</div>

                  <div>
                    {route.error ? (
                      <ExclamationCircleIcon className='w-5 text-red-500' />
                    ) : (
                      <CheckCircleIcon className='h-5 w-5 text-green-500' />
                    )}
                  </div>
                </div>
              </a>
            </Link>
          ))}
      </div>
      <div className='h-1 bg-red-500'></div>
    </>
  )
}
