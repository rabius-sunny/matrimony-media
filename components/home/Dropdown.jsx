import { useState } from 'react'
import { _address_jilla } from 'assets/profileinfo'
import { useRouter } from 'next/router'

const _types = ['পাত্রের বায়োডাটা', 'পাত্রীর বায়োডাটা']

export default function Dropdown() {
  const router = useRouter()
  const [type, setType] = useState(_types[0])
  const [jilla, setJilla] = useState('')
  const [id, setId] = useState('')
  const [isReset, setIsReset] = useState(false)
  const _reset = () => {
    setIsReset(true)
    setType('')
    setJilla('')
  }

  return (
    <div className='my-4'>
      <div className='mb-4'>
        <label
          className='mb-1 block text-sm font-medium text-white'
          htmlFor='type'
        >
          আমি খুঁজছি
        </label>
        <select
          onClick={e => {
            setType(e.target.value)
            setIsReset(false)
            setId('')
          }}
          className={`w-full ${
            isReset ? 'opacity-70' : 'opacity-100'
          } py-1 rounded px-1 focus:outline-red-800`}
          name='type'
          id='type'
        >
          <option value='পাত্রের বায়োডাটা'>পাত্রের বায়োডাটা</option>
          <option value='পাত্রীর বায়োডাটা'>পাত্রীর বায়োডাটা</option>
        </select>
      </div>

      <div className='my-4'>
        <label
          className='mb-1 block text-sm font-medium text-white'
          htmlFor='jilla'
        >
          জেলা
        </label>
        <select
          onClick={e => {
            setJilla(e.target.value)
            setIsReset(false)
            setId('')
          }}
          className={`w-full ${
            isReset ? 'opacity-70' : 'opacity-100'
          } py-1 rounded px-1 focus:outline-red-800`}
          name='jilla'
          id='jilla'
        >
          <option selected={isReset} value=''>
            সকল
          </option>
          {_address_jilla.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className='mb-1 block text-sm font-medium text-white'
          htmlFor='biono'
        >
          বায়োডাটা আইডি
        </label>
        <input
          onClick={_reset}
          onBlur={() => setIsReset(false)}
          onChange={e => setId(e.target.value)}
          value={id}
          className='mb-4 w-full rounded px-3 py-1 shadow-md focus:outline-red-800'
        />
      </div>
      <div className='submit text-right'>
        <button
          onClick={() =>
            router.push(`/bios/search/${type || 'all'}/${jilla || 'all'}/${id}`)
          }
          className='rounded bg-white px-4 py-2 text-primary shadow-md hover:bg-red-100'
        >
          সার্চ করুন
        </button>
      </div>
    </div>
  )
}
