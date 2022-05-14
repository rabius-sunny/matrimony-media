import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import ProfileDrop from 'components/profile/ProfileDrop'

export default function Education() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const handlechange = e => {
    console.log(e.target.value)
  }

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <ProfileDrop
        legend='কোন মাধ্যমে পড়াশোনা করেছেন?'
        data={['মাদ্রাসা', 'জেনারেল']}
      />
      <ProfileDrop
        legend='মাধ্যমিক (SSC) / সমমান পাশ করেছেন?'
        data={['হ্যা', 'না']}
      />
      <ProfileDrop legend='আপনি কি হাফেজ?' data={['হ্যা', 'না']} />
      <ProfileDrop legend='দাওরায়ে হাদীস পাশ করেছেন?' data={['হ্যা', 'না']} />
      <FieldInput
        legend='সর্বোচ্চ শিক্ষাগত যোগ্যতা'
        handlechange={handlechange}
        description='শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত লিখবেন।'
        name='profession'
        textarea={true}
      />
      <FieldInput
        legend='অন্যান্য শিক্ষাগত যোগ্যতা'
        handlechange={handlechange}
        description='শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত লিখবেন। কিছু না থাকলে ফাঁকা রাখবেন।'
        name='profession'
        textarea={true}
      />
    </ProfileLayout>
  )
}
