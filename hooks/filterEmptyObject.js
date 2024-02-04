export default function filterEmptyProperties(obj) {
  const filteredObj = {}
  const emptyObject = {}

  for (const key in obj) {
    if (obj[key] !== '' && obj[key] !== 'undefined') {
      filteredObj[key] = obj[key]
    } else {
      emptyObject[key] = obj[key]
    }
  }

  return { filteredObj, emptyObject }
}
