import React, { useState, useEffect, useRef} from 'react'
import { FormStoreContext } from './form'
import { RuleItem } from 'async-validator';
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'
import Transition from '../Transition/transition'

export interface FormItemProps {
  className?: string,
  label?: string,
  name?: string,
  children?: React.ReactNode,
  rules?: RuleItem | RuleItem[],
}

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
        // 关键 将setError回调传入store实例中
        setErrorMsg(store.getErrors(name))
      }
    })
  },[debounceValue])

  const onChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
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
    const childProps = { value, onChange}
    return React.isValidElement(children) && React.cloneElement(children, childProps)
  }

  const classes = classNames('form-item', {
    'is-reqiured': isReqiured(rules)
  })

  return (
    <div className={classes}>
      <div className="item-label">
        <label >
          {label}
        </label>
      </div>
      <div className="item-input">
        {renderChildren()}
        <div className="form-item-error">{errorMsg}</div>
      </div>
    </div>
  )
}

export default FormItem