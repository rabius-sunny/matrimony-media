import BioHeading from './BioHeading'

export default function DAnother({
  auth,
  data: { profession_info, special_acknowledgement }
}) {
  return (
    <BioHeading
      heading='অন্যান্য তথ্য'
      link={auth && '/others-info'}
    >
      {profession_info && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>পেশা সম্পর্কিত তথ্য</div>
          <div className='pt-1 whitespace-pre-wrap'>{profession_info}</div>
        </div>
      )}
      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>বিশেষ কিছু যদি জানাতে চান</div>
        <div className='pt-1 whitespace-pre-wrap'>
          {special_acknowledgement}
        </div>
      </div>
    </BioHeading>
  )
}
