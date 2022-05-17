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
import { useState } from 'react'
import DropdownProfile from 'components/profile/DropdownProfile'
import SearchDropdownProfile from 'components/profile/SearchDropdownProfile'

export default function GeneralInfo() {
  const router = useRouter()
  const [input, setInput] = useState({
    profession: '',
    income: ''
  })

  const [condition, setCondition] = useState(_condition[0])
  const [permanent_jilla, setPermanent_jilla] = useState(_address_jilla[0])
  const [permanent_division, setPermanent_Division] = useState(
    _address_division[0]
  )
  const [current_jilla, setCurrent_Jilla] = useState(_address_jilla[0])
  const [current_division, setCurrent_Division] = useState(_address_division[0])
  const [birth, setBirth] = useState(_birthYear[0])
  const [complexion, setComplextion] = useState(_complexion[0])
  const [height, setHeight] = useState(_height[0])
  const [weight, setWeight] = useState(_weight[0])
  const [blood, setBlood] = useState(_bloodGroup[0])

  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const handlechange = e =>
    setInput({ ...input, [e.target.name]: e.target.value })
  const warning = () => (input.profession.toString().length < 1 ? true : false)

  return (
    <>
      <ProfileLayout
        body={{
          ...input,
          condition,
          permanent_jilla,
          permanent_division,
          current_jilla,
          current_division,
          birth,
          complexion,
          height,
          weight,
          blood
        }}
        warning={warning()}
      >
        <ProfileRoutes activeRoute={activeRoute} />
        <DropdownProfile
          selected={condition}
          setSelected={setCondition}
          legend='বৈবাহিক অবস্থা'
          data={_condition}
        />
        <SearchDropdownProfile
          selected={permanent_jilla}
          setSelected={setPermanent_jilla}
          legend='স্থায়ী ঠিকানা'
          data={_address_jilla}
        />
        <DropdownProfile
          selected={permanent_division}
          setSelected={setPermanent_Division}
          legend='বিভাগ'
          data={_address_division}
        />
        <DropdownProfile
          selected={current_jilla}
          setSelected={setCurrent_Jilla}
          legend='বর্তমান ঠিকানা'
          data={_address_jilla}
        />
        <DropdownProfile
          selected={current_division}
          setSelected={setCurrent_Division}
          legend='বিভাগ'
          data={_address_division}
        />
        <DropdownProfile
          selected={birth}
          setSelected={setBirth}
          legend='জন্মসন (আসল)'
          data={_birthYear}
        />
        <DropdownProfile
          selected={complexion}
          setSelected={setComplextion}
          legend='গাত্রবর্ণ'
          data={_complexion}
        />
        <DropdownProfile
          selected={height}
          setSelected={setHeight}
          legend='উচ্চতা'
          data={_height}
        />
        <DropdownProfile
          selected={weight}
          setSelected={setWeight}
          legend='ওজন'
          data={_weight}
        />
        <DropdownProfile
          selected={blood}
          setSelected={setBlood}
          legend='রক্তের গ্রুপ'
          data={_bloodGroup}
        />
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
    </>
  )
}
