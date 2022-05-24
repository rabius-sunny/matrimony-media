import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import userRequest from 'services/userRequest'

export default function PersonalInfo() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const [input, setInput] = useState({
    beard: '',
    dress_over_ankle: '',
    dress: '',
    salat: '',
    salat_duration: '',
    maintain_mahram: '',
    can_tilawat: '',
    mazhab: '',
    political_view: '',
    drama_cinnema: '',
    disease: '',
    deeni_effort: '',
    murid_of_peer: '',
    majar_view: '',
    favorite_books: '',
    favorite_scholars: '',
    special_qualifications: '',
    about_me: ''
  })
  const [type, setType] = useState('')
  const handlechange = e =>
    setInput({ ...input, [e.target.name]: e.target.value })

  useEffect(() => {
    userRequest
      .getType()
      .then(data => setType(data.type))
      .catch(err => console.log(err))
  }, [])

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      {type && type === 'পাত্রের বায়োডাটা' && (
        <div>
          <FieldInput
            legend='সুন্নতি দাঁড়ি আছে কি?'
            handlechange={handlechange}
            required={true}
            name='beard'
          />
          <FieldInput
            legend='কাপড় পায়ের টাখনুর পড়েন?'
            handlechange={handlechange}
            required={true}
            name='dress_over_ankle'
          />
          <FieldInput
            legend='ঘরের বাইরে সাধারণত কী ধরণের পোশাক পড়েন?'
            handlechange={handlechange}
            required={true}
            name='dress'
            description='এভাবে উত্তর দিতে পারেনঃ- "সাদা পাঞ্জবী সাথে সাদা টুপি" বা "জিন্স প্যান্ট সাথে শার্ট" '
          />
        </div>
      )}
      {type && type === 'পাত্রীর বায়োডাটা' && (
        <FieldInput
          legend='ঘরের বাইরে সাধারণত কী ধরণের পোশাক পড়েন?'
          handlechange={handlechange}
          required={true}
          name='dress'
          description='উত্তর যেভাবে দিতে পারেনঃ- "কালো বোরকা ও হিজাব পরি কিন্ত নিকাব পরি না" বা " কালো বোরকা ও নিকাব পরি কিন্ত হাত-পা মোজা পরি না"। এভাবে নিজের মত করে আপনার পোষাকের বিবরণ দিবেন। যেন পাঠক আপনার পর্দার ব্যাপারে নূন্যতম ধারণা করতে পারেন।'
        />
      )}
      <FieldInput
        legend='প্রতিদিন পাঁচ ওয়াক্ত সালাত পড়া হয়?'
        handlechange={handlechange}
        required={true}
        name='salat'
      />
      <FieldInput
        legend='নিয়মিত কত সময় যাবত সালাত পড়ছেন?'
        handlechange={handlechange}
        description='কয় বছর/মাস যাবত ৫ ওয়াক্ত সালাত শুরু করেছেন?'
        required={true}
        name='salat_duration'
      />
      <FieldInput
        legend='মাহরাম/গায়রে-মাহরাম মেনে চলেন কি?'
        handlechange={handlechange}
        required={true}
        name='maintain_mahram'
      />
      <FieldInput
        legend='শুদ্ধভাবে কুরআন তিলাওয়াত করতে পারেন?'
        handlechange={handlechange}
        required={true}
        name='can_tilawat'
      />
      <FieldInput
        legend='কোন মাযহাব অনুসরণ করেন?'
        handlechange={handlechange}
        required={true}
        name='mazhab'
      />
      <FieldInput
        legend='কোনো রাজনৈতিক দর্শন থাকলে লিখুন'
        handlechange={handlechange}
        required={true}
        name='political_view'
      />
      <FieldInput
        legend='নাটক/সিনেমা/সিরিয়াল/গান এসব দেখেন বা শুনেন?'
        handlechange={handlechange}
        required={true}
        name='drama_cinnema'
      />
      <FieldInput
        legend='মানসিক বা শারীরিক কোনো রোগ আছে কি?'
        handlechange={handlechange}
        required={true}
        name='disease'
      />
      <FieldInput
        legend='দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন?'
        handlechange={handlechange}
        description='যেমনঃ তাবলীগ ইত্যাদি।'
        required={true}
        name='deeni_effort'
      />
      <FieldInput
        legend='আপনি কি কোনো পীরের মুরিদ?'
        handlechange={handlechange}
        description='হয়ে থাকলে পীরের নাম, ঠিকানা ও মুরিদ হওয়ার কারণ লিখুন।'
        required={true}
        name='murid_of_peer'
        textarea={true}
      />
      <FieldInput
        legend='মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?'
        handlechange={handlechange}
        required={true}
        name='majar_view'
      />
      <FieldInput
        legend='আপনার পছন্দের অন্তত ৩ টি ইসলামী বইয়ের নাম লিখুন'
        handlechange={handlechange}
        required={true}
        name='favorite_books'
      />
      <FieldInput
        legend='আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন'
        handlechange={handlechange}
        required={true}
        name='favorite_scholars'
      />
      <FieldInput
        legend='বিশেষ দ্বীনি বা দুনিয়াবি যোগ্যতা (যদি থাকে)'
        handlechange={handlechange}
        name='special_qualifications'
      />
      <FieldInput
        legend='নিজের সম্পর্কে কিছু লিখুন'
        handlechange={handlechange}
        description='নিজের পছন্দ-অপছন্দ, শখ-ইচ্ছা, দ্বীনী-দুনিয়াবী ইত্যাদি বিষয় বিস্তারিত লিখতে হবে। কারণ এই লেখা পড়ে পাঠক আপনার সম্পর্কে সাধারণ ধারণা লাভ করবে।'
        required={true}
        name='about_me'
        textarea={true}
      />
    </ProfileLayout>
  )
}
