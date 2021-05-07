import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'


function App() {
  return (
    <div className="App">
      <Menu >
        <MenuItem>
          active
        </MenuItem>
        <MenuItem>
          default
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <SubMenu title='subMenu'>
          <MenuItem>
            1
          </MenuItem>
          <MenuItem>
            2
          </MenuItem>
        </SubMenu>
      </Menu>
      <Menu mode='vertical'>
        <MenuItem>
          active
        </MenuItem>
        <MenuItem>
          default
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <SubMenu title='subMenu'>
          <MenuItem>
            1
          </MenuItem>
          <MenuItem>
            2
          </MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
