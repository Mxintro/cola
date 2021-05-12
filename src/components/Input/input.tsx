import React, { FC, ReactElement } from 'react'
import classNames from 'classnames'

type InputSize = 'lg' | 'sm' 

interface InputPorps extends React.HTMLAttributes<HTMLDivElement>{
  disabled?: boolean,
  size?: InputSize,
  icon?: string,
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
    onChange,
    ...res
  } = props
  const cnames = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  return (
    <div className={cnames} style={style}>
      <input 
        className="viking-input-inner"
        onChange={onChange}
        {...res}/>
    </div>
  )
}

export default Input