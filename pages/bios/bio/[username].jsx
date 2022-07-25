import { useState, useEffect } from 'react'
import DAddress from 'components/bio/DAddress'
import { useRouter } from 'next/router'
import biodataRequests from 'services/biodataRequests'
import DEducation from 'components/bio/DEducaiton'
import DFamily from 'components/bio/DFamily'
import DPersonal from 'components/bio/DPersonal'
import DMarital from 'components/bio/DMarital'
import DAnother from 'components/bio/DAnother'
import DExpect from 'components/bio/DExpect'
import DAuthorityqs from 'components/bio/DAuthorityqs'
import CSkeleton from 'components/shared/CSkeleton'
import Head from 'next/head'
import userRequest from 'services/userRequest'
import BioInfoCard from 'components/bio/BioInfoCard'
import LongModal from 'components/shared/Modals/LongModal'

export default function DetailBio() {
  const {
    query: { username }
  } = useRouter()
  const [bio, setBio] = useState({})
  const [loading, setLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [contact, setContact] = useState(false)
  const [report, setReport] = useState(false)
  const [name, setName] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (username && username.includes('id')) {
      console.log('done check')
      biodataRequests
        .getUsername(username?.split('+')[0])
        .then(data => setName(data.username))
        .catch(err => console.log('err', err))
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    if (username) {
      biodataRequests
        .getBioByID(username)
        .then(data => {
          setBio(data.response)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          alert(err.message)
        })
    }
  }, [username])
  useEffect(() => {
    if (bio._id) {
      userRequest
        .checkFavorite(bio._id)
        .then(res => {
          if (res.message === 'exists') {
            setIsBookmarked(true)
          }
        })
        .catch(err => console.log('err', err))
    }
  }, [username, bio])

  const handleBookmark = bioId => {
    if (isBookmarked) {
      userRequest
        .removeBookmark(bioId)
        .then(res => {
          if (res.message === 'ok') {
            setIsBookmarked(false)
          }
        })
        .catch(err => console.log('err', err))
    } else {
      userRequest
        .addToBookmark(bioId)
        .then(res => {
          if (res.message === 'ok') {
            setIsBookmarked(true)
          }
        })
        .catch(err => console.log('err', err))
    }
  }
  const handleContact = _ => {
    userRequest
      .makeRequest({ target: username.split('+')[0] })
      .then(res => console.log('res', res))
      .catch(err => console.log('err', err))
  }

  const {
    type,
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
    continue_job,
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
    ex_features,
    family_about_bio,
    is_correct_info,
    liability
  } = bio

  return !loading && bio ? (
    <div className='container my-8'>
      <div className='grid grid-cols-12 gap-4'>
        <Head>
          <title>বায়োডাটা | {name || username?.split('+')[0]}</title>
        </Head>
        <LongModal
          visible={contact}
          onClose={() => setContact(false)}
          onTask={() =>
            router.push(`/checkout/${name || username?.split('+')[0]}`)
          }
          header='আপনি কি এই বায়োডাটার সমস্ত শর্ত পূরণে সক্ষম?'
          body='আপনি যদি এই বায়োডাটাতে উল্লেখিত শর্তসমূহ মেনে থাকেন শুধু তাহলেই
              যোগাযোগ করুন'
          btn='হ্যা, যোগাযোগ করুন'
          color='success'
          preventClose={false}
          bodyColor='success'
        />
        <LongModal
          visible={report}
          onClose={() => setContact(false)}
          header='এই বায়োডাটাতে রিপোর্ট করুন'
          body='যদি এই বায়োডাটা বা সংশ্লিষ্ট ব্যক্তি সম্পর্কে আপনার কোনো অভিযোগ থাকে তাহলে আমাদেরকে জানাতে পারেন এই মেইল এ info@matrimonymedia.com'
          preventClose={false}
          bodyColor='error'
        />
        <div className='col-span-12 md:col-span-4'>
          <BioInfoCard
            data={bio}
            loading={loading}
            username={name || username?.split('+')[0]}
          />
        </div>
        <div className='col-span-12 md:col-span-8'>
          <div className='mt-4'>
            <div className='my-4'>
              <DAddress
                data={{ permanent_address, current_address, where_lived }}
              />
            </div>
            <div className='my-4'>
              <DEducation
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
                data={{
                  type,
                  marry_reason,
                  guardians_permission,
                  family_planning,
                  managing_hijab,
                  education_after_marriage,
                  job_after_marriage,
                  continue_job,
                  living_place,
                  demand
                }}
              />
            </div>
            {(profession_info || special_acknowledgement) && (
              <div className='my-4'>
                <DAnother data={{ profession_info, special_acknowledgement }} />
              </div>
            )}
            <div className='my-4'>
              <DExpect
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
            <div className='my-4'>
              <DAuthorityqs
                data={{ family_about_bio, is_correct_info, liability }}
              />
            </div>
            <div className='h-40'>
              <div className='my-8'>
                <button
                  onClick={() => setContact(true)}
                  className='text-center w-full py-3 rounded-md hover:bg-white hover:border-2 hover:text-green-500 text-white hover:border-green-500 bg-green-500 shadow'
                >
                  অভিভাবকের সাথে যোগাযোগ করুন
                </button>
              </div>
              <div className='my-8 flex'>
                <button
                  onClick={() => handleBookmark(bio._id)}
                  className={`text-center w-full mr-4 py-3 rounded-md hover:bg-white hover:border-2 hover:text-pink-500 text-white hover:border-pink-500 bg-pink-500 shadow`}
                >
                  {isBookmarked
                    ? 'ফেভারিট থেকে মুছে ফেলুন'
                    : 'ফেভারিট এ যোগ করুন'}
                </button>
                <button
                  onClick={() => setReport(true)}
                  className='text-center w-full py-3 rounded-md hover:bg-white hover:border-2 hover:text-red-500 text-white hover:border-red-500 bg-red-500 shadow'
                >
                  এই বায়োতে রিপোর্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='container'>
      <Head>
        <title>বায়োডাটা</title>
      </Head>
      <div className='my-4'>
        <CSkeleton duration={1} height={200} width={'100%'} />
      </div>
      <div className='my-4'>
        <CSkeleton duration={1} height={100} width={'100%'} />
      </div>
      <div className='my-4'>
        <CSkeleton duration={1} height={400} width={'100%'} />
      </div>
      <div className='my-4'>
        <CSkeleton duration={1} height={300} width={'100%'} />
      </div>
    </div>
  )
}
