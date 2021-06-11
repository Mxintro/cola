import {useEffect} from 'react'

export default function useValueChange(
  value: string,
  onSearch: (value: string) => void
) {
  useEffect(()=> {
    onSearch(value)
  },[value])
}