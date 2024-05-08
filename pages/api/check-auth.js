import authOptions from 'configs/authOptions'
import { getServerSession } from 'next-auth/next'
import CryptoJS from 'crypto-js'

export default async function GET(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.json({ auth: false })
  }
  /** @TODO encrypt the email before sending */
  const encrypted = CryptoJS.AES.encrypt(
    session.user.email,
    process.env.CRYPTO_SECRET
  ).toString()
  return res.json({
    auth: true,
    data: encrypted
  })
}
