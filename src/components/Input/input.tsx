import React, { FC, ReactElement } from 'react'
import Icon from '../Icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

type InputSize = 'lg' | 'sm' 

export interface InputPorps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>{
  disabled?: boolean,
  size?: InputSize,
  icon?: IconProp,
  prepend?: string | ReactElement,
  append?: string  | ReactElement,
  onChange?:  React.ChangeEventHandler<HTMLInputElement>
}

const Input: FC<InputPorps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...res
  } = props
  const cnames = classNames('cola-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="cola-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="cola-input-inner"
        {...res}
      />
      {append && <div className="cola-input-group-append">{append}</div>}
    </div>
  )
}

export default Input