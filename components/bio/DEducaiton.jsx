import BioHeading from './BioHeading'

export default function DEducation({ data, auth }) {
  return (
    <BioHeading
      heading='শিক্ষাগত যোগ্যতা'
      link={auth && '/educational-qualifications'}
    >
      {data.education === 'জেনারেল' ? (
        <General data={data} />
      ) : (
        <Madrasha data={data} />
      )}
    </BioHeading>
  )
}

const General = ({ data }) => {
  return (
    <div>
      <div className='item'>
        <span>কোন মাধ্যমে পড়াশোনা করেছেন?</span>
        <span>{data.education}</span>
      </div>
      {/* -- Secondary -- */}
      <div className='item'>
        <span>মাধ্যমিক (SSC) / সমমান পাশ করেছেন</span>
        <span>{data.secondary}</span>
      </div>

      <div className='item'>
        <span>মাধ্যমিক (SSC) / সমমান এর বিস্তারিত</span>
        <span>{data.secondary_details}</span>
      </div>

      {/* -- Higher -- */}
      {data.secondary === 'হ্যা' && (
        <>
          <div className='item'>
            <span>উচ্চমাধ্যমিক (HSC) / সমমান পাশ করেছেন?</span>
            <span>{data.higher}</span>
          </div>
          <div className='item'>
            <span>
              {data.higher === 'ডিপ্লোমা পড়েছি'
                ? 'ডিপ্লোমা'
                : 'উচ্চমাধ্যমিক (HSC) / সমমান'}{' '}
              এর বিস্তারিত
            </span>
            <span>{data.higher_details}</span>
          </div>
        </>
      )}
      {/* -- Honors -- */}
      {data.higher === 'হ্যা' && (
        <div className='item'>
          <span>স্নাতক/স্নাতক(সম্মান)/সমমান শিক্ষাগত যোগ্যতা</span>
          <span>{data.honors_details}</span>
        </div>
      )}
      {/* -- Another Education -- */}
      <div className='item'>
        <span>সর্বোচ্চ শিক্ষাগত যোগ্যতা</span>
        <span>{data.highest_education}</span>
      </div>
      <div className='item'>
        <span>অন্যান্য শিক্ষাগত যোগ্যতা</span>
        <span>{data.another_education}</span>
      </div>
    </div>
  )
}

const Madrasha = ({ data }) => (
  <div>
    <div className='item'>
      <span>কোন মাধ্যমে পড়াশোনা করেছেন?</span>
      <span>{data.education}</span>
    </div>
    <div className='item'>
      <span>আপনি কি হাফেজ</span>
      <span>{data.hafej}</span>
    </div>

    {/* Dawra */}
    <div className='item'>
      <span>দাওরায়ে হাদীস পাশ করেছেন</span>
      <span>{data.dawra}</span>
    </div>
    <div className='item'>
      <span>দাওরায়ে হাদীস এর বিস্তারিত</span>
      <span>{data.dawra_details}</span>
    </div>

    {/* Takhassus */}
    {data.dawra === 'হ্যা' && (
      <>
        <div className='item'>
          <span>আপনি কি তাখাসসুস পড়েছেন</span>
          <span>{data.takhassus}</span>
        </div>
      </>
    )}

    {/* -- Another Education -- */}
    <div className='item'>
      <span>সর্বোচ্চ শিক্ষাগত যোগ্যতা</span>
      <span>{data.highest_education}</span>
    </div>
    <div className='item'>
      <span>অন্যান্য শিক্ষাগত যোগ্যতা</span>
      <span>{data.another_education}</span>
    </div>
  </div>
)
