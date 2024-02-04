import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'
import utilSlice from './utilSlice'
import dataSlice from './dataSlice'

const persistConfig = {
  key: 'state',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'gfdg3489^$%&#*@',
      onError: function (error) {
        console.error('Error encrypting data:', error)
      }
    })
  ],
  whitelist: ['util', 'data']
}

const rootReducer = combineReducers({
  util: utilSlice,
  data: dataSlice
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
