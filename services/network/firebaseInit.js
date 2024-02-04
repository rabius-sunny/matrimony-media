import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: 'jannatijuti-79830.firebaseapp.com',
  projectId: 'jannatijuti-79830',
  storageBucket: 'jannatijuti-79830.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSERNDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
