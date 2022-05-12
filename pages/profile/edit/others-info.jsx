import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'

export default function OthersInfo() {
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
        legend='বিশেষ কিছু যদি জানাতে চান'
        handleChange={handlechange}
        description='আপনার কোনো শর্ত বা উপরে লিখার সুযোগ হয় নি এমন কিছু জানানোর থাকলে এই ঘরে লিখতে পারেন। যেমনঃ ছাত্র অবস্থায় বিয়ে করলে কিভাবে ভরণপোষণ করবেন বা সংসার চালাবেন, পারিবারিক বা ব্যক্তিগত কোনো সুবিধা বা অসুবিধা ইত্যাদি যে কোনো বিষয়ে যত ইচ্ছা লিখতে পারবেন। । যদি কিছুই না লিখতে চান, তাহলে ঘরটি ফাঁকা রাখবেন।'
        name='name'
        textarea={true}
      />
    </ProfileLayout>
  )
}
