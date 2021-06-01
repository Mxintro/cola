import { Checkbox, CheckboxProps} from './checkbox'
import { CheckboxGroup, CheckboxGroupProps } from './checkboxGroup'
import { FC } from 'react'
export * from './checkbox'

type CheckboxType = FC<CheckboxProps> & {
  Group: FC<CheckboxGroupProps>
}

const CheckboxDefault = Checkbox as CheckboxType
CheckboxDefault.Group = CheckboxGroup

export default CheckboxDefault