import * as React from 'react'
// import { AcContext } from '../AutoComplete'

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
  /** @deprecated Only works when use `children` as option data */
  // children?: React.ReactNode;P
}

export const Option: React.FC<OptionProps> = ({
  value='',
  children='',
  onClick,
  addOption,
  ...res
}) => {
  // const dispatch = React.useContext(AcContext);
  React.useEffect(()=> {
    // dispatch({
    //   type: 'pushOptions',
    //   payload: {
    //     value: {
    //       value, describe: children
    //     }
    //   }
    // })
    addOption && addOption({value, describe: children})
  },[])
  return (
    <div onClick={()=> onClick && onClick({value, describe: children})} {...res}>{children || value}</div>
  )
}


export default React.memo(Option) 