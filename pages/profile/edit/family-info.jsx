import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import ProfileDrop from 'components/profile/ProfileDrop'
import { _brothers } from 'assets/profileinfo'

export default function Family() {
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
        legend='পিতার নাম (শেয়ার করা হবে না)'
        handlechange={handlechange}
        description='পিতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য। আপনার পিতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে পারবে না।'
        name='profession'
      />
      <FieldInput
        legend='মাতার নাম (শেয়ার করা হবে না)'
        handlechange={handlechange}
        description='মাতার পূর্ণ নাম লিখবেন, নাম নেয়া হচ্ছে শুধু ভেরিফিকেশনের জন্য। আপনার মাতার নাম পাবলিশ করা হবে না এবং কর্তৃপক্ষ ছাড়া আর কেউ দেখতে পারবে না।'
        name='profession'
      />
      <FieldInput
        legend='পিতার পেশা'
        handlechange={handlechange}
        description='মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) ব্যবসায়ী ছিলেন।'
        name='profession'
      />
      <FieldInput
        legend='মাতার পেশা'
        handlechange={handlechange}
        description='মৃত হলে প্রথমে (মৃত) লেখার পর পেশা লিখবেন। যেমনঃ (মৃত) গৃহিণী ছিলেন।'
        name='profession'
      />
      <ProfileDrop
        legend='ভাই কয়জন?'
        required={true}
        data={['ভাই নেই', ..._brothers]}
      />
      <FieldInput
        legend='ভাইদের সম্পর্কে তথ্য'
        handlechange={handlechange}
        description='সকল ভাইদের শিক্ষাগত যোগ্যতা, বৈবাহিক অবস্থা, পেশা, বর্তমান অবস্থান লিখুন। একাধিক ভাই থাকলে কমা দিয়ে নিচের লাইনে এসে লিখবেন।'
        name='profession'
        textarea={true}
      />
      <ProfileDrop
        legend='বোন কয়জন?'
        required={true}
        data={['বোন নেই', ..._brothers]}
      />
      <FieldInput
        legend='বোনদের সম্পর্কে তথ্য'
        handlechange={handlechange}
        description='সকল বোনদের শিক্ষাগত যোগ্যতা, বৈবাহিক অবস্থা, পেশা, বিবাহিত হলে স্বামীর পেশা লিখুন। একাধিক বোন থাকলে কমা দিয়ে নিচের লাইনে এসে লিখবেন।'
        name='profession'
        textarea={true}
      />
      <FieldInput
        legend='চাচা-মামাদের পেশা'
        handlechange={handlechange}
        description='জানাতে অনিচ্ছুক হলে ফাঁকা রাখুন।'
        name='profession'
        textarea={true}
      />
      <FieldInput
        legend='পরিবারের অর্থনৈতিক ও সামাজিক অবস্থা'
        handlechange={handlechange}
        description='সংক্ষেপে বর্ণনা করুন।'
        name='profession'
        textarea={true}
      />
    </ProfileLayout>
  )
}
