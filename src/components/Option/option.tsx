import React, { useEffect} from 'react'

export interface OptionProps {
  key?: string | number;
  // disabled?: boolean;
  value: string | number;
  onClick?: (value: string | number) => void;
  addOption?: (value: string | number) => void;
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