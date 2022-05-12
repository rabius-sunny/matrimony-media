import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import ProfileDrop from 'components/profile/ProfileDrop'

export default function AuthorityQuestion() {
  const router = useRouter()
  const activeRoute = (routename) =>
    router.route.split('/edit')[1] === routename ? true : false
  const handlechange = (e) => {
    console.log(e.target.value)
  }

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <ProfileDrop
        legend='এই ওয়েবসাইটে বায়োডাটা জমা দিচ্ছেন তা অভিভাবক জানেন?'
        data={['হ্যা', 'না']}
        required={true}
      />
      <ProfileDrop
        legend="আল্লাহ'র শপথ করে সাক্ষ্য দিন, যে তথ্যগুলো দিচ্ছেন সব সত্য?"
        data={['হ্যা', 'না']}
        required={true}
      />
      <ProfileDrop
        legend='কোনো মিথ্যা তথ্য দিয়ে থাকলে তার দুনিয়াবী ও আখিরাতের দায়ভার ওয়েবসাইট কর্তৃপক্ষ নিবে না। আপনি কি রাজি?'
        data={['হ্যা', 'না']}
        required={true}
      />
    </ProfileLayout>
  )
}
