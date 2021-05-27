import React, { useState } from 'react'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>{
  disabled?: boolean,
  onChange?:  React.ChangeEventHandler<HTMLInputElement>,
  defaultChecked?: boolean,
}

export const Checkbox: React.FC<CheckboxProps> = ({
  onChange,
  children,
  disabled,
  defaultChecked=false
}) => {
  
  const [checked, setChecked] = useState<boolean>(defaultChecked)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.checked)
    setChecked(e.target.checked)
    onChange && onChange(e)
  }

  const cNames = `cola-checkbox-wrapper ${disabled ? 'disabled' : ''}`

  return (
    <label className={cNames} >
      <span className={`cola-checkbox ${checked ? 'cola-checkbox-cheacked' : ''}`}>
        <input
          className="cola-checkbox-input"
          type="checkbox" 
          disabled={disabled}
          checked={checked}
          onChange={handleChange}/>
        <span className="cola-checkbox-inner"></span>
      </span>
      <span>{children}</span>
    </label>
  )
}