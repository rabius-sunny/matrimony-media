import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import { useRouter } from 'next/router'
import {
  _type,
  _condition,
  _address_jilla,
  _address_division,
  _birthYear,
  _complexion,
  _height,
  _weight,
  _bloodGroup
} from 'assets/profileinfo'
import ProfileDrop from 'components/profile/ProfileDrop'
import FieldInput from 'components/profile/FieldInput'

export default function GeneralInfo() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const handlechange = e => {}
  return (
    <ProfileLayout body={router.route}>
      <ProfileRoutes activeRoute={activeRoute} />
      <ProfileDrop legend='বৈবাহিক অবস্থা' data={_condition} />
      <ProfileDrop legend='স্থায়ী ঠিকানা' data={_address_jilla} />
      <ProfileDrop legend='বিভাগ' data={_address_division} />
      <ProfileDrop legend='বর্তমান ঠিকানা' data={_address_jilla} />
      <ProfileDrop legend='বিভাগ' data={_address_division} />
      <ProfileDrop legend='জন্মসন (আসল)' data={_birthYear} />
      <ProfileDrop legend='গাত্রবর্ণ' data={_complexion} />
      <ProfileDrop legend='উচ্চতা' data={_height} />
      <ProfileDrop legend='ওজন' data={_weight} />
      <ProfileDrop legend='রক্তের গ্রুপ' data={_bloodGroup} />
      <FieldInput
        legend='পেশা'
        handlechange={handlechange}
        description='সর্বোচ্চ ৩ শব্দে শুধু পদবী লিখবেন। পেশা সম্পর্কে বিস্তারিত লিখার জন্য সামনে প্রশ্ন আসছে।'
        placeholder='সফটওয়্যার ইঞ্জিনিয়ার'
        required={true}
        name='profession'
      />
      <FieldInput
        legend='মাসিক আয়'
        handlechange={handlechange}
        description='জানাতে অনিচ্ছুক হলে ঘরটি ফাঁকা রাখুন।'
        placeholder='৩০ হাজার'
        name='income'
      />
    </ProfileLayout>
  )
}
