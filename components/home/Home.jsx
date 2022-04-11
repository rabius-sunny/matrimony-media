import { achieves } from "../../assets/fakedata";
import Hometext from "../others/Hometext";
import Dropdown from "./Dropdown";

export default function Home() {
    return <div className="home">
        <div className="home__top">

            <div className="container grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-5 order-last md:order-1">
                    <div className="hidden md:block px-8 py-2 border-4 bg-red-600 rounded-lg border-red-600 ">
                        <Dropdown legend="আমি খুঁজছি" />
                        <Dropdown legend='বৈবাহিক অবস্থা' />
                        <Dropdown legend='জেলা' />
                        <div>
                            <label className="block text-sm font-medium text-white mb-1" htmlFor="biono">বায়োডাটা নং.</label>
                            <input type="number"
                                className="shadow-md w-full mb-4 px-3 py-1 rounded focus:outline-red-800"
                            />
                        </div>
                        <div className="submit text-right">
                            <button className="hover:bg-red-100 bg-white text-red-600 px-4 py-2 rounded shadow-md">সার্চ করুন</button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-7 md:order-2">
                    <div className="">
                        <h1>যে ব্যক্তি বিয়ে করলো সে তার অর্ধেক দ্বীন পূর্ণ করে ফেললো। বাকি অর্ধেকের জন্য সে আল্লাহকে ভয় করুক।</h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="pt-10">
            <div className="container">
                <div className="block md:hidden px-8 py-2 border-4 bg-red-600 rounded-lg border-red-600 ">
                    <Dropdown legend="আমি খুঁজছি" />
                    <Dropdown legend='বৈবাহিক অবস্থা' />
                    <Dropdown legend='জেলা' />
                    <div>
                        <label className="block text-sm font-medium text-white mb-1" htmlFor="biono">বায়োডাটা নং.</label>
                        <input type="number"
                            className="shadow-md w-full mb-4 px-3 py-1 rounded focus:outline-red-800"
                        />
                    </div>
                    <div className="submit text-right">
                        <button className="hover:bg-red-100 bg-white text-red-600 px-4 py-2 rounded shadow-md">সার্চ করুন</button>
                    </div>
                </div>
            </div>
            <hr className="mt-10 md:hidden" />
        </div>

        <div className="home__options">
            <div className="container text-center py-28">
                <h1 className="mb-24">
                    <span className="py-8 px-8 sm:px-28 rounded bg-red-600 text-white text-lg sm:text-xl md:text-3xl">আপনার বায়োডাটা তৈরি করুন</span>
                </h1>
                <h2>
                    <span className="py-6 px-6 sm:px-20 rounded bg-red-500 text-white text-lg sm:text-lg md:text-2xl">কীভাবে বায়োডাটা তৈরি করবেন</span>
                </h2>
            </div>
        </div>

        <section className="home__achievements">
            <div className="container grid grid-cols-12 gap-4 text-center">
                {
                    achieves.map(acv => <div key={acv.id} className='col-span-6 lg:col-span-3'>
                        <img src={acv.img} alt="achievements" />
                        <h1 className="text-gray-600 py-4 text-3xl sm:text-6xl">{acv.number}</h1>
                        <p className="text-red-400 sm:text-2xl">{acv.text}</p>
                    </div>)
                }
            </div>
        </section>

        <section className="bg-gray-200">
            <div className="container">
                <h1 className="text-center text-red-600 text-3xl pb-6">
                    জীবনসঙ্গী নির্বাচনে ইসলামের নির্দেশনা
                </h1>
                <div className="flex justify-center">
                    <p style={{ maxWidth: '700px', textAlign: 'justify' }}>
                        <Hometext />
                    </p>
                </div>
            </div>
        </section>

    </div>
}
