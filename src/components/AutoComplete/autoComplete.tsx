import * as React from 'react'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'
import { debounce } from '../../utils/utils'
import { OptionProps, OptionValueType } from '../Option'

const { useState, useEffect, useRef, useCallback } = React

// 用户可定义数据源类型
export type DataSourceType<T = {}> = T & OptionValueType

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 搜索补全项的时候调用
   */
  onSearch: (value: string) => void,
  /**
   * 被选中时调用，参数为选中项的value值
   */
  onSelect?: (value: string) => void,
  /**
   * 数据化配置选项内容
   */
   options?: Array<DataSourceType> 
}

// showDropdown会直接使children不渲染
// 渲染问题：renderOption自定义渲染，用state不好处理叠加问题，不用state渲染不对
// options由外部传入，减少组件复杂度，获取数据更灵活
export const AutoComplete: React.FC<AutoCompleteProps> = ({
  value,
  options,
  onSearch,
  onSelect,
  style,
  children,
  ...restProps
}) => {

  const [inputValue, setValue] = useState<DataSourceType>({value: ''})
  
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  // const [Loading, setLoading] = useState<boolean>(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  // 默认false传入数据，true为自定义Option渲染
  const renderMode = useRef<boolean>(typeof options === 'undefined')
  
  // 解决选中后，持续加载问题
  const isSelected = useRef(false)
  // 组件本身
  const thisComp = useRef<HTMLDivElement>(null)
  useClickOutside(thisComp, ()=> {
    setShowDropdown(false)
  })

  // 尝试不用state？
  const renderOptions: DataSourceType[] = (renderMode.current || typeof options === 'undefined') ? [] : [...options]

  const childLength = React.Children.count(children)
  useEffect(() => {
    if (renderMode.current || typeof options === 'undefined') {
      setShowDropdown(childLength > 0)
    } else {
      setShowDropdown(options.length > 0)
    }
    isSelected.current=false
  },[options, childLength]) 

  // 点击也可以实现收放
  const handleOnClick = () => {
    if (renderOptions.length > 0) {
      setShowDropdown(!showDropdown)
    } 
  }

  // 防抖利用useCallback 或者 useRef 返回唯一回调
  const debounceSearch = useCallback(
    debounce((value: string)=>{
      onSearch(value)
    }, 200),
    [],
  )

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      const value = e.target.value.trim()
      setValue({value})
      if (value) {
        debounceSearch(value)
      } else {
        setShowDropdown(false)
        onSearch(value)
      }
    }

  const handleOnSelect = (sel: DataSourceType) => {
    isSelected.current = true
    setShowDropdown(false)
    setValue(sel)
    onSelect && onSelect (sel.value)
  }

  // 处理键盘事件
  const highLight = (index: number) => {
    const childrenLength = renderOptions.length
    if (index < 0) index = childrenLength-1
    if (index > childrenLength-1) {
      index = 0
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> ) => {
    switch(e.code) {
      case 'ArrowDown':
        highLight(highlightIndex+1)
        break
      case 'ArrowUp':
        highLight(highlightIndex-1)
        break
      case 'Enter':
        if (renderOptions.length>0) {
          setShowDropdown(!showDropdown)
        } else {
          renderOptions[highlightIndex] && handleOnSelect(renderOptions[highlightIndex])
        }
        break
      case 'Escape':
        setShowDropdown(false)
        break
      default:
        break
    }
  }

  // 分options传入和 自定义Option组件传入两种情况
  const renderTemplate = () => {
    if (renderMode.current) {
      return React.Children.map(children, (child, index) => {
        const cnames = classNames('suggestion-item', {
          'is-active': index === highlightIndex
        })
        const childEl = child as React.FunctionComponentElement<OptionProps>
        if (!childEl?.type) {
          return 
        }

        if (childEl.type.displayName === 'Option') {
          // 解决渲染问题
          renderOptions.push({value: childEl.props.value})
          return (
            <li
            key={index}
            onMouseEnter={()=>setHighlightIndex(index)}
            className={cnames}
            >
            {React.cloneElement(childEl, {onClick: handleOnSelect})}
            </li>)
        } else {
          throw new Error('AutoComplete only accepts Opiton component as Children');
        }
      })
    } else {
      return options && options.map((item, index) => {
        const cnames = classNames('suggestion-item', {
          'is-active': index === highlightIndex
        })
        return <li
          key={index}
          className={cnames}
          onMouseEnter={()=>setHighlightIndex(index)}
          onClick={() => handleOnSelect(item)}
          >
          {item.value}
          </li>
      })
    }
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className="cola-suggestion-list">
          { renderTemplate()}
        </ul>
      </Transition>
    )
  }
 
  return (
    <div 
      style={style}
      className="cola-auto-complete"
      onClick={handleOnClick}
      ref={thisComp}> 
      <Input 
        onChange={handleChange}
        value={inputValue.value}
        onKeyDown={handleKeyDown}
        {...restProps}></Input>
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete