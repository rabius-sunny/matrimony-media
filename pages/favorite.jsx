import ColoredHeader from "../components/shared/ColoredHeader";

export default function Favorite() {
    return <div>
        <ColoredHeader heading='ফেভারিট বায়োডাটাসমূহ' />
        <div className="container2 minHeight">
            <hr className="my-10" />
            <div className="aboutus__text">
                <p className="text-3xl text-center">আপনার প্রিয় বায়োডাটাসমূহ</p>
            </div>
            <hr className="my-10" />
        </div>
    </div>
}
