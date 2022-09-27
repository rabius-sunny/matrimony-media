import { _femalecondition, _madhabs, _malecondition } from 'assets/profileinfo'
import { useEffect, useState } from 'react'
import biodataRequests from 'services/biodataRequests'

const educationTypes = ['জেনারেল', 'মাদ্রাসা']

export default function FilterBio({ type, jilla, setLoading, setBios }) {
  const [_types, set_types] = useState([])
  const [criterias, setCriterias] = useState({
    condition: '',
    ageFrom: 16,
    ageTo: 50,
    education: educationTypes[0],
    madhab: _madhabs[0],
    type,
    jilla
  })

  useEffect(() => {
    if (type === 'পাত্রের বায়োডাটা') {
      set_types(_malecondition)
      setCriterias({ ...criterias, condition: _malecondition[0] })
    } else if (type === 'পাত্রীর বায়োডাটা') {
      set_types(_femalecondition)
      setCriterias({ ...criterias, condition: _femalecondition[0] })
    }
  }, [])

  const filterAge = dataArray => {
    const filtered = dataArray.filter(
      item =>
        parseInt(item?.age) >= parseInt(criterias.ageFrom) &&
        parseInt(item?.age) <= parseInt(criterias.ageTo)
    )
    return filtered
  }

  const handleChange = e =>
    setCriterias({ ...criterias, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    setLoading(true)
    const { condition, education, madhab } = criterias
    let data

    if (condition && education && madhab) {
      data = {
        education,
        madhab,
        condition,
        type
      }
      jilla !== 'all' ? (data.jilla = jilla) : true
    } else if (!condition && !education && madhab) {
      data = {
        madhab,
        type
      }
      jilla !== 'all' ? (data.jilla = jilla) : true
    } else if (!madhab && condition && education) {
      data = { condition, education, type }
      jilla !== 'all' ? (data.jilla = jilla) : true
    } else if (!condition && !madhab && education) {
      data = { education, type }
      jilla !== 'all' ? (data.jilla = jilla) : true
    } else if (!education && condition && madhab) {
      data = { condition, madhab, type }
      jilla !== 'all' ? (data.jilla = jilla) : true
    } else if (!condition && education && madhab) {
      data = { education, madhab, type }
      jilla !== 'all' ? (data.jilla = jilla) : true
    } else if (!education && !madhab && condition) {
      data = { condition, type }
      jilla !== 'all' ? (data.jilla = jilla) : true
    } else if (!condition && !education && !madhab) {
      data = { type }
      jilla !== 'all' ? (data.jilla = jilla) : true
    }

    biodataRequests
      .filterBios(data)
      .then(info => {
        setBios(filterAge(info.response))
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log('err', err)
        setBios([])
      })
  }

  return (
    <div className='mb-8 bg-primary p-6'>
      <div className='container block sm:flex items-center justify-evenly mt-4 flex-wrap'>
        <div className='pr-4'>
          <label className='block text-white font-semibold' htmlFor='s1'>
            বৈবাহিক অবস্থা
          </label>
          <select
            name='condition'
            value={criterias.condition}
            defaultValue={_types[0]}
            onChange={handleChange}
            id='s1'
            className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
          >
            {['সকল', ..._types].map(item => (
              <option value={item === 'সকল' ? '' : item}>{item}</option>
            ))}
          </select>
        </div>
        <div className='pr-4'>
          <label className='block text-white font-semibold' htmlFor='s2'>
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
              .map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className='pr-4'>
          <label className='block text-white font-semibold' htmlFor='s3'>
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
              .map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className='pr-4'>
          <label className='block text-white font-semibold' htmlFor='s4'>
            পড়াশোনার মাধ্যম
          </label>
          <select
            name='education'
            value={criterias.education}
            onChange={handleChange}
            id='s4'
            className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
          >
            {['সকল', ...educationTypes].map(item => (
              <option value={item === 'সকল' ? '' : item}>{item}</option>
            ))}
          </select>
        </div>
        <div className='pr-4'>
          <label className='block text-white font-semibold' htmlFor='s5'>
            মাযহাব
          </label>
          <select
            name='madhab'
            value={criterias.madhab}
            onChange={handleChange}
            id='s5'
            className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
          >
            {['সকল', ..._madhabs].map(item => (
              <option value={item === 'সকল' ? '' : item}>{item}</option>
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
