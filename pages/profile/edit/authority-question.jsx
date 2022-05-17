import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import DropdownProfile from 'components/profile/DropdownProfile'

export default function AuthorityQuestion() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  const [family_about_bio, setFamily_about_bio] = useState(yesno[0])
  const [is_correct_info, setIs_correct_info] = useState(yesno[0])
  const [liability, setLiability] = useState(yesno[0])

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <DropdownProfile
        legend='এই ওয়েবসাইটে বায়োডাটা জমা দিচ্ছেন তা অভিভাবক জানেন?'
        data={yesno}
        selected={family_about_bio}
        setSelected={setFamily_about_bio}
        required
      />
      <DropdownProfile
        legend="আল্লাহ'র শপথ করে সাক্ষ্য দিন, যে তথ্যগুলো দিচ্ছেন সব সত্য?"
        data={yesno}
        selected={is_correct_info}
        setSelected={setIs_correct_info}
        required
      />
      <DropdownProfile
        legend='কোনো মিথ্যা তথ্য দিয়ে থাকলে তার দুনিয়াবী ও আখিরাতের দায়ভার ওয়েবসাইট কর্তৃপক্ষ নিবে না। আপনি কি রাজি?'
        data={yesno}
        selected={liability}
        setSelected={setLiability}
        required
      />
    </ProfileLayout>
  )
}
const yesno = ['হ্যা', 'না']
