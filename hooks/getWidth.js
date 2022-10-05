import { useEffect, useState } from 'react'

export default function getWidth() {
  const [width, setWidth] = useState({
    xs: false,
    md: false,
    lg: false
  })
  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth <= 500) {
        setWidth({ ...width, xs: true })
      } else if (window.innerWidth > 500 && window.innerWidth < 768) {
        setWidth({ ...width, md: true })
      } else if (window.innerWidth >= 768) {
        setWidth({ ...width, lg: true })
      }
    }
  }, [])
  return width
}
