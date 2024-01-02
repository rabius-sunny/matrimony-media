import { useState } from 'react'
import { _address_jilla } from 'assets/profileinfo'
import { useRouter } from 'next/router'

const _types = ['পাত্রের বায়োডাটা', 'পাত্রীর বায়োডাটা']

export default function Dropdown() {
  const router = useRouter()
  const [type, setType] = useState(_types[0])
  const [jilla, setJilla] = useState('all')
  const [id, setId] = useState('')

  return (
    <div className='my-3 lg:my-4'>
      <div className='mb-2 lg:mb-4'>
        <label
          className='mb-1 block text-sm font-medium text-white'
          htmlFor='type'
        >
          আমি খুঁজছি
        </label>
        <select
          onChange={(e) => setType(e.target.value)}
          onClick={(e) => setId('')}
          value={type}
          className='w-full py-1 rounded px-1 focus:outline-red-800'
          id='type'
        >
          <option value='পাত্রের বায়োডাটা'>পাত্রের বায়োডাটা</option>
          <option value='পাত্রীর বায়োডাটা'>পাত্রীর বায়োডাটা</option>
        </select>
      </div>

      <div className='my-2 lg:my-4'>
        <label
          className='mb-1 block text-sm font-medium text-white'
          htmlFor='jilla'
        >
          জেলা
        </label>
        <select
          onClick={() => setId('')}
          onChange={(e) => setJilla(e.target.value)}
          value={jilla}
          className='w-full py-1 rounded px-1 focus:outline-red-800'
          id='jilla'
        >
          <option value='all'>সকল</option>
          {_address_jilla.map((item) => (
            <option
              value={item}
              key={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className='my-2 font-medium'>অথবা</div>

      <div>
        <label
          className='mb-1 block text-sm font-medium text-white'
          htmlFor='biono'
        >
          বায়োডাটা আইডি
        </label>
        <input
          onChange={(e) => setId(e.target.value)}
          value={id}
          type='tel'
          placeholder='.....'
          className='mb-4 w-full rounded px-3 py-1 shadow-md focus:ring-secondary focus:ring-2'
        />
      </div>
      <div className='submit text-right'>
        <button
          onClick={() =>
            router.push(
              id ? `/bios/bio/${id}` : `/bios/search/${type}/${jilla}`
            )
          }
          className='rounded bg-white px-4 py-2 text-primary shadow-md hover:bg-red-100'
        >
          সার্চ করুন
        </button>
      </div>
    </div>
  )
}
