import Form, {FormProps} from './form'
import FormItem, { FormItemProps } from './formItem'
export * from './formItem'
export * from './form'
export * from './formStore'

type TForm = React.FC<FormProps> & {
  Item: React.FC<FormItemProps>
}
const FormWithItem = Form as TForm
FormWithItem.Item = FormItem

export default FormWithItem