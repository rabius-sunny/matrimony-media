import Navigation from './Navigation'
import Footer from './Footer'
import { useSelector } from 'react-redux'

export default function Layout({ children }) {
  const util = useSelector((state) => state.util)
  console.log('util', util)

  return (
    <div className='relative'>
      <header>
        {util.isHome && (
          <nav>
            <Navigation />
          </nav>
        )}
      </header>
      {children}
      {/* <div className="fixed bottom-10 right-10">
            <ChatAlt2Icon className='bg-blue-600 text-white h-16 w-16 lg:h-20 lg:w-20 rounded-full p-2' />
        </div> */}
      {util.isHome && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  )
}
