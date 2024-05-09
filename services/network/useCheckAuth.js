import authOptions from 'configs/authOptions'
import { getServerSession } from 'next-auth/next'
import CryptoJS from 'crypto-js'

export default async function useCheckAuth() {
  const session = await getServerSession(authOptions)

  console.log('session', session)

  if (!session) {
    return { data: { auth: false } }
  }
  const encrypted = CryptoJS.AES.encrypt(
    session.user.email,
    process.env.CRYPTO_SECRET
  ).toString()
  return {
    data: {
      auth: true,
      data: encrypted
    }
  }
}
