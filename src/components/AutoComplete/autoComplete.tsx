import React, { useState } from 'react'
import Input, { InputPorps } from '../Input/input'
import Transition from '../Transition/transition'


export interface Props extends InputPorps {
  fetchSugestions?: (value: string) => string[],
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}


export const AutoComplete: React.FC<Props> = ({
  value,
  fetchSugestions,
  onChange,
  style,
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

  // const generateDropdown = () => {
  //   return (
  //     <Transition
  //       in={}
  //     >
  //       <ul className="cola-suggestion-list">
  //         {
  //           sugestions.length>0 ? '' :
  //           sugestions.map(item => {
  //             <li>{item}</li>
  //           })
  //         }
  //       </ul>
  //     </Transition>
  //   )
  // }
 
  return (
    <div style={style}>
      <Input
        onChange={handleChange}
      ></Input>
    </div>
  )
}

export default AutoComplete