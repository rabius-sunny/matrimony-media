import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import biodataRequests from 'services/biodataRequests'
import Head from 'next/head'
import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'
import { _femalecondition, _madhabs, _malecondition } from 'assets/profileinfo'

const educationTypes = ['জেনারেল', 'মাদ্রাসা']
export default function SearchResult() {
  const {
    query: { searchkey }
  } = useRouter()
  const [loading, setLoading] = useState(true)
  const [bios, setBios] = useState(null)
  const [type, setType] = useState(_malecondition)
  const [criterias, setCriterias] = useState({
    condition: _malecondition[0],
    ageFrom: 16,
    ageTo: 50,
    education: educationTypes[0],
    madhab: _madhabs[0]
  })

  useEffect(() => {
    if (searchkey && searchkey.length > 2) {
      biodataRequests
        .getBioByUID(searchkey[2])
        .then(data => {
          data ? setBios([data.response]) : setBios(null)
          setLoading(false)
        })
        .catch(err => {
          console.log(err.message)
          setLoading(false)
        })
    } else if (searchkey && searchkey.length > 0 && !searchkey[2]) {
      biodataRequests
        .getBios(searchkey[0], searchkey[1])
        .then(data => {
          data.response.length >= 1 ? setBios(data.response) : setBios(null)
          setBios(data.response)
          setLoading(false)
        })
        .catch(err => {
          console.log(err.message)
          setLoading(false)
        })
    }
    if (searchkey && searchkey.length > 0) {
      if (searchkey[0] === 'পাত্রের বায়োডাটা') {
        setType(_malecondition)
      } else if (searchkey[0] === 'পাত্রীর বায়োডাটা') {
        setType(_femalecondition)
      } else setType(_malecondition)
    }
  }, [searchkey])

  const handleChange = e =>
    setCriterias({ ...criterias, [e.target.name]: e.target.value })

  const handleSubmit = () => console.log('criterias', criterias)

  if (loading) {
    return (
      <div className='container my-4'>
        <Head>
          <title>সার্চ করুন</title>
        </Head>
        <h1 className='text-3xl text-center'>Searching for Results</h1>
        <CardSkeleton />
      </div>
    )
  } else if ((!loading && bios !== null && !bios.length) || bios === null) {
    return (
      <div className='mt-12' style={{ minHeight: '70vh' }}>
        <Head>
          <title>সার্চ করুন</title>
        </Head>
        <h1 className='text-3xl text-center text-red-500 font-bold'>
          কোনো বায়োডাটা পাওয়া যায় নি। অন্যভাবে চেষ্টা করুন।
        </h1>
      </div>
    )
  } else if (bios && bios.length >= 1) {
    return (
      <div className='container my-4'>
        <div className='my-4' style={{ minHeight: '70vh' }}>
          <Head>
            <title>সার্চ করুন</title>
          </Head>
          <div className='mb-8 bg-gradient-to-r from-rose-600 to-pink-600 p-6'>
            <div className='text-center text-white text-3xl'>সার্চ ফলাফল</div>
            <div className='block md:flex items-center justify-evenly mt-4 flex-wrap'>
              <div className='pr-4'>
                <label className='block text-white font-semibold' htmlFor='s1'>
                  বৈবাহিক অবস্থা
                </label>
                <select
                  name='condition'
                  value={criterias.condition}
                  onChange={handleChange}
                  id='s1'
                  className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
                >
                  {type.map(item => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className='pr-4'>
                <label className='block text-white font-semibold' htmlFor='s1'>
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
                <label className='block text-white font-semibold' htmlFor='s1'>
                  বয়স(পর্যন্ত)
                </label>
                <select
                  name='ageTo'
                  value={criterias.ageTo}
                  onChange={handleChange}
                  defaultValue={25}
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
                <label className='block text-white font-semibold' htmlFor='s1'>
                  পড়াশোনার মাধ্যম
                </label>
                <select
                  name='education'
                  value={criterias.education}
                  onChange={handleChange}
                  id='s4'
                  className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
                >
                  {educationTypes.map(item => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className='pr-4'>
                <label className='block text-white font-semibold' htmlFor='s1'>
                  মাযহাব
                </label>
                <select
                  name='madhab'
                  value={criterias.madhab}
                  onChange={handleChange}
                  id='s5'
                  className='m-3 lg:m-0 rounded p-1 bg-gray-50 w-full md:w-auto'
                >
                  {_madhabs.map(item => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className='p-2 my-3 lg:my-0 w-full lg:w-auto rounded text-rose-600 bg-white'
              >
                ফিল্টার করুন
              </button>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-8'>
            {bios.map((bio, idx) => (
              <BioCard bio={bio} key={idx} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
