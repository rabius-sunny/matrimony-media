import { useState, useEffect } from 'react'
import DAddress from 'components/bio/DAddress'
import { useRouter } from 'next/router'
import biodataRequests from 'services/biodataRequests'
import DEducation from 'components/bio/DEducaiton'
import DFamily from 'components/bio/DFamily'

export default function DetailBio() {
  const {
    query: { username }
  } = useRouter()
  const [bio, setBio] = useState({})
  const [loading, setLoading] = useState(false)
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
  console.log(bio)
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

  return !loading && bio ? (
    <div className='container'>
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
      </div>
    </div>
  ) : (
    <div>Loading</div>
  )
}
