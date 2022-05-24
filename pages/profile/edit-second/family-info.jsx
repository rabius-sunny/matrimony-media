import ProfileLayout from 'components/profile/ProfileLayout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import { _brothers } from 'assets/profileinfo'
import DropdownProfile from 'components/profile/DropdownProfile'

export default function Family() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const [input, setInput] = useState({
    father_name: '',
    mother_name: '',
    father_profession: '',
    mother_profession: '',
    brother_info: '',
    sisters_info: '',
    uncles_profession: '',
    family_status: ''
  })
  const [brothers, setBrothers] = useState(newBrothers[0])
  const [sisters, setSisters] = useState(newSisters[0])

  const handlechange = e =>
    setInput({ ...input, [e.target.name]: e.target.value })

  const warning = () =>
    input.father_name.toString().length < 1 ||
    input.mother_name.toString().length < 1 ||
    input.father_profession.toString().length < 1 ||
    input.mother_profession.toString().length < 1 ||
    input.family_status.toString().length < 1
      ? true
      : false

  return (
    <ProfileLayout body={{ ...input, brothers, sisters }} warning={warning()}>
      <ProfileRoutes activeRoute={activeRoute} />
      <FieldInput
        legend='পিতার নাম (শেয়ার করা হবে না)'
        handlechange={handlechange}
        description='পিতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য। আপনার পিতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে পারবে না।'
        name='father_name'
        required
      />
      <FieldInput
        legend='মাতার নাম (শেয়ার করা হবে না)'
        handlechange={handlechange}
        description='মাতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য। আপনার মাতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে পারবে না।'
        name='mother_name'
        required
      />
      <FieldInput
        legend='পিতার পেশা'
        handlechange={handlechange}
        description='মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) ব্যবসায়ী ছিলেন।'
        name='father_profession'
        required
      />
      <FieldInput
        legend='মাতার পেশা'
        handlechange={handlechange}
        description='মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) গৃহিণী ছিলেন।'
        name='mother_profession'
        required
      />
      <DropdownProfile
        selected={brothers}
        setSelected={setBrothers}
        legend='ভাই কয়জন?'
        required
        data={newBrothers}
      />
      {newBrothers.indexOf(brothers) > 0 && (
        <FieldInput
          legend='ভাইদের সম্পর্কে তথ্য'
          handlechange={handlechange}
          description='সকল ভাইদের শিক্ষাগত যোগ্যতা, বৈবাহিক অবস্থা, পেশা, বর্তমান অবস্থান লিখুন। একাধিক ভাই থাকলে কমা দিয়ে নিচের লাইনে এসে লিখবেন।'
          name='brother_info'
          textarea={true}
        />
      )}
      <DropdownProfile
        selected={sisters}
        setSelected={setSisters}
        legend='বোন কয়জন?'
        required
        data={newSisters}
      />
      {newSisters.indexOf(sisters) > 0 && (
        <FieldInput
          legend='বোনদের সম্পর্কে তথ্য'
          handlechange={handlechange}
          description='সকল বোনদের শিক্ষাগত যোগ্যতা, বৈবাহিক অবস্থা, পেশা, বিবাহিত হলে স্বামীর পেশা লিখুন। একাধিক বোন থাকলে কমা দিয়ে নিচের লাইনে এসে লিখবেন।'
          name='sisters_info'
          textarea={true}
        />
      )}
      <FieldInput
        legend='চাচা-মামাদের পেশা'
        handlechange={handlechange}
        description='জানাতে অনিচ্ছুক হলে ফাঁকা রাখুন।'
        name='uncles_profession'
        textarea={true}
      />
      <FieldInput
        legend='পরিবারের অর্থনৈতিক ও সামাজিক অবস্থা'
        required
        handlechange={handlechange}
        description='সংক্ষেপে বর্ণনা করুন।'
        name='family_status'
        textarea={true}
      />
    </ProfileLayout>
  )
}
const newBrothers = ['ভাই নেই', ..._brothers]
const newSisters = ['বোন নেই', ..._brothers]
