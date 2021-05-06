import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style: React.CSSProperties
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children} = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect) {
      
    }
  }
  return (

  )
}

MenuItem.displayName = 'MenuItem'