import ColoredHeader from "../components/shared/ColoredHeader";

export default function Tutorials() {
  return <div className="tutorials">
    <ColoredHeader heading='টিউটোরিয়াল' />
    <div className="container2 minHeight">
      <h1 className="my-20 text-red-600 text-4xl text-center">মোবাইল দিয়ে বায়োডাটা তৈরির ভিডিও টিউটোরিয়াল</h1>
      <div className="box h-96 bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center text-white text-5xl">Video</div>
      <h1 className="my-20 text-red-600 text-4xl text-center">কম্পিউটার দিয়ে বায়োডাটা তৈরির ভিডিও টিউটোরিয়াল</h1>
      <div className="box h-96 bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center text-white text-5xl mb-10">Video</div>
    </div>
  </div>
}
