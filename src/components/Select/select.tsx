import React, { useState, useEffect, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
import { OptionProps } from '../Option/option'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'

// 用户可定义数据源类型

export interface SelectProps extends Omit<InputProps, 'onSelect'> {
  onSelect?: (value: string | number) => void,
  // 自定义模板
  defaultValue?: string | number,
  // children?: React.FunctionComponent<OptionProps>
}


export const Select: React.FC<SelectProps> = ({
  onSelect,
  defaultValue='',
  style,
  children,
  ...restProps
}) => {

  const [value, setValue] = useState<string | number>(defaultValue)
  const [showDropdown, setshowDropdown] = useState<boolean>(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)

  const selectOptions: Array<string | number> = []

  const thisComp = useRef<HTMLDivElement>(null)
  useClickOutside(thisComp, ()=> {
    setshowDropdown(false)
  })


  const highLight = (index: number) => {
    console.log(index)

    const childrenLength = selectOptions.length

    if (index < 0) index = childrenLength-1
    if (index > childrenLength-1) {
      index = 0
    }
    setHighlightIndex(index)
  }

  // 处理键盘事件
  const handleKeyDown:React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    console.log(selectOptions)
    console.log(e.code)
    switch(e.code) {
      case 'ArrowDown':
        highLight(highlightIndex+1)
        break
      case 'ArrowUp':
        highLight(highlightIndex-1)
        break
      case 'Enter':
        selectOptions[highlightIndex] && handleOptionClick(selectOptions[highlightIndex])
        break
      case 'Escape':
        setshowDropdown(false)
        break
      default:
        break
    }
  }

  const handleOptionClick = (value: string | number) => {
    setValue(value)
    onSelect && onSelect(value)
  }

  const addOption = (value: string | number) => {
    selectOptions.push(value)
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
              if (childEl.type.name === 'Option') {
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
    <div style={style} className="cola-select" ref={thisComp}> 
      <Input 
        readOnly
        icon="chevron-down"
        onClick={() => setshowDropdown(!showDropdown)}
        value={value}
        onKeyDown={handleKeyDown}
        {...restProps}></Input>
      {generateDropdown()}
    </div>
  )
}

export default Select