import ProfileRoutes from './ProfileRoutes'
import SideCard from 'components/bio/SideCard'

export default function ProfileLayout({ children, data, loading }) {
  return (
    <div
      className='container3 sm:container my-8'
      style={{ minHeight: '60vh' }}
    >
      <div className='profile__grid'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 lg:col-span-4'>
            <SideCard
              data={data}
              loading={loading}
            />
          </div>

          <div className='col-span-12 lg:col-span-8'>
            <ProfileRoutes />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
