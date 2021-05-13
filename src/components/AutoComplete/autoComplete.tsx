import React, { useState } from 'react'
import Input, { InputPorps } from '../Input/input'

export interface Props extends InputPorps {
  fetchSugestions?: (value: string) => string[],
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}


export const AutoComplete: React.FC<Props> = ({
  value,
  fetchSugestions,
  onChange,
  ...res
}) => {

  const [inputValue, setValue] = useState<string>(value as string)
  const [sugestions, setSugestions] = useState<string[]>([])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim()
    setValue(value)
    if (value) {
      const result = fetchSugestions && fetchSugestions(value as string)
      setSugestions(result as string[])
    } else {
      setSugestions([])
    }
  }

  return (
    <div>
      <Input
        onChange={handleChange}
      ></Input>
    </div>
  )
}

export default AutoComplete