import CSkeleton from './CSkeleton'

export default function CardSkeleton({ count }) {
  return (
    <div
      className='my-4'
      style={{ minHeight: '60vh' }}
    >
      <div className='grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8'>
        {Array(count || 6)
          .fill()
          .map((i, j) => j + 1)
          .map((item) => (
            <div
              key={item}
              className='col-span-12 sm:col-span-6 lg:col-span-4'
            >
              <CSkeleton
                duration={1.4}
                height={250}
                width={'100%'}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
