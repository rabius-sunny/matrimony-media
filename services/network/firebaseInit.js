import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: 'jannatijuti-72629.firebaseapp.com',
  projectId: 'jannatijuti-72629',
  storageBucket: 'jannatijuti-72629.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSERNDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
