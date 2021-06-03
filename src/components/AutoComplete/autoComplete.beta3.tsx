import * as React from 'react'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
import Icon from '../Icon'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'
import { debounce } from '../../utils/utils'
import { OptionProps, OptionValueType } from '../Option'


const { useState, useEffect, useRef, useCallback, useReducer, useMemo } = React

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


type State = {
  inputValue: DataSourceType | undefined,
  showDropdown: boolean | undefined,
  highlightIndex: number | undefined,
  renderOptions: DataSourceType[],
  isSelected: boolean | undefined,
}

type ActionType = 'changeValue' | 'pushOptions'| 'selected' | 'sethighlightIndex'| 'setshowDropdown'| 'setOptions'
type Payload = {
  value?: DataSourceType,
  show?: boolean,
  selected?: boolean,
  highlightIndex?: number,
  options?: DataSourceType[],
}

type Action = {
  type: ActionType,
  payload?: Payload
}

const initState: State = {
  inputValue: {value:''},
  showDropdown: false,
  highlightIndex: -1,
  renderOptions: [],
  isSelected: false,
}

function acReducer(state: State, action: Action): State{
  const {type, payload} = action;
  switch(type) {
    case 'changeValue':
      return {
        ...state,
        inputValue: payload?.value
      }
    case 'pushOptions':
      return {
        ...state,
        renderOptions: (typeof payload?.value !=='undefined') ? [...state.renderOptions, payload.value] : [...state.renderOptions]
      }
    case 'selected':
      return {
        ...state,
        isSelected: payload?.selected,
        showDropdown: false,
        inputValue: payload?.value
      }
    case 'setshowDropdown':
      return {
        ...state,
        showDropdown: payload?.show
      }
    case 'sethighlightIndex':
      return {
        ...state,
        highlightIndex: payload?.highlightIndex
      }
    case 'setOptions':
    return {
      ...state,
      renderOptions: payload?.options ? [...payload?.options] : []
    }
  }
}

export const AcContext = React.createContext<React.Dispatch<Action>>((value: Action) => {});

// options由外部传入，减少组件复杂度，获取数据更灵活
export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  onSearch,
  onSelect,
  style,
  children,
  ...restProps
}) => {

  const [state, dispatch] = useReducer(acReducer, initState)
  const {inputValue, showDropdown, highlightIndex=-1, renderOptions, isSelected} = state
  // 自定义渲染还是数组渲染
  const renderMode = useRef<boolean>(typeof options === 'undefined')
  // 组件本身
  const thisComp = useRef<HTMLDivElement>(null)
  useClickOutside(thisComp, ()=> {
    dispatch({
      type: 'setshowDropdown',
      payload: {
        show: false
      }
    })
  })


  const childLength = React.Children.count(children)
  useEffect(()=> {
    if (renderMode.current) {
      dispatch({
        type: 'setOptions',
        payload: {
          options: []
        }
      })
      dispatch({
        type: 'setshowDropdown',
        payload: {
          show: childLength > 0
        }
      })
    } else {
      if (renderOptions.length > 0) {
        dispatch({
          type: 'setshowDropdown',
          payload: {
            show: true
          }
        })
      } else {
        dispatch({
          type: 'setshowDropdown',
          payload: {
            show: false
          }
        })
      }
    }
  }, [options, children])

  // 防抖利用useCallback 或者 useRef 返回唯一回调
  const debounceSearch = useCallback(
    debounce((value: string)=>{
      onSearch(value)
    }, 200),
    [],
  )

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      const value = e.target.value.trim()
      dispatch({
          type: 'changeValue',
          payload: {value: {value}}
        }
      )
      if (value) {
        debounceSearch(value)
      } else {
        dispatch({
          type: 'setshowDropdown',
          payload: {
            show: false
          }
        })
        onSearch(value)
      }
    }

  const handleOnSelect = (sel: DataSourceType) => {
    dispatch({
      type: 'selected',
      payload: {
        selected: true,
        value: sel
      }
    })
    onSelect && onSelect (sel.value)
  }


  const handleOnClick =() => {
    console.log(renderOptions)
    if (renderOptions.length > 0) {
      dispatch({
        type: 'setshowDropdown',
        payload: {
          show: !showDropdown
        }
      })
    }
  }
  // 处理键盘事件
  const highLight = (index: number) => {
    const childrenLength = renderOptions.length
    console.log(childrenLength)
    if (index < 0) index = childrenLength-1
    if (index > childrenLength-1) {
      index = 0
    }
    dispatch({
      type: 'sethighlightIndex',
      payload: {
        highlightIndex: index
      }
    })
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
          dispatch({
            type: 'setshowDropdown',
            payload: {
              show: !showDropdown
            }
          })
        } else {
          renderOptions[highlightIndex] && handleOnSelect(renderOptions[highlightIndex])
        }
        break
      case 'Escape':
        dispatch({
          type: 'setshowDropdown',
          payload: {
            show: false
          }
        })
        break
      default:
        break
    }

  }


  // 分options传入和 自定义Option组件传入两种情况
  const renderTemplate = useMemo(() => {
    console.log('useMemouseMemouseMemo')
    if (renderMode) {
      // Option memo 无效
      return React.Children.map(children, (child, index) => {
        const cnames = classNames('suggestion-item', {
          'is-active': index === highlightIndex
        })
        const childEl = child as React.FunctionComponentElement<OptionProps>
        if (childEl.type.displayName === 'Option') {
          return (
            <li
              key={index}
              className={cnames}
              >
              {React.cloneElement(childEl, {onClick: handleOnSelect })}
            </li>)
        } else {
          throw new Error('AutoComplete only accepts Opiton component as Children');
        }
      })
    }
  },[children])

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className="cola-suggestion-list">
          { renderTemplate }
        </ul>
      </Transition>
    )
  }
 
  return (
    <AcContext.Provider value={dispatch}>
      <div 
        style={style}
        className="cola-auto-complete"
        onClick={handleOnClick}
        ref={thisComp}> 
        <Input 
          onChange={handleChange}
          value={inputValue?.value}
          onKeyDown={handleKeyDown}
          {...restProps}></Input>
            {generateDropdown()}
      </div>
    </AcContext.Provider>
  )
}

export default AutoComplete