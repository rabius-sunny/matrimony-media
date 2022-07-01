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

export default function Preview() {
  const [bio, setBio] = useState({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let username = localStorage.getItem('username')
    setLoading(true)
    if (username) {
      biodataRequests
        .getBioByID(username + '+username')
        .then(data => {
          setBio(data.response)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          alert(err.message)
        })
    }
  }, [])

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

  useEffect(() => {
    if (
      !(type,
      condition,
      permanent_address,
      education,
      father_profession,
      salat,
      marry_reason,
      ex_year,
      is_correct_info,
      liability)
    ) {
      router.push('/profile/edit/name')
    }
  }, [])

  return !loading && bio ? (
    <div className='container'>
      <Head>
        <title>বায়োডাটা | Preview</title>
      </Head>
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
