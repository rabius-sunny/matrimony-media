import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import { ChatAlt2Icon } from '@heroicons/react/solid'

export default function Layout({ children }) {
  return (
    <div className='relative'>
      <header>
        <nav>
          <Navigation />
        </nav>
      </header>
      {children}
      {/* <div className="fixed bottom-10 right-10">
            <ChatAlt2Icon className='bg-blue-600 text-white h-16 w-16 lg:h-20 lg:w-20 rounded-full p-2' />
        </div> */}
      <Footer />
    </div>
  )
}
