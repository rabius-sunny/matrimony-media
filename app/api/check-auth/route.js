import authOptions from 'configs/authOptions'
import { getServerSession } from 'next-auth/next'
import CryptoJS from 'crypto-js'

export async function GET(req, res) {
  console.log('session not comming')
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ auth: false })
  }
  const encrypted = CryptoJS.AES.encrypt(
    session.user.email,
    process.env.CRYPTO_SECRET
  ).toString()
  return Response.json({
    auth: true,
    data: encrypted
  })
}
