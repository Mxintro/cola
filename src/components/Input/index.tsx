import { FC } from 'react'
import Input, {InputProps} from './input'
import Password, { PasswordProps } from './password'

export * from './input'
export * from './password'

export type InputComp = FC<InputProps> & {
  Password: FC<PasswordProps>
}

const InputWithPassword = Input as InputComp
InputWithPassword.Password = Password

export default InputWithPassword
