import * as React from 'react'
import  Checkbox  from './checkbox'

const { useState } = React

interface OptionsItem {
  label: string,
  value: string
}

export interface CheckboxGroupProps {
  options?: OptionsItem[],
  defaultChecked?: string[],
  onChange?: (value: any) => void,
  className?: string,
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options=[],
  defaultChecked=[],
  onChange,
  className,
  ...res
}) => {

  const [checkedValues, setCheckedValues] = useState([...defaultChecked] || [])

  const isDefault = (value: string) => {
    return defaultChecked?.includes(value)
  }

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>, value: string) => {
    let res: Array<string> = []
    if(e.target.checked) {
      res = [...checkedValues, value]
    } else {
      res = [...checkedValues]
      res.splice(res.indexOf(value), 1)
    }
    onChange && onChange(res)
    setCheckedValues(res)
  }

  return (
    <div className={className} {...res}>
      {
        options?.map((item, index)=> (
          <Checkbox
            key={item.value}
            onChange={(e) => handleOnChange(e, item.value)}
            defaultChecked={defaultChecked.includes(item.value)}>
            {item.label}
          </Checkbox>
        ))
      }
    </div>

  )
}