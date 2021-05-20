import React from 'react'
import FormStore from './formStore'
import FormItem, { FormItemProps } from './formItem'

export interface FormProps {
  store: FormStore,
  className?: string,
  children?: React.ReactNode,
  onFinish: (value: any | undefined) => void,
}

export const FormStoreContext = React.createContext<FormStore | undefined>(undefined)

const Form: React.FC<FormProps> = ({
  store,
  className,
  children,
  onFinish
}) => {

  const onSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onFinish(store!.get())
  }
  
  return (
    <FormStoreContext.Provider value={store}>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </FormStoreContext.Provider>
    
  )
}

type TForm = React.FC<FormProps> & {
  Item: React.FC<FormItemProps>
}
const FormWithItem = Form as TForm
FormWithItem.Item = FormItem

export default FormWithItem