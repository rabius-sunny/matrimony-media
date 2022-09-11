import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'
import useAsync from 'hooks/useAsync'
import userRequest from 'services/userRequest'

export default function Featured() {
  const { data, error, isLoading } = useAsync(userRequest.getFeatureds)

  if (isLoading) {
    return (
      <div className='container my-4'>
        <CardSkeleton />
      </div>
    )
  } else if (
    (!isLoading && data !== null && !data.bios.length) ||
    data === null
  ) {
    return (
      <div className='mt-8 container'>
        <h1 className='text-3xl text-center text-red-500 font-bold'>
          No featured biodata yet. {error?.message}
        </h1>
      </div>
    )
  } else if (data.bios && data.bios.length >= 1) {
    return (
      <div className='my-4'>
        <div className='my-4'>
          <div className='grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8'>
            {data.bios.map((bio, i) => (
              <BioCard key={i} bio={bio} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
