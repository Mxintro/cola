import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'


export type ButtonSize = 'lg' | 'sm'| 'default'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  /** 插入 */
  children?: React.ReactNode;
  href?: string;
  label?: string;
  loading?: boolean;
  /** 幽灵按钮，背景变为透明 */
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
    btnType='default',
    className,
    disabled,
    size='default',
    children,
    href,
    loading=false,
    ghost=false,
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
  btnType: 'default'
}

Button.displayName = 'Button'
export default Button