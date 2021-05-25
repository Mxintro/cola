import React, { useState, useEffect, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
import Icon from '../Icon'
import classNames from 'classnames'
import useDebounce from '../../hooks/useDebounce'

// 用户可定义数据源类型
interface dataBase {
  value: string
}
export type DataSourceType<T = {}> = T & dataBase
export interface AutoCompleteProps extends InputProps {
  fetchSuggestions?: (value: string) => DataSourceType[] | Promise<DataSourceType[]>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  // 自定义模板
  renderOption?: (data: DataSourceType) => React.ReactElement
}


export const AutoComplete: React.FC<AutoCompleteProps> = ({
  value,
  fetchSuggestions,
  onChange,
  style,
  renderOption,
  ...restProps
}) => {

  // 只在最顶层使用 Hook, 不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。
  // 遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。
  const [inputValue, setValue] = useState<string>(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [showDropdown, setshowDropdown] = useState<boolean>(false)
  const [Loading, setLoading] = useState<boolean>(false)
  const [highlightIndex, sethighlightIndex] = useState<number>(-1)
  // 解决选中后，持续加载问题
  const isSelected = useRef(false)
  // 输入防抖
  const debounceValue = useDebounce(inputValue, 200)

  useEffect(() => {
    setSuggestions([])
    if (debounceValue && fetchSuggestions && !isSelected.current) {
      const result = fetchSuggestions(debounceValue)

      if (result instanceof Promise) {
        setLoading(true)
        result.then(res => {
          setLoading(false)
          setSuggestions(res)
          if (res.length > 0) {
            setshowDropdown(true)
          }
        })
      } else {
        setSuggestions(result)
        if (result.length > 0) {
          setshowDropdown(true)
        }
      }
    } else {
      setshowDropdown(false)
    }
    isSelected.current = false
  }, [debounceValue]) // 跳过effect，如果debounceValue没变

  // 处理输入
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim()
    setValue(value)
  }

  const handleOnSelect = (sel: DataSourceType) => {
    isSelected.current = true
    setshowDropdown(false)
    setValue(sel.value)
  }

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> ) => {
    console.log(e.code)
    switch(e.code) {
      case 'ArrowDown':
        sethighlightIndex(highlightIndex+1)
        break
      case 'ArrowUp':
        sethighlightIndex(highlightIndex-1)
        break
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleOnSelect(suggestions[highlightIndex])
        }
        break
      case 'Escape':
        setshowDropdown(false)
        break
      default:
        break
    }

  }


  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    console.log(suggestions, showDropdown)
    return (
      <Transition
        in={showDropdown}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className="cola-suggestion-list">
        { Loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin/>
            </div>
          }
          {
            suggestions.map((item, index) => {
              const cnames = classNames('suggestion-item', {
                'is-active': index === highlightIndex
              })
              return <li
                key={index}
                className={cnames}
                onClick={() => handleOnSelect(item)}
                >
                {renderTemplate(item)}
                </li>
            })
          }
        </ul>
      </Transition>
    )
  }
 
  return (
    <div style={style} className="cola-auto-complete">
      <Input 
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
        {...restProps}></Input>
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete