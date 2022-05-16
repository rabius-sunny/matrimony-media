import ProfileLayout from 'components/profile/ProfileLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import ProfileDrop from 'components/profile/ProfileDrop'
import DropdownProfile from 'components/profile/DropdownProfile'

export default function Education() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false

  const handlechange = e => {
    console.log(e.target.value)
  }

  const [education, setEducation] = useState(educationType[0])
  const [secondary, setSecondary] = useState(yesno[0])
  const [classes, setClasses] = useState(_classes[0])
  const [secondary_details, setSecondary_details] = useState('')
  const [heigher_details, setHigher_details] = useState('')
  const [higher_year, setHigher_year] = useState(higherType[0])
  const [honors_details, setHonors_details] = useState('')
  const [diploma_details, setDiploma_details] = useState('')
  const [higher, setHigher] = useState(yesno_heigher[0])

  const [hafej, setHafej] = useState(yesno[1])
  const [dawra, setDawra] = useState(yesno_dawra[0])
  const [dawra_details, setdawra_details] = useState('')
  const [dawra_year, setdawra_year] = useState('')
  const [takhassus, setTakhassus] = useState(yesno[1])
  const [takhassus_details, setTakhassus_details] = useState('')

  return (
    <ProfileLayout>
      <ProfileRoutes activeRoute={activeRoute} />
      <DropdownProfile
        selected={education}
        setSelected={setEducation}
        legend='কোন মাধ্যমে পড়াশোনা করেছেন?'
        data={educationType}
      />
      {/* General Education */}
      {education === educationType[0] && (
        <div>
          <DropdownProfile
            legend='মাধ্যমিক (SSC) / সমমান পাশ করেছেন?'
            data={yesno}
            selected={secondary}
            setSelected={setSecondary}
          />
          {secondary === yesno[0] && (
            <div>
              <FieldInput
                legend='মাধ্যমিক (SSC) / সমমান এর বিস্তারিত'
                required
                handlechange={setSecondary_details}
                textarea
                placeholder='ফলাফলঃ A+, বিভাগঃ বিজ্ঞান, পাশের সনঃ 2016'
                description='আপনার মাধ্যমিক/সমমান এর ফলাফল, বিভাগ ও পাশের সন লিখুন'
              />
              <DropdownProfile
                legend='উচ্চমাধ্যমিক (HSC) / সমমান পাশ করেছেন?'
                data={yesno_heigher}
                selected={higher}
                setSelected={setHigher}
              />
              {higher === yesno_heigher[1] && (
                <div>
                  <FieldInput
                    legend='উচ্চমাধ্যমিক (HSC) / সমমান এর বিস্তারিত'
                    required
                    description='আপনার উচ্চমাধ্যমিক/সমমান এর ফলাফল, বিভাগ ও পাশের সন লিখুন'
                    handlechange={setHigher_details}
                    textarea
                  />
                  <FieldInput
                    legend='স্নাতক/স্নাতক(সম্মান)/সমমান শিক্ষাগত যোগ্যতা'
                    handlechange={setHonors_details}
                    textarea
                    placeholder='ফলাফলঃ A+, বিভাগঃ বিজ্ঞান, পাশের সনঃ 2018'
                    description='এভাবে লিখতে পারেনঃ BA in English Language & Literature, running year/passed year, CGPA...'
                  />
                </div>
              )}
              {higher === yesno_heigher[2] && (
                <div>
                  <DropdownProfile
                    legend='উচ্চমাধ্যমিক (HSC) / সমমান কোন বর্ষে পড়ছেন?'
                    data={higherType}
                    selected={higher_year}
                    setSelected={setHigher_year}
                  />
                </div>
              )}
              {higher === yesno_heigher[3] && (
                <div>
                  <FieldInput
                    legend='ডিপ্লোমা এর বিষয়ে বিস্তারিত'
                    handlechange={setDiploma_details}
                    textarea
                    placeholder='প্রতিষ্ঠানের নাম, বিভাগ, ফলাফল, পাসের সন'
                    description='ছাত্র হলে বর্ষ লিখবেন'
                  />
                </div>
              )}
            </div>
          )}
          {secondary === yesno[1] && (
            <div>
              <DropdownProfile
                legend='কোন ক্লাস পর্যন্ত পড়েছেন?'
                data={_classes.reverse()}
                selected={classes}
                setSelected={setClasses}
              />
            </div>
          )}
        </div>
      )}

      {education === educationType[1] && (
        <div>
          <DropdownProfile
            selected={hafej}
            setSelected={setHafej}
            legend='আপনি কি হাফেজ?'
            data={yesno}
          />
          <DropdownProfile
            selected={dawra}
            setSelected={setDawra}
            legend='দাওরায়ে হাদীস পাশ করেছেন?'
            data={yesno_dawra}
          />
          {dawra === yesno_dawra[1] && (
            <div>
              <FieldInput
                legend='দাওরায়ে হাদীস এর বিস্তারিত'
                required
                handlechange={setdawra_details}
                textarea
                placeholder='নতিজা, পাসের সন লিখুন'
              />
              <DropdownProfile
                selected={takhassus}
                setSelected={setTakhassus}
                legend='আপনি কি তাখাসসুস পড়েছেন?'
                data={yesno}
              />
              {takhassus === yesno[0] && (
                <div>
                  <FieldInput
                    legend='তাখাসসুস এর বিস্তারিত'
                    required
                    handlechange={setTakhassus_details}
                    textarea
                    placeholder='তাখাসসুসের বিষয়, পাসের সন লিখুন'
                  />
                </div>
              )}
            </div>
          )}
          {dawra === yesno_dawra[3] && (
            <FieldInput
              legend='দাওরায়ে হাদীস কোন বর্ষে পড়ছেন?'
              required
              handlechange={setdawra_year}
            />
          )}

          <FieldInput
            legend='সর্বোচ্চ শিক্ষাগত যোগ্যতা'
            handlechange={handlechange}
            description='শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত লিখবেন।'
            name='profession'
            textarea={true}
          />
        </div>
      )}

      <FieldInput
        legend='অন্যান্য শিক্ষাগত যোগ্যতা'
        handlechange={handlechange}
        description='শিক্ষার বিষয়, প্রতিষ্ঠানের নাম, পাসের সন ইত্যাদি বিস্তারিত লিখবেন। কিছু না থাকলে ফাঁকা রাখবেন।'
        name='profession'
        textarea={true}
      />
    </ProfileLayout>
  )
}

const yesno = ['হ্যা', 'না']
const yesno_heigher = ['---', 'হ্যা', 'না', 'ডিপ্লোমা পড়েছি']
const yesno_dawra = ['---', 'হ্যা', 'না', 'এখনো পড়েছি']
const educationType = ['জেনারেল', 'মাদ্রাসা']
const _classes = [
  '১ম',
  '২য়',
  '৩য়',
  '৪র্থ',
  '৫ম',
  '৬ষ্ঠ',
  '৭ম',
  '৮ম',
  '৯ম',
  '১০ম'
]
const higherType = [
  'HSC দ্বিতীয় বর্ষ',
  'HSC প্রথম বর্ষ',
  'HSC রেজাল্ট দেয় নি এখনো',
  'SSC এর পর আর পড়াশোনা করা হয় নি',
  'HSC পরীক্ষা দিয়ে পাশ করতে পারি নি।'
]
