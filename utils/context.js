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
      name: 'ব্যক্তিগত',
      link: '/personal-info',
      status: ''
    },
    marriage: {
      name: 'বিয়েসংক্রান্ত',
      link: '/marriage-related-info',
      status: ''
    },
    general: {
      name: 'সাধারণ',
      link: '/general-info',
      status: ''
    },
    family: {
      name: 'পারিবারিক',
      link: '/family-info',
      status: ''
    },
    address: {
      name: 'ঠিকানা',
      link: '/address',
      status: ''
    },
    education: {
      name: 'শিক্ষাগত',
      link: '/educational-qualifications',
      status: ''
    },
    another: {
      name: 'অন্যান্য',
      link: '/others-info',
      status: ''
    },
    expectation: {
      name: 'আকাঙ্ক্ষিত বৈশিষ্ট্যাবলী',
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
