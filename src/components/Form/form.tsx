import React from 'react'
import FormStore from './formStore'
import FormItem, { FormItemProps } from './formItem'

export interface FormProps {
  initialValues?: Object,
  className?: string,
  children?: React.ReactNode,
  onFinish?: (value: any | undefined) => void,
  onFinishFailed?: (value: any | undefined) => void,
  style?: React.CSSProperties
}

export const FormStoreContext = React.createContext<FormStore | undefined>(undefined)

const Form: React.FC<FormProps> = ({
  initialValues = {},
  className,
  children,
  onFinish = () => {},
  onFinishFailed = () => {},
  ...resProps
}) => {

  console.log('form render')
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
    console.log('reset')
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

type TForm = React.FC<FormProps> & {
  Item: React.FC<FormItemProps>
}
const FormWithItem = Form as TForm
FormWithItem.Item = FormItem

export default FormWithItem