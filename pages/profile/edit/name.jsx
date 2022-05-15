import ProfileLayout from 'components/profile/ProfileLayout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import ProfileDrop from 'components/profile/ProfileDrop'
import { _type } from 'assets/profileinfo'

export default function Name() {
  const [input, setInput] = useState('')
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  const handlechange = e => {
    setInput(e.target.value)
  }

  return (
    <ProfileLayout body={input}>
      <ProfileRoutes activeRoute={activeRoute} />
      <FieldInput
        legend='সম্পূর্ণ নাম'
        handlechange={handlechange}
        description='নাম নেয়া হচ্ছে ভেরিফিকেশনের জন্য, পূর্ণ নাম লিখবেন। আপনার নাম কারো সাথে শেয়ার করা হবে না।'
        placeholder='মোঃ রবিউস সানী'
        required={true}
        name='name'
      />
      <ProfileDrop legend='বায়োডাটার ধরন' data={_type} />
    </ProfileLayout>
  )
}
