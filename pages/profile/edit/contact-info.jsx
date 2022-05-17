import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'

export default function Name() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  const handlechange = e => {
    console.log(e.target.value)
  }

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <FieldInput
        legend='অভিভাবকের নাম্বার'
        handlechange={handlechange}
        description='অবশ্যই ইংরেজীতে নাম্বার লিখবেন এভাবে 01700-000000। বিঃদ্রঃ নিজের নাম্বার দিলে ভেরিফিকেশনে এপ্রুভ হবে না। এই ব্যাপারে আমরা সর্বোচ্চ কঠোর। সব সময় খোলা থাকবে এমন নাম্বার লিখবেন। নাম্বার বন্ধ থাকার আশংকা থাকলে দুইটি নাম্বার লিখতে পারেন।'
        required={true}
        name='name'
      />
      <FieldInput
        legend='যার নাম্বার লিখেছেন'
        handlechange={handlechange}
        description='যে অভিভাবকের নাম্বার দিয়েছেন তার সাথে আপনার সম্পর্ক। এভাবে লিখবেনঃ বাবা '
        required={true}
        name='name'
      />
      <FieldInput
        legend='বায়োডাটা গ্রহণের ই-মেইল এড্রেস'
        handlechange={handlechange}
        description='এই ই-মেইলে অপরপক্ষ বায়োডাটার লিংক পাঠাতে পারে। তাই নির্ভুলভাবে লিখুন। '
        required={true}
        name='name'
      />
    </ProfileLayout>
  )
}
