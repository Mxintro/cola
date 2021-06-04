import React, { useState, useEffect, useRef, ReactElement} from 'react'
import { FormStoreContext } from './form'
import { RuleItem } from 'async-validator';
import { InputProps } from '../Input'
import { ButtonProps } from '../Button'
import { AutoCompleteProps } from '../AutoComplete'
import { SelectProps } from '../Select'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'

export interface FormItemProps {
  className?: string,
  label?: string,
  name?: string,
  rules?: RuleItem | RuleItem[],
}
 type ItemChild = InputProps | ButtonProps | AutoCompleteProps | SelectProps

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

  type onChangeType = React.ChangeEventHandler<HTMLInputElement> | ((value: any) => void)
  const onChange:onChangeType = (e: any) => {
    console.log('change')

    if (e.target) {
      if (e.target.type === 'checkbox') {
        setValue(e.target.checked)
      } else {
        setValue(e.target.value)
      }
    } else {
      setValue(e)
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
      const childEl = child 
      return handleChildren(childEl)
    })

  }

// 多层查找Input
 function handleChildren(child: any) {
   if (!child) return
   if (child?.type.name !== 'Button'){
     if (child.type.name === 'Checkbox') {
      return React.cloneElement(child, {onChange, defaultChecked: value})
     }
     const childProps = { value, onChange, hasError: errorMsg !== ''}
     return React.cloneElement(child, childProps)
   } else {
    return child
   }
 }

  const classes = classNames('form-item', className, {
    'is-reqiured': isReqiured(rules),
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