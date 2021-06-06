import React from 'react'
import FormStore from './formStore'

export interface FormProps {
  /**
   * 初始化表单数据
   */
  initialValues?: Object,
  /**
   * 提交表单且数据验证成功后回调事件
   */
  onFinish?: (value: any | undefined) => void,
  /**
   * 提交表单且数据验证失败后回调事件
   */
  onFinishFailed?: (value: any | undefined) => void,
  /**
   * 设置表单样式
   */
  style?: React.CSSProperties
}

export const FormStoreContext = React.createContext<FormStore | undefined>(undefined)

export const Form: React.FC<FormProps> = ({
  initialValues = {},
  children,
  onFinish = () => {},
  onFinishFailed = () => {},
  ...resProps
}) => {
  const store = new FormStore(initialValues)
  const onSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    store.formOnSubmit().then( res => {
      onFinish(res)
    }).catch(error => {
      onFinishFailed(error)
    })
  }
  const onReset:React.FormEventHandler<HTMLFormElement> = () => {
    store.reset()
  }
  return (
    <FormStoreContext.Provider value={store}>
      <div className="cola-form">
        <form onSubmit={onSubmit} { ...resProps } onReset={onReset}>
          {children}
        </form>
      </div>
    </FormStoreContext.Provider>
    
  )
}


export default Form