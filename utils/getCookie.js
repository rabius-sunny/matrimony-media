export function getCookie(name) {
  const cookieString = document.cookie
  console.log('doc cookie', document)
  if (!cookieString) return null

  const cookiePairs = cookieString.split(';')
  for (const pair of cookiePairs) {
    const [cookieName, cookieValue] = pair.split('=')
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue.trim())
    }
  }

  return null
}
