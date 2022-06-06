import BioHeading from './BioHeading'

export default function DAddress({ data }) {
  return (
    <BioHeading heading='ঠিকানা'>
      <div className='item'>
        <span>স্থায়ী ঠিকানা</span>
        <span>{data.permanent_address}</span>
      </div>
      <div className='item'>
        <span>বর্তমান ঠিকানা</span>
        <span>{data.current_address}</span>
      </div>
      <div className='item'>
        <span>কোথায় বড় হয়েছেন</span>
        <span>{data.where_lived}</span>
      </div>
    </BioHeading>
  )
}
