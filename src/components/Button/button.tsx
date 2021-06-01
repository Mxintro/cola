import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'


export type ButtonSize = 'lg' | 'sm'| 'default'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  /** 
   * 添加css class 
  */
  className?: string;
  /** 是否可用 */
  disabled?: boolean;
  /** 
   * 按钮尺寸 
  */
  size: ButtonSize;
  /** 
   * 按钮类型 
   */
  btnType?: ButtonType;
  /** 
   * link类型链接 */
  href?: string;
  /**
   * 设置按钮载入状态
   */
  loading?: boolean;
  /** 幽灵属性，使按钮背景透明 */
  ghost: boolean,
}

// 添加原生属性, &合并
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// a标签
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// 设为可选Partial设置, 导出便于单元测试
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    loading,
    ghost,
    ...restProps
  } = props
  // 效果 btn btn-lg btn-primary
  // className为用户自定义类
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-size-${size}`]: size,
    'disabled': btnType !== 'link' && disabled,
    'btn-ghost': ghost
  })

  if (btnType === 'link' && href) {
    return (
      <a 
        className={classes}
        href = {href}
        {...restProps}
      >
        { children }
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled || loading}
        {...restProps}
        
      >
        {children}
        { loading ? <Icon icon="spinner" spin/> : ''}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size:'default',
  loading: false,
  ghost: false,
}

export default Button