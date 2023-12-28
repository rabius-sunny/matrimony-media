import BioHeading from './BioHeading'

export default function DMarital({
  auth,
  data: {
    type,
    condition,
    whenDiedWife,
    whenDiedHusband,
    divorceInfo,
    reMarryReason,
    marry_reason,
    guardians_permission,
    family_planning,
    education_after_marriage,
    job_after_marriage,
    demand
  }
}) {
  return (
    <BioHeading
      heading='বিয়ে সংক্রান্ত তথ্য'
      link={auth && '/marriage-related-info'}
    >
      {whenDiedWife && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>
            আপনার স্ত্রী কবে, কিভাবে মারা গিয়েছিল ?
          </div>
          <div className='pt-1 whitespace-pre-wrap'>{whenDiedWife}</div>
        </div>
      )}
      {divorceInfo && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>আপনার ডিভোর্সের সময়কাল ও কারণ</div>
          <div className='pt-1 whitespace-pre-wrap'>{divorceInfo}</div>
        </div>
      )}
      {whenDiedHusband && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>
            আপনার স্বামী কবে, কিভাবে মারা গিয়েছিল?
          </div>
          <div className='pt-1 whitespace-pre-wrap'>{whenDiedHusband}</div>
        </div>
      )}
      {reMarryReason && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>
            বিবাহিত অবস্থায় আবার কেন বিয়ে করতে চাচ্ছেন ?
          </div>
          <div className='pt-1 whitespace-pre-wrap'>{reMarryReason}</div>
        </div>
      )}

      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>
          বিয়ে কেন করছেন? বিয়ে সম্পর্কে আপনার ধারণা কি?
        </div>
        <div className='pt-1 whitespace-pre-wrap'>{marry_reason}</div>
      </div>

      {condition !== 'বিবাহিত' && (
        <div className='item'>
          <span>অভিভাবক আপনার বিয়েতে রাজি কি না?</span>
          <span>{guardians_permission}</span>
        </div>
      )}

      {type === 'পাত্রের বায়োডাটা' ? (
        <>
          <div className='pl-3 items py-2'>
            <div className='pb-2 font-bold'>
              বিয়ের পর স্ত্রীকে নিয়ে আপনার পরিকল্পনা বিস্তারিত লিখুন
            </div>
            <div className='pt-1 whitespace-pre-wrap'>{family_planning}</div>
          </div>
          <div className='item'>
            <span>পাত্রীপক্ষের কাছে যৌতুক/উপহার/অর্থ আশা করবেন কিনা?</span>
            <span>{demand}</span>
          </div>
        </>
      ) : (
        <>
          <div className='item'>
            <span>আপনি কি বিয়ের পর পড়াশোনা করতে ইচ্ছুক?</span>
            <span>{education_after_marriage}</span>
          </div>
          <div className='item'>
            <span>আপনি কি বিয়ের পর চাকরি করতে ইচ্ছুক?</span>
            <span>{job_after_marriage}</span>
          </div>
        </>
      )}
    </BioHeading>
  )
}
