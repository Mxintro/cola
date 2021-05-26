import React, { useState, useEffect, useRef, ReactElement} from 'react'
import { FormStoreContext } from './form'
import { RuleItem } from 'async-validator';
import { InputProps } from '../Input'
import { ButtonProps } from '../Button'
import { AutoCompleteProps } from '../AutoComplete'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'

export interface FormItemProps {
  className?: string,
  label?: string,
  name?: string,
  rules?: RuleItem | RuleItem[],
  // children?: React.ElementType<any>
}
 type ItemChild = InputProps | ButtonProps | AutoCompleteProps

const FormItem: React.FC<FormItemProps> = ({
  name, 
  className,
  children,
  label,
  rules,
}) => {

  const store = React.useContext(FormStoreContext)
  const [value, setValue] = useState(name && store ? store.get(name) : '')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const isFirstRender = useRef(true)
  const debounceValue = useDebounce(value, 200)


  useEffect(() => {
    if (!store || !name) return
    // 第一次渲染添加rules
    if (isFirstRender.current && rules) {
      store.addRules(name, rules)
      isFirstRender.current = false
    } else {
      store.set(name, value, !!rules)
    }
    
    return store.subscribe((n:string)=>{
      if (n === name || n === '*') {
        // 关键 将set函数回调传入store实例中
        setErrorMsg(store.getErrors(name))
        setValue(store.get(name))
      }
    })
  },[debounceValue])

  const onChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.type === 'checkbox') {
      setValue(e.target.checked)
    } else {
      setValue(e.target.value)
    }
  }

  // 是否必填
  const isReqiured = (a: RuleItem | RuleItem[] | undefined): boolean => {
    if (!a) return false
    if (a instanceof Array) {
      return a.some(rule => rule?.required === true)
    } else {
      return a?.required === true
    }
  }

  const renderChildren = () => { 
    return React.Children.map(children, child => {
      const childEl = child as React.FunctionComponentElement<ItemChild>

      return handleChildren(childEl)
    })

  }

// 多层查找Input
 function handleChildren(child: React.FunctionComponentElement<ItemChild>) {
  console.log(child?.type.name)

   if (!child) return
   if (child?.type.name !== 'Button'){
     const childProps = { value, onChange, hasError: errorMsg !== ''}
     return React.cloneElement(child, childProps)
   } else {
    return child
   }
 }

  const classes = classNames('form-item', {
    'is-reqiured': isReqiured(rules),
    // 'form-input-failed': errorMsg !== ''
  })

  return (   
    <div className={classes}>
      {<div className="item-label">
        {label? <label >
          {label}
        </label> : ''}
      </div>}
      <div className="item-input">
        {renderChildren()}
        {errorMsg !== '' ? <div className="form-item-error">{errorMsg}</div> : ''}
      </div>
    </div>
  )
}

export default FormItem