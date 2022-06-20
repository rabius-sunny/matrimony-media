import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [errorState, setErrorState] = useState(null)

  return (
    <AppContext.Provider value={{ errorState, setErrorState }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
