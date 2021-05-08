import React from 'react';
import Menu from './components/Menu'
import Icon from './/components/Icon'



function App() {
  return (
    <div className="App">
      <Icon theme='primary' icon='check-square'></Icon>
      <Menu>
        <Menu.Item> 
          active
        </Menu.Item>
        <Menu.Item>
          default
        </Menu.Item>
        <Menu.Item disabled>
          disabled
        </Menu.Item>
        <Menu.SubMenu title='subMenu'>
          <Menu.Item>
            1
          </Menu.Item>
          <Menu.Item>
            2
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <Menu mode='vertical' defaultOpenSubMenus={['3']}>
        <Menu.Item>
          active
        </Menu.Item>
        <Menu.Item>
          default
        </Menu.Item>
        <Menu.Item disabled>
          disabled
        </Menu.Item>
        <Menu.SubMenu title='subMenu'>
          <Menu.Item>
            1
          </Menu.Item>
          <Menu.Item>
            2
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}

export default App;
