import React, { useEffect} from 'react'

export interface OptionProps {
  key?: string;
  // disabled?: boolean;
  value: string;
  onClick?: (value: string) => void;
  addOption?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  /** @deprecated Only works when use `children` as option data */
  // children?: React.ReactNode;
}

export const Option: React.FC<OptionProps> = ({
  value='',
  children,
  onClick,
  addOption,
  ...res
}) => {
  useEffect(()=> {
    addOption && addOption(value)
  })
  return (
    <div onClick={()=> onClick && onClick(value)} {...res}>{children}</div>
  )
}

export default Option