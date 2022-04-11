
export default function ColoredHeader({ heading }) {
  return <h1 className="coloredHeader bg-gradient-to-r from-rose-600 to-pink-600 h-40 text-center text-white text-4xl flex justify-center items-center">
    {heading}
  </h1>
}
