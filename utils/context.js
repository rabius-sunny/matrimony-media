import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [errorState, setErrorState] = useState(null)
  const [routes, setRoutes] = useState({
    primary: {
      name: 'প্রাথমিক',
      link: '/name',
      error: false
    },
    general: {
      name: 'সাধারণ তথ্য',
      link: '/general-info',
      error: false
    },
    address: {
      name: 'ঠিকানা',
      link: '/address',
      error: false
    },
    education: {
      name: 'শিক্ষাগত যোগ্যতা',
      link: '/educational-qualifications',
      error: false
    },
    family: {
      name: 'পারিবারিক তথ্য',
      link: '/family-info',
      error: false
    },
    personal: {
      name: 'ব্যক্তিগত তথ্য',
      link: '/personal-info',
      error: false
    },
    marriage: {
      name: 'বিয়ে সংক্রান্ত তথ্য',
      link: '/marriage-related-info',
      error: false
    },
    another: {
      name: 'অন্যান্য তথ্য',
      link: '/others-info',
      error: false
    },
    expectation: {
      name: 'যেমন জীবনসঙ্গী আশা করেন',
      link: '/expectation',
      error: false
    },
    authority: {
      name: 'কর্তৃপক্ষের জিজ্ঞাসা',
      link: '/authority-question',
      error: false
    },
    contact: {
      name: 'যোগাযোগ',
      link: '/contact-info',
      error: false
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
