import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'

export default function MarriageRelated() {
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
        legend='অভিভাবক আপনার বিয়েতে রাজি কি না?'
        handlechange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='বিয়ে কেন করছেন? বিয়ে সম্পর্কে আপনার ধারণা কি?'
        handlechange={handlechange}
        description='সংক্ষেপে বর্ণনা করুন।'
        required={true}
        name='name'
      />
    </ProfileLayout>
  )
}
