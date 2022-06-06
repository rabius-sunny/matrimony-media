import BioHeading from './BioHeading'

export default function DAuthorityqs({
  data: { family_about_bio, is_correct_info, liability }
}) {
  return (
    <BioHeading heading='কর্তৃপক্ষের জিজ্ঞাসা'>
      <div className='item'>
        <span>এই ওয়েবসাইটে বায়োডাটা জমা দিচ্ছেন তা অভিভাবক জানেন? </span>
        <span>{family_about_bio}</span>
      </div>
      <div className='item'>
        <span>আল্লাহ'র শপথ করে সাক্ষ্য দিন, যে তথ্যগুলো দিচ্ছেন সব সত্য? </span>
        <span>{is_correct_info}</span>
      </div>
      <div className='item'>
        <span>
          কোনো মিথ্যা তথ্য দিয়ে থাকলে তার দুনিয়াবী ও আখিরাতের দায়ভার ওয়েবসাইট
          কর্তৃপক্ষ নিবে না। আপনি কি রাজি?
        </span>
        <span>{liability}</span>
      </div>
    </BioHeading>
  )
}
