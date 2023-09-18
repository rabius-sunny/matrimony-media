import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import utilSlice from './utilSlice'

const persistConfig = {
  key: 'state',
  storage,
  whitelist: ['auth', 'cart', 'util']
}

const rootReducer = combineReducers({
  util: utilSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const state = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(state)

export default state
