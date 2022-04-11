export default function Footer() {
  return <footer>
    <section className="bg-gradient-to-r from-rose-600 to-pink-600">
      <div className="container">
        <div className="top">
          <div className="grid grid-cols-2">
            <div className="col-span-2 pb-8 md:pb-0 md:col-span-1 text-center md:text-left">
              <span className="text-2xl text-white">
                &copy; 2022-2023 | matrimonysite.com
              </span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="links text-center md:text-right">
                <span className="text-xl md:text-2xl text-white">Facebook page</span>
                <span className="text-xl md:text-2xl text-white">Facebook group</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom text-center pt-10">
          <span className="text-white">Privacy Policy</span>
          <span className="text-white">Terms & Conditions</span>
        </div>
      </div>
    </section>
  </footer>
}
