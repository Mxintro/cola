import { FC } from 'react'
import AutoComplete, { AutoCompleteProps } from './autoComplete'
import Option , { OptionProps } from '../Option'
export * from '../Option'
export * from './autoComplete'

export type AutoCompleteType = FC<AutoCompleteProps> & {
  Option: FC<OptionProps>
}

const AutoCompleteWithOption = AutoComplete as AutoCompleteType
AutoCompleteWithOption.Option = Option

export default AutoCompleteWithOption