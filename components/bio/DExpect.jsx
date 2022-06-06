import BioHeading from './BioHeading'

export default function DExpect({
  data: {
    ex_year,
    ex_complexion,
    ex_height,
    ex_education,
    ex_jilla,
    ex_marrital_condition,
    ex_profession,
    ex_financial_condition,
    ex_family_condition,
    ex_features
  }
}) {
  return (
    <BioHeading heading='যেমন জীবনসঙ্গী আশা করেন'>
      <div className='item'>
        <span>বয়স</span>
        <span>{ex_year}</span>
      </div>
      <div className='item'>
        <span>গাত্রবর্ণ </span>
        <span>{ex_complexion}</span>
      </div>
      <div className='item'>
        <span>নূন্যতম উচ্চতা </span>
        <span>{ex_height}</span>
      </div>
      <div className='item'>
        <span>নূন্যতম শিক্ষাগত যোগ্যতা </span>
        <span>{ex_education}</span>
      </div>
      <div className='item'>
        <span>জেলা </span>
        <span>{ex_jilla}</span>
      </div>
      <div className='item'>
        <span>বৈবাহিক অবস্থা </span>
        <span>{ex_marrital_condition}</span>
      </div>
      <div className='item'>
        <span>পেশা </span>
        <span>{ex_profession}</span>
      </div>
      <div className='item'>
        <span>অর্থনৈতিক অবস্থা </span>
        <span>{ex_financial_condition}</span>
      </div>
      <div className='item'>
        <span>পারিবারিক অবস্থা</span>
        <span>{ex_family_condition}</span>
      </div>
      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>
          জীবনসঙ্গীর যে বৈশিষ্ট্য বা গুণাবলি আশা করেন
        </div>
        <div className='pt-1 whitespace-pre-wrap'>{ex_features}</div>
      </div>
    </BioHeading>
  )
}
