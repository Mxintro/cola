import * as React from 'react'
import  Checkbox  from './checkbox'

const { useState } = React

interface OptionsItem {
  label: string,
  value: string
}

export interface CheckboxGroupProps {
  /**
   * 生成Checkbox的数组
   */
  options?: OptionsItem[],
  /**
   * 默认已选择选项
   */
  defaultChecked?: string[],
  /**
   * 可扩展class
   */
  className?: string,
  /**
   * 勾选和取消时回调事件
   */
  onChange?: (value: string[]) => void,
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options=[],
  defaultChecked=[],
  onChange,
  className,
  ...res
}) => {

  const [checkedValues, setCheckedValues] = useState<string[]>([...defaultChecked])

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
        options?.map((item)=> (
          <Checkbox
            key={item.value}
            onChange={(e) => handleOnChange(e, item.value)}
            defaultChecked={checkedValues.includes(item.value)}>
            {item.label}
          </Checkbox>
        ))
      }
    </div>

  )
}