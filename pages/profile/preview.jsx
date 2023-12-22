import { useState, useEffect } from 'react'
import DAddress from 'components/bio/DAddress'
import biodataRequests from 'services/network/biodataRequests'
import DEducation from 'components/bio/DEducaiton'
import DFamily from 'components/bio/DFamily'
import DPersonal from 'components/bio/DPersonal'
import DMarital from 'components/bio/DMarital'
import DAnother from 'components/bio/DAnother'
import DExpect from 'components/bio/DExpect'
import CSkeleton from 'components/shared/CSkeleton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LongModal from 'components/shared/Modals/LongModal'
import useAuth from 'hooks/useAuth'
import { PencilAltIcon } from '@heroicons/react/outline'
import { Loading } from '@nextui-org/react'

export default function Preview() {
  const auth = useAuth()
  const [bio, setBio] = useState({})
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)

    biodataRequests
      .checkField()
      .then((data) => {
        if (data.fields && data.fields.length < 1) {
          biodataRequests
            .getBioByToken()
            .then((data) => {
              setBio(data.bio)
              setLoading(false)
            })
            .catch((err) => {
              setLoading(false)
              alert(err.message)
            })
        } else {
          alert('আপনি সব ফিল্ড পূরণ করেন নি')
          router.push('/')
        }
      })
      .catch((err) => {
        alert('আপনি সব ফিল্ড পূরণ করেন নি')
        router.push('/')
      })
  }, [])

  const handlePublish = (_) => {
    setIsLoading(true)
    biodataRequests
      .updateBio({ requested: true })
      .then((info) => {
        if (info.message === 'ok') {
          setIsLoading(false)
          setVisible(true)
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setVisible2(true)
      })
  }

  const {
    type,
    condition,
    permanent_jilla,
    permanent_division,
    current_jilla,
    current_division,
    birth,
    complexion,
    height,
    weight,
    blood,
    profession,
    income,
    permanent_address,
    current_address,
    where_lived,
    education,
    hafej,
    dawra,
    dawra_details,
    dawra_year,
    takhassus,
    takhassus_details,
    highest_education,
    secondary,
    secondary_details,
    higher,
    higher_year,
    higher_details,
    diploma_details,
    honors_details,
    another_education,
    father_name,
    mother_name,
    father_profession,
    mother_profession,
    brothers,
    brothers_info,
    sisters,
    sisters_info,
    uncles_profession,
    family_status,
    dress,
    beard,
    dress_over_ankle,
    salat,
    salat_duration,
    maintain_mahram,
    can_tilawat,
    mazhab,
    political_view,
    drama_cinnema,
    disease,
    deeni_effort,
    murid_of_peer,
    majar_view,
    favorite_books,
    favorite_scholars,
    special_qualifications,
    about_me,
    when_died,
    divorce_reason,
    marry_reason,
    guardians_permission,
    family_planning,
    managing_hijab,
    education_after_marriage,
    job_after_marriage,
    living_place,
    demand,
    profession_info,
    special_acknowledgement,
    ex_year,
    ex_complexion,
    ex_height,
    ex_education,
    ex_jilla,
    ex_marrital_condition,
    ex_profession,
    ex_financial_condition,
    ex_family_condition,
    ex_features
  } = bio

  return !loading && bio ? (
    <div className='container3'>
      <Head>
        <title>প্রিভিউ | জান্নাতি জুটি.COM</title>
      </Head>
      <LongModal
        blur
        scroll={false}
        visible={visible3}
        onClose={() => setVisible3(false)}
        header='Editing Report'
        body={
          <div>
            আপনার তথ্যসমূহ সংরক্ষিত হয়েছে। বায়োডাটাটি পাবলিশ করতে নিচে
            <span className='text-secondary'> পাবলিশ রিকুয়েস্ট করুন </span>
            বাটনে ক্লিক করুন, প্রয়োজনীয় পরিবর্তন থাকলে{' '}
            <PencilAltIcon className='inline w-5 mr-1 text-secondary' />
            আইকনে ক্লিক করুন।
          </div>
        }
        btn='OK'
        color='success'
        bodyColor='success'
        preventClose={false}
      />
      <LongModal
        blur
        scroll={false}
        visible={visible}
        onClose={() => router.push('/')}
        header='Publishing report'
        body='আপনার রিকুয়েস্টটি প্যানেলের এ্যাপ্রুভাল পেন্ডিংয়ে রয়েছে। পাবলিশ হলে জানিয়ে দেয়া হবে।'
        btn='OK'
        color='success'
        bodyColor='success'
        preventClose={false}
      />
      <LongModal
        blur
        scroll={false}
        visible={visible2}
        onClose={() => setVisible2(false)}
        header='Publishing report'
        body='ইরর হয়েছে, আবার চেষ্টা করুন।'
        btn='OK'
        color='success'
        bodyColor='error'
      />
      <div className='mt-4'>
        <div className='my-4'>
          <DAddress
            auth={auth}
            data={{ permanent_address, current_address, where_lived }}
          />
        </div>
        <div className='my-4'>
          <DEducation
            auth={auth}
            data={{
              education,
              hafej,
              dawra,
              dawra_details,
              dawra_year,
              takhassus,
              takhassus_details,
              highest_education,
              secondary,
              secondary_details,
              higher,
              higher_year,
              higher_details,
              diploma_details,
              honors_details,
              another_education
            }}
          />
        </div>
        <div className='my-4'>
          <DFamily
            auth={auth}
            data={{
              father_name,
              mother_name,
              father_profession,
              mother_profession,
              brothers,
              brothers_info,
              sisters,
              sisters_info,
              uncles_profession,
              family_status
            }}
          />
        </div>
        <div className='my-4'>
          <DPersonal
            auth={auth}
            data={{
              type,
              dress,
              beard,
              dress_over_ankle,
              salat,
              salat_duration,
              maintain_mahram,
              can_tilawat,
              mazhab,
              political_view,
              drama_cinnema,
              disease,
              deeni_effort,
              murid_of_peer,
              majar_view,
              favorite_books,
              favorite_scholars,
              special_qualifications,
              about_me
            }}
          />
        </div>
        <div className='my-4'>
          <DMarital
            auth={auth}
            data={{
              type,
              marry_reason,
              guardians_permission,
              family_planning,
              managing_hijab,
              education_after_marriage,
              job_after_marriage,
              living_place,
              demand
            }}
          />
        </div>

        {(profession_info || special_acknowledgement) && (
          <div className='my-4'>
            <DAnother
              auth={auth}
              data={{ profession_info, special_acknowledgement }}
            />
          </div>
        )}
        <div className='my-4'>
          <DExpect
            auth={auth}
            data={{
              ex_year,
              ex_complexion,
              ex_height,
              ex_education,
              ex_jilla,
              ex_marrital_condition,
              ex_profession,
              ex_financial_condition,
              ex_family_condition,
              ex_features
            }}
          />
        </div>
      </div>
      <div className='my-4'>
        <button
          onClick={handlePublish}
          className='text-white font-bold text-xl cursor-pointer rounded-md bg-primary  py-3 my-8 w-full'
        >
          {isLoading ? (
            <Loading
              color='success'
              size='sm'
            />
          ) : (
            'পাবলিশ রিকুয়েস্ট করুন'
          )}
        </button>
      </div>
    </div>
  ) : (
    <div className='container3'>
      <Head>
        <title>বায়োডাটা</title>
      </Head>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={200}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={100}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={400}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={300}
          width={'100%'}
        />
      </div>
    </div>
  )
}
