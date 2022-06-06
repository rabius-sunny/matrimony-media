import BioHeading from './BioHeading'

export default function DFamily({
  data: {
    father_profession,
    mother_profession,
    brothers,
    brothers_info,
    sisters,
    sisters_info,
    uncles_profession,
    family_status
  }
}) {
  return (
    <BioHeading heading='পারিবারিক তথ্য'>
      <div className='item'>
        <span>পিতার পেশা</span>
        <span>{father_profession}</span>
      </div>
      <div className='item'>
        <span>মাতার পেশা</span>
        <span>{mother_profession}</span>
      </div>
      <div className='item'>
        <span>ভাই কয়জন?</span>
        <span>{brothers}</span>
      </div>
      {brothers && brothers !== 'ভাই নেই' && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>ভাইদের সম্পর্কে তথ্য</div>
          <div className='pt-1 whitespace-pre-wrap'>{brothers_info}</div>
        </div>
      )}

      <div className='item'>
        <span>বোন কয়জন?</span>
        <span>{sisters}</span>
      </div>
      {sisters && sisters !== 'বোন নেই' && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>বোনদের সম্পর্কে তথ্য</div>
          <div className='pt-1 whitespace-pre-wrap'>{sisters_info}</div>
        </div>
      )}

      {uncles_profession && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>চাচা-মামাদের পেশা</div>
          <div className='pt-1 whitespace-pre-wrap'>{uncles_profession}</div>
        </div>
      )}
      {family_status && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>
            পরিবারের অর্থনৈতিক ও সামাজিক অবস্থা
          </div>
          <div className='pt-1 whitespace-pre-wrap'>{family_status}</div>
        </div>
      )}
    </BioHeading>
  )
}
