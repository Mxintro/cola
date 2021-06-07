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

type omitProps = 'onSelect' | 'onChange'
export interface SelectProps extends Omit<InputProps, omitProps> {
  /**
   * 被选中时调用，参数为选中项的value值
   */
  onSelect?: (value: string) => void,
  /**
   * 值改变时调用
   */
  onChange?: (value: string) => void,
  /**
   * 数据化配置选项内容
   */
   options?: Array<DataSourceType> ,
   /**
    * 默认选项
    */
   defaultValue?: string,
}

// showDropdown会直接使children不渲染
// 渲染问题：renderOption自定义渲染，用state不好处理叠加问题，不用state渲染不对
// options由外部传入，减少组件复杂度，获取数据更灵活
export const Select: React.FC<SelectProps> = ({
  value,
  options,
  onSelect,
  onChange,
  defaultValue='',
  style,
  children,
  readOnly=true,
  icon='chevron-down',
  ...restProps
}) => {


  const [inputValue, setValue] = useState<DataSourceType>({value: ''})
  
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  // const [Loading, setLoading] = useState<boolean>(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  // 默认false传入数据，true为自定义Option渲染
  const renderMode = useRef<boolean>(typeof options === 'undefined')
  // 记录是否是选中状态
  const isSelected = useRef(false)
  // 组件本身
  const thisComp = useRef<HTMLDivElement>(null)
  useClickOutside(thisComp, ()=> {
    setShowDropdown(false)
  })

  const renderOptions: DataSourceType[] = (renderMode.current || typeof options === 'undefined') ? [] : [...options]

  useEffect(() => {
    const index = renderOptions.findIndex(item => item.value===defaultValue)
    if ( index > -1){
      setValue({value: defaultValue})
      setHighlightIndex(index)
    }
  },[defaultValue]) 

  // 点击也可以实现收放
  const handleOnClick = () => {
    if (renderOptions.length > 0) {
      setShowDropdown(!showDropdown)
    } 
  }

  // 防抖利用useCallback 或者 useRef 返回唯一回调
  const debounceSearch = useCallback(
    debounce((value: string)=>{
      onChange && onChange(value)
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
        onChange && onChange(value)
      }
    }

  const handleOnSelect = (sel: DataSourceType) => {
    isSelected.current = true
    setShowDropdown(false)
    setValue(sel)
    onSelect && onSelect (sel.value)
    onChange && onChange(sel.value)
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
        // 针对第一次和选择后的特殊情况的收放
        if ((renderOptions.length > 0 && isSelected.current) || highlightIndex===-1) {
          setShowDropdown(!showDropdown)
          isSelected.current =false
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
        const cnames = classNames('select-item', {
          'is-active': index === highlightIndex
        })
        const childEl = child as React.FunctionComponentElement<OptionProps>
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
          throw new Error('Select only accepts Opiton component as Children');
        }
      })
    } else {
      return options && options.map((item, index) => {
        const cnames = classNames('select-item', {
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
        <ul className="cola-select-list">
          { renderTemplate()}
        </ul>
      </Transition>
    )
  }
 
  return (
    <div 
      style={style}
      className="cola-select"
      onClick={handleOnClick}
      ref={thisComp}> 
      <Input 
        readOnly={readOnly}
        icon={showDropdown ? 'search' : icon}
        className={showDropdown ? 'change-color':''}
        // 直接改变value不会调用onChange
        onChange={handleChange}
        value={inputValue.value}
        onKeyDown={handleKeyDown}
        {...restProps}>
      </Input>
      {generateDropdown()}
    </div>
  )
}

export default Select