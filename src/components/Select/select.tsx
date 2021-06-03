import React, { useState, useEffect, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
import { OptionProps, OptionValueType } from '../Option'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'

// 用户可定义数据源类型

export interface SelectProps extends Omit<InputProps, 'onSelect'> {
  onSelect?: (value: string) => void,
  // 自定义模板
  defaultValue?: string,
  options?: Array<any>,
  // children?: React.FunctionComponent<OptionProps>
}


export const Select: React.FC<SelectProps> = ({
  onSelect,
  defaultValue='',
  style,
  children,
  ...restProps
}) => {

  const [value, setValue] = useState<OptionValueType>({value: defaultValue, describe: defaultValue})
  const [showDropdown, setshowDropdown] = useState<boolean>(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)

  const selectOptions: Array<OptionValueType> = []

  const thisComp = useRef<HTMLDivElement>(null)
  useClickOutside(thisComp, ()=> {
    setshowDropdown(false)
  })


  const highLight = (index: number) => {

    const childrenLength = selectOptions.length

    if (index < 0) index = childrenLength-1
    if (index > childrenLength-1) {
      index = 0
    }
    setHighlightIndex(index)
  }

  // 处理键盘事件
  const handleKeyDown:React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    console.log(e.code)
    switch(e.code) {
      case 'ArrowDown':
        highLight(highlightIndex+1)
        break
      case 'ArrowUp':
        highLight(highlightIndex-1)
        break
      case 'Enter':
        if (!showDropdown) {
          setshowDropdown(true)
        } else {
          selectOptions[highlightIndex] && handleOptionClick(selectOptions[highlightIndex])
        }
        break
      case 'Escape':
        setshowDropdown(false)
        break
      default:
        break
    }
  }

  //  
  const handleOptionClick = (value: OptionValueType) => {
    setValue(value)
    onSelect && onSelect(value.value)
    setshowDropdown(false)
  }

  // 获取Option的值
  const addOption = (option: OptionValueType) => {
    if (!option.describe){
      option.describe = option.value
    }
    selectOptions.push(option)
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className="cola-select-list">
          {
            React.Children.map(children, (child, index) => {
              const cnames = classNames('select-item', {
                'is-active': index === highlightIndex
              })
              const childEl = child as React.FunctionComponentElement<OptionProps>
              if (childEl.type.displayName === 'Option') {
                return (
                  <li
                  key={index}
                  className={cnames}
                  >
                  {React.cloneElement(childEl, {onClick: handleOptionClick, addOption: addOption })}
                  </li>)
              }
            })
          }
        </ul>
      </Transition>
    )
  }
 
  return (
    <div 
      style={style}
      onClick={() => setshowDropdown(!showDropdown)}
      className="cola-select" 
      ref={thisComp}> 
      <Input 
        readOnly
        icon="chevron-down"
        value={value.describe}
        onKeyDown={handleKeyDown}
        {...restProps}></Input>
      {generateDropdown()}
    </div>
  )
}

export default Select