import * as React from 'react'
import Icon from '../Icon'
import classNames from 'classnames'

const { useState } = React

type InputSize = 'lg' | 'sm' 

export interface PasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>{
  /**
   * 默认值
   */
  defaultValue?: string,
  /**
   * 不可用
   */
  disabled?: boolean,
  size?: InputSize,
  hasError?: boolean,
}

export const Password: React.FC<PasswordProps> = (props) => {
  const {
    disabled,
    size,
    hasError,
    style,
    ...restProps
  } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const cnames = classNames('cola-input-wrapper', {
    [`input-size-${size}`]: size
  })

  const innerCnames = classNames('cola-input-inner',{
    'input-has-error': hasError
    }
  )

  // 受控组件
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  // eye-slash eye
  
  const handleShowPassword:React.MouseEventHandler<HTMLDivElement> = () => {
    setShowPassword(!showPassword)

  }
  return (
    <div className={cnames} style={style}>
      <div className="icon-wrapper"
        onClick={handleShowPassword}
        >
        <Icon icon={ showPassword ? 'eye' : 'eye-slash'}/>
      </div>
      <input 
        className={innerCnames}
        disabled={disabled}
        {...restProps}
      />
    </div>
  )
}


export default Password