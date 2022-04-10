import Dropdown from "./Dropdown";

export default function Home() {
    return <div className="home">
        <div className="home__top">
            <div className="container grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-5 order-last md:order-1">
                    <div className="p-4 border-4 bg-cyan-700 rounded-lg border-cyan-700 ">
                        <Dropdown legend="I'm finding" />
                        <Dropdown legend='Marital status' />
                        <Dropdown legend='Jills' />
                        <Dropdown legend='Bio no.' />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-7 md:order-2">
                    <div className="">
                        <h1>যে ব্যক্তি বিয়ে করলো সে তার অর্ধেক দ্বীন পূর্ণ করে ফেললো। বাকি অর্ধেকের জন্য সে আল্লাহকে ভয় করুক।</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
