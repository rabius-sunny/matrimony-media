import Link from 'next/link'
import { useAppContext } from 'utils/context'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { usePathname } from 'next/navigation'

export default function ProfileRoutes() {
  const { routes } = useAppContext()
  const pathname = usePathname()
  const activeRoute = (routename) =>
    pathname.split('/edit')[1] === routename ? true : false

  return (
    <>
      <div className='flex flex-wrap items-center'>
        {Object.keys(routes)
          .map((item) => routes[item])
          .map((route, index) => (
            <div
              key={index}
              className={`shadow-md rounded-r-full ${
                activeRoute(route.link)
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-white'
              } m-1 md:text-lg text-sm py-1 px-2`}
            >
              <div className='flex items-center'>
                <Link
                  href={'/profile/edit' + route.link}
                  legacyBehavior
                >
                  {route.name}
                </Link>

                <div className='ml-1'>
                  {route.status === 'done' && (
                    <CheckCircleIcon className='h-5 w-5 text-white' />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className='h-1 bg-primary mt-1'></div>
    </>
  )
}
