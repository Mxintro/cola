import React from 'react'
import FormStore, {FormItemType} from './formStore'

export interface FormProps {
  /**
   * 表单默认值，只有初始化以及重置时生效
   */
  initialValues?: object,
  /**
   * 提交表单且数据验证成功后回调事件
   */
  onFinish?: (value:FormItemType) => void,
  /**
   * 提交表单且数据验证失败后回调事件
   */
  onFinishFailed?: (value: FormItemType) => void,
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