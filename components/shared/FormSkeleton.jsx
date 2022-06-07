import CSkeleton from './CSkeleton'

export default function FormSkeleton() {
  return (
    <>
      <div className='my-3'>
        <CSkeleton duration={1} width={'100%'} height={130} />
      </div>
      <div className='my-3'>
        <CSkeleton duration={1} width={'100%'} height={130} />
      </div>
      <div className='my-3'>
        <CSkeleton duration={1} width={'100%'} height={130} />
      </div>
      <div className='my-3'>
        <CSkeleton duration={1} width={'100%'} height={130} />
      </div>
    </>
  )
}
