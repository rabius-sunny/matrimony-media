import {
  _address_jilla,
  _femalecondition,
  _madhabs,
  _malecondition
} from 'assets/profileinfo'
import { useEffect, useState } from 'react'
import biodataRequests from 'services/network/biodataRequests'

const educationTypes = ['জেনারেল', 'মাদ্রাসা']

export default function FilterBio({ type, jilla, setLoading, setBios }) {
  const [conditions, setConditions] = useState([])

  useEffect(() => {
    setCriterias({ ...criterias, type, jilla: jilla === 'all' ? '' : jilla })
    if (type === 'পাত্রীর বায়োডাটা') {
      setConditions(_femalecondition)
    } else setConditions(_malecondition)
  }, [type, jilla])
  const [criterias, setCriterias] = useState({
    condition: '',
    ageFrom: 16,
    ageTo: 50,
    education: '',
    madhab: '',
    type: '',
    jilla: ''
  })

  const handleChange = (e) =>
    setCriterias({ ...criterias, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    setLoading(true)
    biodataRequests
      .filterBios(criterias)
      .then((data) => {
        setBios(data.bios)
      })
      .catch((_err) => {
        alert('একটি ইরর হয়েছে, আবার চেষ্টা করুন।')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className='mb-8 bg-primary p-6'>
      <div className='container block sm:flex items-center justify-evenly mt-4 flex-wrap'>
        <div className='pr-4'>
          <label
            className='block text-xs md:text-base text-white font-semibold'
            htmlFor='s1'
          >
            বৈবাহিক অবস্থা
          </label>
          <select
            name='condition'
            value={criterias.condition}
            // defaultValue=''
            onChange={handleChange}
            id='s1'
            className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
          >
            <option value=''>সকল</option>
            {conditions.map((item, idx) => (
              <option
                key={idx}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='pr-4'>
          <label
            className='block text-xs md:text-base text-white font-semibold'
            htmlFor='s6'
          >
            ঠিকানা
          </label>
          <select
            name='jilla'
            value={criterias.jilla}
            onChange={handleChange}
            id='s6'
            className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
          >
            <option value=''>সকল</option>
            {_address_jilla.map((item, idx) => (
              <option
                key={idx}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='pr-4'>
          <label
            className='block text-xs md:text-base text-white font-semibold'
            htmlFor='s2'
          >
            বয়স(থেকে)
          </label>
          <select
            name='ageFrom'
            value={criterias.ageFrom}
            onChange={handleChange}
            id='s2'
            className='m-3 lg:m-0 rounded py-1 px-3 bg-gray-50 w-full md:w-auto'
          >
            {Array(50 - 16 + 1)
              .fill()
              .map((_, idx) => 16 + idx)
              .map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className='pr-4'>
          <label
            className='block text-xs md:text-base text-white font-semibold'
            htmlFor='s3'
          >
            বয়স(পর্যন্ত)
          </label>
          <select
            name='ageTo'
            value={criterias.ageTo}
            onChange={handleChange}
            id='s3'
            className='m-3 lg:m-0 rounded py-1 px-3 bg-gray-50 w-full md:w-auto'
          >
            {Array(50 - 16 + 1)
              .fill()
              .map((_, idx) => 16 + idx)
              .map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className='pr-4'>
          <label
            className='block text-xs md:text-base text-white font-semibold'
            htmlFor='s4'
          >
            পড়াশোনার মাধ্যম
          </label>
          <select
            name='education'
            value={criterias.education}
            onChange={handleChange}
            id='s4'
            className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
          >
            <option value=''>সকল</option>
            {educationTypes.map((item, idx) => (
              <option
                key={idx}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='pr-4'>
          <label
            className='block text-xs md:text-base text-white font-semibold'
            htmlFor='s5'
          >
            মাযহাব
          </label>
          <select
            name='madhab'
            value={criterias.madhab}
            onChange={handleChange}
            id='s5'
            className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
          >
            <option value=''>সকল</option>
            {_madhabs.map((item, idx) => (
              <option
                key={idx}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className='p-2 my-3 lg:my-0 w-full md:w-auto rounded text-rose-600 bg-white'
        >
          ফিল্টার করুন
        </button>
      </div>
    </div>
  )
}
