import React, { FC, useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Transition from '../Transition/transition'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string
}

const SubMenu: FC<SubMenuProps> = ({ index, title, className, children}) => {

  const context = useContext(MenuContext)
  const [subOpen, setSubOpen] = useState(false)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubOpen(!subOpen)
  }

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    setSubOpen(toggle)
  }

  const handleHover = context.mode === "horizontal" ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('cola-submenu', {
      'menu-open': subOpen
    })
    const childrenComponent =  React.Children.map(children, (child, i) => {
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childEl.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childEl, { index: `${index}-${i}` })
      } else {
        console.error('Warning: SubMenu has a child which is nost a MenuItem compoment.')
      }
    })
    return (
      // 下拉动画
      <Transition
        in={subOpen}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} { ...handleHover } onClick={handleClick}>
      { title }
      { renderChildren() }
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu