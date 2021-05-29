import React, { FC, ReactElement } from 'react'
import Icon from '../Icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

type InputSize = 'lg' | 'sm' 

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>{
  disabled?: boolean,
  readOnly?: boolean,
  size?: InputSize,
  icon?: IconProp,
  prepend?: string | ReactElement,
  append?: string  | ReactElement,
  onChange?:  React.ChangeEventHandler<HTMLInputElement>,
  hasError?: boolean
}

const Input: FC<InputProps> = (props) => {
  const {
    disabled=false,
    size,
    icon,
    prepend,
    append,
    style,
    hasError=false,
    ...restProps
  } = props
  const cnames = classNames('cola-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
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
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="cola-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className={innerCnames}
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="cola-input-group-append">{append}</div>}
    </div>
  )
}

// Input.displayName = 'Input'
export default Input