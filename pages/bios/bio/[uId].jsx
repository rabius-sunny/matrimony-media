import { useState, useEffect } from 'react'
import DAddress from 'components/bio/DAddress'
import { useRouter } from 'next/router'
import biodataRequests from 'services/network/biodataRequests'
import DEducation from 'components/bio/DEducaiton'
import DFamily from 'components/bio/DFamily'
import DPersonal from 'components/bio/DPersonal'
import DMarital from 'components/bio/DMarital'
import DAnother from 'components/bio/DAnother'
import DExpect from 'components/bio/DExpect'
import CSkeleton from 'components/shared/CSkeleton'
import Head from 'next/head'
import userRequest from 'services/userRequest'
import BioInfoCard from 'components/bio/BioInfoCard'
import useAuth from 'hooks/useAuth'

export default function DetailBio() {
  const {
    query: { uId }
  } = useRouter()
  const [bio, setBio] = useState({})
  const [loading, setLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isBookmarkedLocal, setIsBookmarkedLocal] = useState(false)

  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    setLoading(true)
    if (uId) {
      biodataRequests
        .getBioByUID(uId)
        .then((data) => {
          setBio(data.response)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          alert(err.message)
        })
    }
  }, [uId])

  // check favorite for signed user and public user
  useEffect(() => {
    if (uId) {
      if (!auth) {
        // check for public
        const bookmarks = localStorage.getItem('bookmarks')
        if (bookmarks) {
          const result = JSON.parse(bookmarks)
          if (result.hasOwnProperty(uId)) {
            setIsBookmarkedLocal(true)
          }
        }
      } else {
        // check for user
        userRequest
          .checkFavorite(bio?._id)
          .then((res) => {
            if (res.message === 'exists') {
              setIsBookmarked(true)
            }
          })
          .catch((err) => err)
      }
    }
  }, [uId, bio, auth])

  const handleBookmark = (_) => {
    if (auth) {
      if (isBookmarked) {
        userRequest
          .removeBookmark(bio?._id)
          .then((res) => {
            if (res.message === 'ok') {
              setIsBookmarked(false)
            }
          })
          .catch((err) => err)
      } else {
        userRequest
          .addToBookmark(bio?._id)
          .then((res) => {
            if (res.message === 'ok') {
              setIsBookmarked(true)
            }
          })
          .catch((err) => console.log('err', err))
      }
    } else {
      const bookmarks = localStorage.getItem('bookmarks')
      if (bookmarks) {
        const result = JSON.parse(bookmarks)
        if (result.hasOwnProperty(uId)) {
          delete result[uId]
          setIsBookmarkedLocal(false)
        } else {
          result[uId] = uId
          setIsBookmarkedLocal(true)
        }
        localStorage.setItem('bookmarks', JSON.stringify(result))
      } else {
        const bookmarkObj = { [uId]: uId }
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkObj))
        setIsBookmarkedLocal(true)
      }
    }
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
    madhab,
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
    whenDiedWife,
    whenDiedHusband,
    divorceInfo,
    reMarryReason,
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
    <div className='container3 my-8'>
      <Head>
        <title>বায়োডাটা | {uId}</title>
      </Head>
      <div className=''>
        <div className=''>
          <BioInfoCard
            data={bio}
            loading={loading}
            uId={uId}
          />
        </div>
        <div className=''>
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
                  madhab,
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
                  whenDiedWife,
                  whenDiedHusband,
                  divorceInfo,
                  reMarryReason,
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
            {/* <div className='my-4'>
              <DAuthorityqs
                data={{ family_about_bio, is_correct_info, liability }}
              />
            </div> */}
            <div className='h-40'>
              <div className='my-8 flex flex-wrap gap-4'>
                <button
                  onClick={() => router.push(`/checkout/${uId}`)}
                  className='text-center px-4 py-3 rounded-md hover:bg-white hover:border-2 hover:text-secondary text-white hover:border-green-500 bg-green-500 shadow w-full sm:w-auto'
                >
                  অভিভাবকের সাথে যোগাযোগ করুন
                </button>
                <button
                  onClick={handleBookmark}
                  className='text-center px-4 py-3 rounded-md hover:bg-white hover:border-2 hover:text-primary text-white hover:border-red-500 bg-primary shadow w-full sm:w-auto'
                >
                  {isBookmarkedLocal || isBookmarked
                    ? 'ফেভারিট থেকে মুছে ফেলুন'
                    : 'ফেভারিট এ যোগ করুন'}
                </button>
              </div>
            </div>
          </div>
        </div>
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
