import { FC } from 'react'
import Select, { SelectProps } from './select'
import Option , { OptionProps } from '../Option/option'
export * from '../Option/option'
export * from './select'

export type SelectType = FC<SelectProps> & {
  Option: FC<OptionProps>
}

const SelectWithOption = Select as SelectType
SelectWithOption.Option = Option

export default SelectWithOption