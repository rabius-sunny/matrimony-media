export default function Footer() {
  return <footer>
    <section className="bg-gradient-to-r from-rose-600 to-pink-600">
      <div className="container">
        <div className="grid grid-cols-5">

          <div className="col-span-3 lg:col-span-2">
            <h2 className="text-xl mb-4 text-white font-bold">Pages</h2>
            <ul>
              <li>ফেভারিট</li>
              <li>প্রশ্নোত্তর</li>
              <li>আমাদের সম্পর্কে</li>
              <li>যোগাযোগ</li>
            </ul>
          </div>
          <div className="col-span-2">
            <div className="">
              <h2 className="text-xl mb-4 text-white font-bold">Important Links</h2>
              <ul>
                <li>importantlink.com</li>
                <li>importantlink.com</li>
                <li>importantlink.com</li>
                <li>importantlink.com</li>
              </ul>
            </div>
          </div>
          <div className="col-span-5 mt-8 lg:mt-0 text-center lg:text-left lg:col-span-1">
            <div className="">
              <h2 className="text-xl mb-4 text-white font-bold">Important Links</h2>
              <ul className='underline'>
                <li>Blog title goes here, blog title goes here</li>
                <li>Blog title goes here, blog title goes here</li>
                <li>Blog title goes here, blog title goes here</li>
                <li>Blog title goes here, blog title goes here</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
}
