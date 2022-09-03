import BioInfoCard from 'components/bio/BioInfoCard'

export default function ProfileLayout({ children, data, loading }) {
  return (
    <div className='container my-8' style={{ minHeight: '60vh' }}>
      <div className='profile__grid'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 md:col-span-4'>
            <BioInfoCard data={data} loading={loading} uId={data?.user?.uId} />
          </div>

          <div className='col-span-12 md:col-span-8'>{children}</div>
        </div>
      </div>
    </div>
  )
}
