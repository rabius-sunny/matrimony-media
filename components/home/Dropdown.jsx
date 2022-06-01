import { useState } from 'react'
import { _address_jilla, _type } from 'assets/profileinfo'
import { useRouter } from 'next/router'

export default function Dropdown() {
  const router = useRouter()
  const [type, setType] = useState('')
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
          htmlFor='biono'
        >
          আমি খুঁজছি
        </label>
        <select
          onClick={e => {
            setType(e.target.value)
            setIsReset(false)
          }}
          className='w-full py-1 rounded px-1 focus:outline-red-800'
          name='type'
          id='type'
        >
          <option selected={isReset} value=''>
            সকল
          </option>
          {_type.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className='my-4'>
        <label
          className='mb-1 block text-sm font-medium text-white'
          htmlFor='biono'
        >
          জেলা
        </label>
        <select
          onClick={e => {
            setJilla(e.target.value)
            setIsReset(false)
          }}
          className='w-full py-1 rounded px-1 focus:outline-red-800'
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
          onChange={e => setId(e.target.value)}
          className='mb-4 w-full rounded px-3 py-1 shadow-md focus:outline-red-800'
        />
      </div>
      <div className='submit text-right'>
        <button
          onClick={() =>
            router.push(`/bios/search/${type || 'all'}/${jilla || 'all'}/${id}`)
          }
          className='rounded bg-white px-4 py-2 text-red-600 shadow-md hover:bg-red-100'
        >
          সার্চ করুন
        </button>
      </div>
    </div>
  )
}
