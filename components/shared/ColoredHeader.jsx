export default function ColoredHeader({ heading }) {
  return (
    <h1 className='coloredHeader h-40 text-center text-white bg-primary text-3xl md:text-5xl flex justify-center items-center'>
      {heading}
    </h1>
  )
}
