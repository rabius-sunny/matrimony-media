import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: 'matrimony-media.firebaseapp.com',
  projectId: 'matrimony-media',
  storageBucket: 'matrimony-media.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSERNDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
