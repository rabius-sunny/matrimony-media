import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useRouter } from 'next/router'
import React from 'react'

export default function GeneralInfo() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <h1 className='text-3xl text-red-500'>General Info</h1>
    </ProfileLayout>
  )
}
