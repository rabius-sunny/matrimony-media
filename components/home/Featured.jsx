import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'
import useAsync from 'hooks/useAsync'
import userRequest from 'services/network/userRequest'

export default function Featured() {
  const { data, error, isLoading } = useAsync(
    '/get-featureds',
    userRequest.getFeatureds
  )

  return (
    <div>
      {isLoading || error ? (
        <div className='my-4'>
          <CardSkeleton />
        </div>
      ) : (
        <div className='my-4'>
          <div className='my-4'>
            <div className='grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8'>
              {data.bios.map((bio, i) => (
                <BioCard
                  key={i}
                  bio={bio}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
