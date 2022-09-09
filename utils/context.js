import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [errorState, setErrorState] = useState(null)
  const [routes, setRoutes] = useState({
    primary: {
      name: 'প্রাথমিক',
      link: '/primary',
      status: ''
    },
    personal: {
      name: 'ব্যক্তিগত তথ্য',
      link: '/personal-info',
      status: ''
    },
    marriage: {
      name: 'বিয়ে সংক্রান্ত তথ্য',
      link: '/marriage-related-info',
      status: ''
    },
    general: {
      name: 'সাধারণ তথ্য',
      link: '/general-info',
      status: ''
    },
    family: {
      name: 'পারিবারিক তথ্য',
      link: '/family-info',
      status: ''
    },
    address: {
      name: 'ঠিকানা',
      link: '/address',
      status: ''
    },
    education: {
      name: 'শিক্ষাগত যোগ্যতা',
      link: '/educational-qualifications',
      status: ''
    },
    another: {
      name: 'অন্যান্য তথ্য',
      link: '/others-info',
      status: ''
    },
    expectation: {
      name: 'যেমন জীবনসঙ্গী আশা করেন',
      link: '/expectation',
      status: ''
    },
    // authority: {
    //   name: 'কর্তৃপক্ষের জিজ্ঞাসা',
    //   link: '/authority-question',
    // status: ''
    // },
    contact: {
      name: 'যোগাযোগ',
      link: '/contact-info',
      status: ''
    },
    contact: {
      name: 'যোগাযোগ',
      link: '/contact-info',
      status: ''
    }
  })

  return (
    <AppContext.Provider
      value={{ errorState, setErrorState, routes, setRoutes }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
