import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { usePathname } from 'next/navigation'
import formRoutes from 'assets/formRoutes'

export default function ProfileRoutes({ filled }) {
  const pathname = usePathname()
  const activeRoute = (routename) =>
    pathname.split('/edit')[1] === routename ? true : false

  return (
    <>
      <div className='flex flex-wrap items-center'>
        {formRoutes.map((route, index) => (
          <div
            key={index}
            className={`shadow-md rounded-r-full ${
              activeRoute(route.link)
                ? 'bg-primary text-white'
                : 'bg-secondary text-white'
            } m-1 text-xs md:text-sm lg:text-lg py-1 px-2`}
          >
            <div className='flex items-center'>
              <Link
                href={'/profile/edit' + route.link}
                legacyBehavior
              >
                {route.name}
              </Link>

              <div className='ml-1'>
                {route.link.includes(
                  filled?.find((item) => route.link.includes(item))
                ) && <CheckCircleIcon className='h-5 w-5 text-white' />}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='h-1 bg-primary mt-1'></div>
    </>
  )
}
