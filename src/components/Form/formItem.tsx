import React, { useState, useEffect, useRef, FunctionComponentElement } from 'react'
import { FormStoreContext } from './form'
import { RuleItem } from 'async-validator';
import { InputProps } from '../Input'
import { ButtonProps } from '../Button'
import { AutoCompleteProps } from '../AutoComplete'
import { SelectProps } from '../Select'
import { CheckboxProps } from '../Checkbox'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'

export interface FormItemProps {
  className?: string,
  /**
   * label 标签的文本
   */
  label?: string,
  /**
   * 字段名，对应表单中键值
   */
  name?: string,
  /**
   * 校验规则，基于async-validator设置字段的校验逻辑
   */
  rules?: RuleItem | RuleItem[],
}
 type ItemChild = InputProps | AutoCompleteProps | SelectProps | ButtonProps | CheckboxProps

export const FormItem: React.FC<FormItemProps> = ({
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

  console.log(value)
  useEffect(() => {
    if (!store || !name) return
    // 第一次渲染添加rules
    if (isFirstRender.current && rules) {
      store.addRules(name, rules)
      isFirstRender.current = false
    } else {
      store.set(name, debounceValue, !!rules)
    }
    
    return store.subscribe((n:string)=>{
      if (n === name || n === '*') {
        // 关键 将set函数回调传入store实例中
        setErrorMsg(store.getErrors(name))
        setValue(store.get(name))
      }
    })
  },[debounceValue, store, name, rules])

  // 传两个不同参数函数
  type onChangeType = React.ChangeEventHandler<HTMLInputElement> | ((value: string | number) => void)
  const handleOnChange:onChangeType = (target: unknown) => {
    const e = target as React.ChangeEvent<HTMLInputElement>
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
    console.log('--------')

    return React.Children.map(children, child => {
      const childEl = child 
      return handleChildren(childEl)
    })

  }

// 多层查找Input
  function handleChildren(children: unknown): any {
    if (!children) return
    const child =  children as FunctionComponentElement<ItemChild>
    const childName = child.type.name
    if (childName && childName !== 'Button'){
      let onChange: unknown
      let childProps = {}
      // input 自触发组件
      switch (childName) {
        case 'Input': case 'Password':
          onChange = handleOnChange as React.ChangeEventHandler<HTMLInputElement>
          childProps = { value, onChange, hasError: errorMsg !== '' }
          break
        case 'Select': case 'AutoComplete':
          console.log(value)
          onChange = handleOnChange as ((value: string | number) => void)
          childProps = { value, onChange, hasError: errorMsg !== '' }
          break
        case 'Checkbox':
          onChange = handleOnChange as React.ChangeEventHandler<HTMLInputElement>
          childProps = { onChange, defaultChecked: value }
          break
        default:
          return handleChildren(child.props?.children)
      }
      // 而来自原始元素的 key 和 ref 将被保留。
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