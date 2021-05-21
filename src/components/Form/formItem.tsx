import React, { useState, useEffect, useRef} from 'react'
import { FormStoreContext } from './form'
import { RuleItem } from 'async-validator';

export interface FormItemProps {
  className?: string,
  label?: string,
  name?: string,
  children?: React.ReactNode,
  rules?: RuleItem | RuleItem[],
}

const FormItem: React.FC<FormItemProps> = ({
  name='',
  className,
  children,
  label,
  rules,
}) => {

  const store = React.useContext(FormStoreContext)
  const [value, setValue] = useState(name && store ? store.get(name) : undefined)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const isFirstRender = useRef(true)

  
  useEffect(() => {
    if (!store || !name) return
    // 第一次渲染添加rules
    if (isFirstRender.current && rules) {
      store.addRules(name, rules)
      isFirstRender.current = false
    }
    const validate = !isFirstRender.current && !!rules
    store.set(name, value, validate)
    console.log('sssssss')
    // issue
    return store.subscribe((n:string)=>{
      console.log('item----'+ n)
      setErrorMsg(store.getErrors(name))
      // if (n === name) {
      //   // 关键 将setError回调传入store实例中
      //   setErrorMsg(store.getErrors(name))
      // }
    })
  },[value])

  const onChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const renderChildren = () => {
    const childProps = { value, onChange}
    return React.isValidElement(children) && React.cloneElement(children, childProps)
  }

  return (
    <div>
      <label>{label}</label>
      {renderChildren()}
      <div>{errorMsg}</div>
    </div>
  )
}

export default FormItem