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
        <div className='item'>
          <span>ভাইদের সম্পর্কে তথ্য</span>
          <span>{brothers_info}</span>
        </div>
      )}

      <div className='item'>
        <span>বোন কয়জন?</span>
        <span>{sisters}</span>
      </div>
      {sisters && sisters !== 'বোন নেই' && (
        <div className='item'>
          <span>বোনদের সম্পর্কে তথ্য</span>
          <span>{sisters_info}</span>
        </div>
      )}

      <div className='item'>
        <span>চাচা-মামাদের পেশা</span>
        <span>{uncles_profession}</span>
      </div>
      <div className='item'>
        <span>পরিবারের অর্থনৈতিক ও সামাজিক অবস্থা</span>
        <span>{family_status}</span>
      </div>
    </BioHeading>
  )
}
