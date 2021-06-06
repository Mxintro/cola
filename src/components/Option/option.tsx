import * as React from 'react'

export interface OptionValueType {
  value: string, 
  describe?: string
}

export interface OptionProps {
  /**
   * Option选项值
   */
  value: string;
  /**
   * 可扩展class选项
   */
  className?: string;
  /**
   * 可扩展style
   */
  style?: React.CSSProperties;
  /**
   * label值
   */
  label?: React.ReactNode;
  /**
   * Option展示值
   */
  children?: string
  /**
   * 点击回调事件
   */
  onClick?: (option: OptionValueType) => void;
}

export const Option: React.FC<OptionProps> = ({
  value,
  children,
  onClick,
  label,
  ...res
}) => {
  return (
    <div onClick={()=> onClick && onClick({value, describe: children})} {...res}>{label || children || value}</div>
  )
}


export default React.memo(Option) 