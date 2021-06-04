import * as React from 'react'

export interface OptionValueType {
  value: string, 
  describe?: string
}

export interface OptionProps {
  key?: string;
  // disabled?: boolean;
  value: string;
  onClick?: (option: OptionValueType) => void;
  addOption?: (option: OptionValueType) => void;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  children?: string
}

export const Option: React.FC<OptionProps> = ({
  value='',
  children='',
  onClick,
  addOption,
  ...res
}) => {
  React.useEffect(()=> {
    addOption && addOption({value, describe: children})
  },[])
  return (
    <div onClick={()=> onClick && onClick({value, describe: children})} {...res}>{children || value}</div>
  )
}


export default React.memo(Option) 