import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'

export default function OthersInfo() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const [input, setInput] = useState({
    ex_year: '',
    ex_complexion: '',
    ex_height: '',
    ex_education: '',
    ex_jilla: '',
    ex_marrital_condition: '',
    ex_profession: '',
    ex_financial_condition: '',
    ex_family_condition: '',
    ex_features: ''
  })
  const handlechange = e =>
    setInput({ ...input, [e.target.name]: e.target.value })

  return (
    <ProfileLayout body={input}>
      <ProfileRoutes activeRoute={activeRoute} />
      <FieldInput
        legend='বয়স'
        handlechange={handlechange}
        name='ex_year'
        required
      />
      <FieldInput
        legend='গাত্রবর্ণ'
        handlechange={handlechange}
        name='ex_complexion'
        required
      />
      <FieldInput
        legend='নূন্যতম উচ্চতা'
        handlechange={handlechange}
        name='ex_height'
        required
      />
      <FieldInput
        legend='নূন্যতম শিক্ষাগত যোগ্যতা'
        handlechange={handlechange}
        name='ex_education'
        required
      />
      <FieldInput
        legend='জেলা'
        handlechange={handlechange}
        name='ex_jilla'
        required
      />
      <FieldInput
        legend='বৈবাহিক অবস্থা'
        handlechange={handlechange}
        name='ex_marrital_condition'
        required
      />
      <FieldInput
        legend='পেশা'
        handlechange={handlechange}
        name='ex_profession'
        required
      />
      <FieldInput
        legend='অর্থনৈতিক অবস্থা'
        handlechange={handlechange}
        name='ex_financial_condition'
        required
      />
      <FieldInput
        legend='পারিবারিক অবস্থা'
        handlechange={handlechange}
        name='ex_family_condition'
      />
      <FieldInput
        legend='জীবনসঙ্গীর যে বৈশিষ্ট্য বা গুণাবলি আশা করেন'
        handlechange={handlechange}
        description='এই পয়েন্ট অনেক গুরুত্বপূর্ণ। সময় নিয়ে বিস্তারিত লিখুন। কোন বিশেষ শর্ত থাকলে তা-ও লিখতে পারেন।'
        name='ex_features'
        required
        textarea
      />
    </ProfileLayout>
  )
}
