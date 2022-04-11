import Disclosure from "../components/others/Disclosure";
import ColoredHeader from "../components/shared/ColoredHeader";

export default function Qa() {
  return <div className="qa">
    <ColoredHeader heading='প্রশ্নোত্তর' />
    <div className="mt-10">
      <div className="container2 minHeight">
        <Disclosure />
        <Disclosure />
        <Disclosure />
        <Disclosure />
        <Disclosure />
        <Disclosure />
        <Disclosure />
      </div>
    </div>
  </div>
}
