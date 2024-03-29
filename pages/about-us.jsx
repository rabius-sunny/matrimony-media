import Head from 'next/head'
import ColoredHeader from '../components/shared/ColoredHeader'
import image from 'public/images/homebg2.jpg'

export default function AboutUs() {
  return (
    <div className='aboutus'>
      <Head>
        <title>আমাদের সম্পর্কে | জান্নাতি জুটি.COM</title>
        <meta property='og:title' content='আমাদের সম্পর্কে' />
        <meta
          property='description'
          content='Jannati Juti is a bangladeshi matrimony website'
        />
        <meta
          property='og:description'
          content='Jannati Juti is a bangladeshi matrimony website'
        />
        <meta property='og:image' content={image} />
        <meta
          property='og:url'
          content='https://matrimony-media.vercel.app/about-us'
        />
      </Head>
      <ColoredHeader heading='আমাদের সম্পর্কে' />
      <div className='container2 minHeight'>
        <hr className='my-10' />
        <div className='aboutus__text'>
          <p>
            যাবতীয় সকল প্রশংসা মহান আল্লাহর জন্য, যিনি জগত সমূহের প্রতিপালক।
            সমস্ত প্রশংসা সেই মহান সত্তার, যিনি শেষ নবির উম্মত হিসেবে আমাদের
            কবুল করেছেন। দুরুদ ও সালাম বর্ষিত হোক শেষ নবি মুহাম্মাদ সাল্লাল্লাহু
            আলাইহি ওয়া সাল্লামের প্রতি।
          </p>
          <p>
            বিবাহ ইসলামের এমন এক বিধান, যা দেহ-মন,প্রজন্ম-সমাজ ও পরিবারের
            সুস্থতা নিশিচত করে। কুরআন-হাদীসের ভাষ্য অনুযায়ী মানব প্রজন্ম রক্ষার
            সাথে সাথে চরিত্র রক্ষা ও মনের প্রশান্তিলাভ করাও হচ্ছে বিবাহের অন্যতম
            প্রধান উদ্দেশ্য। যদি স্বামী অথবা স্ত্রী দুজনের মধ্যে কারো দ্বীনদারীর
            অভাব থাকে তাহলে এসব উদ্দেশ্যে হাসিল করা সম্ভব হয় না।
          </p>
          <p>
            বর্তমান সমাজে জিনা-ব্যাভিচার, অনৈতিক সম্পর্ক, পরকীয়া ইত্যাদি সহজলভ্য
            ও মহামারীর ন্যায় ছড়িয়ে পরেছে । অথচ দ্বীনদার পরিবার গঠনের সবচেয়ে
            গুরুত্বপূর্ণ মাধ্যম বিবাহ করা অত্যন্ত কঠিন হয়ে গিয়েছে। এবং যেসব
            ভাই-বোন পরিবারে দ্বীনি পরিবেশ না থাকা সত্ত্বেও কষ্ট করে দ্বীন পালনে
            চেষ্টা করেন, তারা নিজেদের বিবাহের সময় প্রতিকূল পরিস্থিতিতে পড়েন।
            দেখা যায় যে, পরিবার পাত্র-পাত্রী নির্বাচনে দ্বীন ব্যতিত সব বিষয়কেই
            যথাযথ গুরুত্ব প্রদান করে, যেখানে শরিয়তে দ্বীন ব্যতিত সবই গৌণ।
          </p>
          <p>
            এভাবে দ্বীনদার পাত্র-পাত্রীর সাথে বিবাহ না হলে, পরবর্তীতে বিবাহ
            পরবর্তী নতুন জীবনে নানাবিধ প্রতিকূলতার সম্মুখীন হওয়ার ঝুঁকিতে পড়েন।
            এতে দুনিয়ার শান্তি কিংবা দ্বীনের উপর অবিচলতা দুটোই হুমকির মুখে পড়ে
            যায়।
          </p>
          <p>
            এমতাবস্থায় আমরা কজন গুনাহগার বান্দা মুসলিম ভাই-বোনদের বিবাহের বিধান
            পালনে সহায়তা করতে এ উদ্যোগ নিয়েছি, যার মাধ্যমে দ্বীনের ব্যাপারে
            উদাসীন পরিবারের ভাই-বোনেরা এই প্লাটফর্মের মাধ্যমে দ্বীনদার
            পাত্র-পাত্রী সন্ধানের ক্ষেত্রে সর্বোচ্চ সহায়তা পাবেন ইন শা আল্লাহ।
            পাশাপাশি ধর্মীয় পরিবেশে যারা বড় হয়েছেন তাদের ক্ষেত্রেও এ ওয়েবসাইট
            সহায়ক হিসেবে কাজ করবে। আমাদের লক্ষ্য হচ্ছে, এ ওয়েবসাইটের মাধ্যমে
            বিয়ের জন্য শরিয়ত সম্মত এক সার্বিক প্লাটফর্ম গড়ে তোলা যার মাধ্যমে
            বিবাহের পথ কিছুটা হলেও সহজ হয়ে যাবে ইনশাআল্লাহ।
          </p>
          <p>
            আমরা আশা করছি যে, শরিয়াহ অনুসারে, অতি শীঘ্রই দেশব্যাপি এ খেদমত
            দক্ষতা ও দ্রুততার সাথে ছড়িয়ে দিতে পারবো। মহান আল্লাহ সুবহানাহু ওয়া
            তা’আলা আমাদের এ খেদমত কে সহজ করে দিন ও কবুল করুন। আমিন।
          </p>
        </div>
        <hr className='my-10' />
      </div>
    </div>
  )
}
