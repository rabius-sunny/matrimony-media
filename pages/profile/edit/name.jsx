import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'

export default function Name() {
  const router = useRouter()
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false
  const handlechange = (e) => {
    console.log(e.target.value)
  }

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <FieldInput
        legend='সম্পূর্ণ নাম'
        handleChange={handlechange}
        description='নাম নেয়া হচ্ছে ভেরিফিকেশনের জন্য, পূর্ণ নাম লিখবেন। আপনার নাম কারো সাথে শেয়ার করা হবে না।'
        placeholder='মোঃ রবিউস সানী'
        required={true}
        name='name'
      />
    </ProfileLayout>
  )
}
