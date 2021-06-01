import * as React from 'react'
import Icon from '../Icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

type InputSize = 'lg' | 'sm' 

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>{
  /**
   * 默认值
   */
  defaultValue?: string,
  /**
   * 不可用
   */
  disabled?: boolean,
  /**
   * 只读
   */
  readOnly?: boolean,
  /**
   * 大小尺寸
   */
  size?: InputSize,
  /**
   * Input后部添加图标
   */
  icon?: IconProp,
  /**
   * 前缀
   */
  prepend?: string | React.ReactElement,
  /**
   * 后缀
   */
  append?: string | React.ReactElement,
  /**
   * 
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  /**
   * 验证是未通过
   */
  hasError?: boolean,
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    hasError,
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
  // eye-slash eye
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


Input.defaultProps = {
  disabled: false,
  hasError: false,
  readOnly: false
}

export default Input