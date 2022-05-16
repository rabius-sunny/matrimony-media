import ProfileLayout from 'components/profile/ProfileLayout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import { _type } from 'assets/profileinfo'
import DropdownProfile from 'components/profile/DropdownProfile'
import Cmodal from 'components/shared/Cmodal'

export default function Name() {
  const [name, setName] = useState('')
  const [type, setType] = useState(_type[0])
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  const handlechange = e => {
    setName(e.target.value)
  }
  const warning = () => (name.toString().length < 1 ? true : false)

  return (
    <ProfileLayout body={{ name, type }} warning={warning}>
      <ProfileRoutes activeRoute={activeRoute} />
      <FieldInput
        legend='সম্পূর্ণ নাম'
        handlechange={handlechange}
        description='নাম নেয়া হচ্ছে ভেরিফিকেশনের জন্য, পূর্ণ নাম লিখবেন। আপনার নাম কারো সাথে শেয়ার করা হবে না।'
        placeholder='মোঃ রবিউস সানী'
        required={true}
        name='name'
      />
      <DropdownProfile
        legend='বায়োডাটার ধরন'
        selected={type}
        setSelected={setType}
        data={_type}
      />
    </ProfileLayout>
  )
}
