import { useCallback, useEffect, useState } from 'react'

function ScreenSize() {
  const [innerWidth, setInnerWidth] = useState(null)
  const [innerHeight, setInnerHeight] = useState(null)

  const fetchWindowInnerSize = useCallback(() => {
    setInnerWidth(window.innerWidth)
    setInnerHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    fetchWindowInnerSize()

    window.addEventListener('resize', fetchWindowInnerSize)

    return () => window.removeEventListener('resize', fetchWindowInnerSize)
  }, [fetchWindowInnerSize])

  return (
    <div>
      <div>window.innerWidth: {innerWidth}</div>
      <div>window.innerHeight: {innerHeight}</div>
    </div>
  )
}

export default ScreenSize
