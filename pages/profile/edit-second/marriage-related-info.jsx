import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import userRequest from 'services/userRequest'

export default function MarriageRelated() {
  const router = useRouter()
  const [type, setType] = useState('')
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  const handlechange = e => {
    console.log(e.target.value)
  }

  useEffect(() => {
    userRequest
      .getType()
      .then(data => setType(data.type))
      .catch(err => console.log(err))
  }, [])

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <FieldInput
        legend='অভিভাবক আপনার বিয়েতে রাজি কি না?'
        handlechange={handlechange}
        required={true}
        name='name'
      />
      <FieldInput
        legend='বিয়ে কেন করছেন? বিয়ে সম্পর্কে আপনার ধারণা কি?'
        handlechange={handlechange}
        description='সংক্ষেপে বর্ণনা করুন।'
        required
        textarea
        name='name'
      />

      {type && type === 'পাত্রের বায়োডাটা' && (
        <div>
          <FieldInput
            legend='বিয়ের পর স্ত্রীকে নিয়ে আপনার পরিকল্পনা বিস্তারিত লিখুন'
            handlechange={handlechange}
            textarea
            required
            description='বিয়ের পর স্ত্রীর পর্দার ব্যবস্থা, পড়াশোনা এবং চাকরী করতে দিবেন কিনা, স্ত্রীকে নিয়ে কোথায় থাকবেন ইত্যাদি স্পষ্ট লিখুন'
            name='name'
          />
          <FieldInput
            legend='আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক/উপহার/অর্থ আশা করবেন কিনা?'
            handlechange={handlechange}
            required={true}
            name='name'
            textarea
          />
        </div>
      )}

      {type && type === 'পাত্রীর বায়োডাটা' && (
        <div>
          <FieldInput
            legend='আপনি কি বিয়ের পর চাকরি করতে ইচ্ছুক?'
            description='চাকরীজীবী হলে বিয়ের পর চাকরি চালিয়ে যেতে চান কিনা লিখুন।'
            handlechange={handlechange}
            name='name'
          />
          <FieldInput
            legend='আপনি কি বিয়ের পর পড়াশোনা করতে ইচ্ছুক?'
            description='ছাত্রী হলে বিয়ের পর পড়াশোনা চালিয়ে যেতে চান কিনা লিখুন।'
            handlechange={handlechange}
            name='name'
          />
        </div>
      )}
    </ProfileLayout>
  )
}
