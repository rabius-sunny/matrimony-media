import BioHeading from './BioHeading'

export default function DFamily({
  auth,
  data: {
    father_profession,
    mother_profession,
    brothers_info,
    sisters_info,
    uncles_profession,
    family_status
  }
}) {
  return (
    <BioHeading
      heading='পারিবারিক তথ্য'
      link={auth && '/family-info'}
    >
      <div className='item'>
        <span>পিতার পেশা</span>
        <span>{father_profession}</span>
      </div>
      <div className='item'>
        <span>মাতার পেশা</span>
        <span>{mother_profession}</span>
      </div>

      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>ভাইদের সম্পর্কে তথ্য</div>
        <div className='pt-1 whitespace-pre-wrap'>{brothers_info}</div>
      </div>

      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>বোনদের সম্পর্কে তথ্য</div>
        <div className='pt-1 whitespace-pre-wrap'>{sisters_info}</div>
      </div>

      {uncles_profession && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>চাচা-মামাদের পেশা</div>
          <div className='pt-1 whitespace-pre-wrap'>{uncles_profession}</div>
        </div>
      )}

      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>
          পরিবারের অর্থনৈতিক ও সামাজিক অবস্থা
        </div>
        <div className='pt-1 whitespace-pre-wrap'>{family_status}</div>
      </div>
    </BioHeading>
  )
}
