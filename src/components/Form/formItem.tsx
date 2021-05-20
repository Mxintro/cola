import React, { useState, useEffect, useRef} from 'react'
import { FormStoreContext } from './form'
import { Rules } from 'async-validator';

export interface FormItemProps {
  className?: string,
  label?: string,
  name?: string,
  children?: React.ReactNode,
  rules?: Rules,
}

const FormItem: React.FC<FormItemProps> = ({
  name,
  className,
  children,
  label,
  rules
}) => {

  const store = React.useContext(FormStoreContext)
  const [value, setValue] = useState(name && store ? store.get(name) : undefined)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const isFirstRender = useRef(true)

  // 关键 将setError回调传入store实例中
  useEffect(() => {
    if (!store || !name) return
    // 第一次渲染添加rules
    if (isFirstRender.current && rules) {
      store.addRules(name, rules)
      isFirstRender.current = false
    }
    return store.subscribe((errors)=>{
      setErrorMsg(store.getErrors(name))
    })
  },[])

  const onChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    name && store?.set(name, e.target.value)
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