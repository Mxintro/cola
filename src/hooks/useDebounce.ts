import { useState, useEffect } from 'react'

function useDebounce (value: any, delay: number) {
  const [debounceValue, setdebounceValue] = useState(value)
  // useEffect会在下次调用或销毁前执行上一次回调
  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debounceValue
}

export default useDebounce