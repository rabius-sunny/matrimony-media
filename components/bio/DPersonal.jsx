import BioHeading from './BioHeading'

export default function DPersonal({
  data: {
    type,
    dress,
    beard,
    dress_over_ankle,
    salat,
    salat_duration,
    maintain_mahram,
    can_tilawat,
    mazhab,
    political_view,
    drama_cinnema,
    disease,
    deeni_effort,
    murid_of_peer,
    majar_view,
    favorite_books,
    favorite_scholars,
    special_qualifications,
    about_me
  }
}) {
  return (
    <BioHeading heading='ব্যক্তিগত তথ্য'>
      {type === 'পাত্রের বায়োডাটা' && (
        <>
          <div className='item'>
            <span>সুন্নতি দাঁড়ি আছে কি?</span>
            <span>{beard}</span>
          </div>
          <div className='item'>
            <span>কাপড় পায়ের টাখনুর পড়েন?</span>
            <span>{dress_over_ankle}</span>
          </div>
        </>
      )}
      <div className='item'>
        <span>
          {type === 'পাত্রের বায়োডাটা'
            ? 'ঘরের বাইরে সাধারণত কী ধরণের পোশাক পড়েন'
            : 'ঘরের বাইরে সাধারণত কী ধরণের পোশাক পড়েন (পর্দার বিবরণ)'}
        </span>
        <span>{dress}</span>
      </div>

      <div className='item'>
        <span>প্রতিদিন পাঁচ ওয়াক্ত সালাত পড়া হয়?</span>
        <span>{salat}</span>
      </div>
      <div className='item'>
        <span>নিয়মিত কত সময় যাবত সালাত পড়ছেন?</span>
        <span>{salat_duration}</span>
      </div>
      <div className='item'>
        <span>মাহরাম/গায়রে-মাহরাম মেনে চলেন কি?</span>
        <span>{maintain_mahram}</span>
      </div>
      <div className='item'>
        <span>শুদ্ধভাবে কুরআন তিলাওয়াত করতে পারেন?</span>
        <span>{can_tilawat}</span>
      </div>
      <div className='item'>
        <span>কোন মাযহাব অনুসরণ করেন?</span>
        <span>{mazhab}</span>
      </div>
      <div className='item'>
        <span>কোনো রাজনৈতিক দর্শন থাকলে লিখুন</span>
        <span>{political_view}</span>
      </div>
      <div className='item'>
        <span>নাটক/সিনেমা/সিরিয়াল/গান এসব দেখেন বা শুনেন?</span>
        <span>{drama_cinnema}</span>
      </div>
      <div className='item'>
        <span>মানসিক বা শারীরিক কোনো রোগ আছে কি?</span>
        <span>{disease}</span>
      </div>
      <div className='item'>
        <span>আপনি কি কোনো পীরের মুরিদ?</span>
        <span>{murid_of_peer}</span>
      </div>
      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>
          দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন?
        </div>
        <div className='pt-1'>{deeni_effort}</div>
      </div>
      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>
          মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?
        </div>
        <div className='pt-1 whitespace-pre-wrap'>{majar_view}</div>
      </div>
      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>
          আপনার পছন্দের অন্তত ৩ টি ইসলামী বইয়ের নাম লিখুন
        </div>
        <div className='pt-1'>{favorite_books}</div>
      </div>
      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>
          আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন
        </div>
        <div className='pt-1'>{favorite_scholars}</div>
      </div>
      {special_qualifications && (
        <div className='pl-3 items py-2'>
          <div className='pb-2 font-bold'>
            বিশেষ দ্বীনি বা দুনিয়াবি যোগ্যতা (যদি থাকে)
          </div>
          <div className='pt-1 whitespace-pre-wrap'>
            {special_qualifications}
          </div>
        </div>
      )}
      <div className='pl-3 items py-2'>
        <div className='pb-2 font-bold'>নিজের সম্পর্কে কিছু লিখুন</div>
        <div className='pt-1 whitespace-pre-wrap'>{about_me}</div>
      </div>
    </BioHeading>
  )
}
