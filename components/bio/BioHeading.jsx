export default function BioHeading({ heading, children }) {
  return (
    <div className='rounded-t-md overflow-hidden'>
      <div className='border-x-4 border-b-4 border-red-500'>
        <h1 className='bg-red-500 text-white text-3xl p-4'>{heading}</h1>
        <div className='p-4 item__holder'>{children}</div>
      </div>
    </div>
  )
}
