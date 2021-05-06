import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'
import classNames from 'classnames'


export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
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
    ...restProps
  } = props
  // 效果 btn btn-lg btn-primary
  // className为用户自定义类
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': btnType !== 'link' && disabled,
  })

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
  //   const { onClick, disabled } = props;
  //   if (disabled) {
  //     e.preventDefault();
  //     return;
  //   }
  //   (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  // }
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
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button