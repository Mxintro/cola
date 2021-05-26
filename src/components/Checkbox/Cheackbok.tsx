import React, { useState } from 'react'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>{
  disabled?: boolean,
  onChange?:  React.ChangeEventHandler<HTMLInputElement>,
}

export const Checkbox: React.FC<CheckboxProps> = ({
  onChange,
  children,
}) => {
  const [checked, setChecked] = useState<boolean>(false)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.checked)
    setChecked(e.target.checked)
    // e.preventDefault
    onChange && onChange(e)
  }

  return (
    <label className="cola-checkbox-wrapper">
      <span className={`cola-checkbox ${checked ? 'cola-checkbox-cheacked' : ''}`}>
        <input
          className="cola-checkbox-input"
          type="checkbox" 
          onChange={handleChange}/>
        <span className="cola-checkbox-inner"></span>
      </span>
      <span>{children}</span>
    </label>
  )
}