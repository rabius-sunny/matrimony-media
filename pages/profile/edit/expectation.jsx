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
        legend='বয়স'
        handleChange={handlechange}
        name='name'
        required={true}
      />
      <FieldInput
        legend='গাত্রবর্ণ'
        handleChange={handlechange}
        name='name'
        required={true}
      />
      <FieldInput
        legend='নূন্যতম উচ্চতা'
        handleChange={handlechange}
        name='name'
        required={true}
      />
      <FieldInput
        legend='নূন্যতম শিক্ষাগত যোগ্যতা'
        handleChange={handlechange}
        name='name'
        required={true}
      />
      <FieldInput
        legend='জেলা'
        handleChange={handlechange}
        name='name'
        required={true}
      />
      <FieldInput
        legend='বৈবাহিক অবস্থা'
        handleChange={handlechange}
        name='name'
        required={true}
      />
      <FieldInput
        legend='পেশা'
        handleChange={handlechange}
        name='name'
        required={true}
      />
      <FieldInput
        legend='অর্থনৈতিক অবস্থা'
        handleChange={handlechange}
        name='name'
        required={true}
      />
      <FieldInput
        legend='পারিবারিক অবস্থা'
        handleChange={handlechange}
        name='name'
      />
      <FieldInput
        legend='জীবনসঙ্গীর যে বৈশিষ্ট্য বা গুণাবলি আশা করেন'
        handleChange={handlechange}
        description='এই পয়েন্ট অনেক গুরুত্বপূর্ণ। সময় নিয়ে বিস্তারিত লিখুন। কোন বিশেষ শর্ত থাকলে তা-ও লিখতে পারেন।'
        name='name'
        required={true}
        textarea={true}
      />
    </ProfileLayout>
  )
}
