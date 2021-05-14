import React, { useState } from 'react'
import Input, { InputPorps } from '../Input/input'
import Transition from '../Transition/transition'

// 用户可定义数据源类型
interface dataBase {
  value: string
}
export type DataSourceType<T = {}> = T & dataBase
export interface Props extends InputPorps {
  fetchSugestions?: (value: string) => DataSourceType[],
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  // 自定义模板
  renderOption?: (data: DataSourceType) => React.ReactElement
}


export const AutoComplete: React.FC<Props> = ({
  value,
  fetchSugestions,
  onChange,
  style,
  renderOption,
  ...res
}) => {

  // 只在最顶层使用 Hook, 不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。
  // 遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。
  const [inputValue, setValue] = useState<string>(value as string)
  const [sugestions, setSugestions] = useState<DataSourceType[]>([])
  const [showDropdown, setshowDropdown] = useState<boolean>(false)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim()
    setValue(value)
    let result: DataSourceType[] = []
    if (value) {
      result = fetchSugestions ? fetchSugestions(value as string) : []
    } 
    setSugestions(result)
    const show = sugestions.length > 0 
    setshowDropdown(show)
  }

  const handleOnSelect = (sel: DataSourceType) => {
    setValue(sel.value)
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    console.log(sugestions, showDropdown)
    return (
      <Transition
        in={showDropdown}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className="cola-suggestion-list">
          {
            sugestions.map((item, index) => {
              return <li key={index} onClick={() => handleOnSelect(item)}>{renderTemplate(item)}</li>
            })
          }
        </ul>
      </Transition>
    )
  }
 
  return (
    <div style={style}>
      <Input onChange={handleChange} value={inputValue}></Input>
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete