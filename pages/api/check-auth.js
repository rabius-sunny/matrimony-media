import authOptions from 'configs/authOptions'
import { getServerSession } from 'next-auth/next'

export default async function GET(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.json({ auth: false })
  }
  /** @TODO encrypt the email before sending */
  return res.json({
    auth: true,
    data: session.user.email
  })
}
