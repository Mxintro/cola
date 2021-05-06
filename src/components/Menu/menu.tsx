import React, { FC, createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  defaultIndex: string;
  mode?: MenuMode;
  className?: string;
  style?: React.CSSProperties;
  // 点击MenuItem时回调
  onSelect?: (index: string) => void;
  // 展开子菜单，只对纵向模式生效
  defaultOpenSubMenus?: string[]
}

export interface IMenuContext {
  index: string;
  onSelect?: (index: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

export const Menu: FC<MenuProps> = (props) => {
  const { defaultIndex, mode, children, className, style, onSelect, defaultOpenSubMenus } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    // 不要再children上直接使用map，
    // 使用React.Children.map(children, function[(thisArg)])
    return React.Children.map(children, (child, index) => {
      // 断言获取diaplayName
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childEl.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childEl, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child which is nost a MenuItem compoment.')
      }
    })
  }
  return(
    <ul>
      <MenuContext.Provider value={passedContext}>
        {renderChildren}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu;