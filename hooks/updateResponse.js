export default function updateResponse(info, mutate) {
  if (info.message === 'ok') {
    mutate()
    typeof window !== 'undefined' &&
      window.scroll({
        top: 100,
        left: 100,
        behavior: 'smooth'
      })
  }
}
