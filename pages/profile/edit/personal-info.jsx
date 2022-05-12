import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'

export default function PersonalInfo() {
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
        legend='প্রতিদিন পাঁচ ওয়াক্ত সালাত পড়া হয়?'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='নিয়মিত কত সময় যাবত সালাত পড়ছেন?'
        handleChange={handlechange}
        description='কয় বছর/মাস যাবত ৫ ওয়াক্ত সালাত শুরু করেছেন?'
        required={true}
        name='name'
      />
      <FieldInput
        legend='মাহরাম/গায়রে-মাহরাম মেনে চলেন কি?'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='শুদ্ধভাবে কুরআন তিলাওয়াত করতে পারেন?'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='কোন মাযহাব অনুসরণ করেন?'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='কোনো রাজনৈতিক দর্শন থাকলে লিখুন'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='নাটক/সিনেমা/সিরিয়াল/গান এসব দেখেন বা শুনেন?'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='মানসিক বা শারীরিক কোনো রোগ আছে কি?'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন?'
        handleChange={handlechange}
        description='যেমনঃ তাবলীগ ইত্যাদি।'
        required={true}
        name='name'
      />
      <FieldInput
        legend='আপনি কি কোনো পীরের মুরিদ?'
        handleChange={handlechange}
        description='হয়ে থাকলে পীরের নাম, ঠিকানা ও মুরিদ হওয়ার কারণ লিখুন।'
        required={true}
        name='name'
        textarea={true}
      />
      <FieldInput
        legend='মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='আপনার পছন্দের অন্তত ৩ টি ইসলামী বইয়ের নাম লিখুন'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন'
        handleChange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='বিশেষ দ্বীনি বা দুনিয়াবি যোগ্যতা (যদি থাকে)'
        handleChange={handlechange}
        name='name'
      />
      <FieldInput
        legend='নিজের সম্পর্কে কিছু লিখুন'
        handleChange={handlechange}
        description='নিজের পছন্দ-অপছন্দ, শখ-ইচ্ছা, দ্বীনী-দুনিয়াবী ইত্যাদি বিষয় বিস্তারিত লিখতে হবে। কারণ এই লেখা পড়ে পাঠক আপনার সম্পর্কে সাধারণ ধারণা লাভ করবে।'
        required={true}
        name='name'
      />
    </ProfileLayout>
  )
}
